import { NextRequest, NextResponse } from 'next/server';
//import { RedirectsMiddleware } from '@sitecore-jss/sitecore-jss-nextjs/middleware';
import { MiddlewarePlugin } from '..';
import { debug } from '@sitecore-jss/sitecore-jss';

class BasicAuthMiddlewarePlugin implements MiddlewarePlugin {
  order = 0;

  /**
   * exec async method - to find coincidence in url.pathname and redirects of site
   * @param req<NextRequest>
   * @returns Promise<NextResponse>
   */
  async exec(req: NextRequest, res?: NextResponse): Promise<NextResponse> {
    const url = req.nextUrl;
    debug.common('basicauth middlewareurl:' + url.pathname);
    debug.common('basicauth:' + process.env.ENABLE_BASIC_AUTH);
    const hasBypasscookie = req.cookies.get('__prerender_bypass')?.value != null;
    debug.common('bypasscookievalue:' + hasBypasscookie);
    const hasNextpreviewData = req.cookies.get('__next_preview_data')?.value != null;
    debug.common('nextpreviewData:' + hasNextpreviewData);
    const hasAxiosuagentheader = req.headers.get('User-Agent')?.includes('axios');
    debug.common('useragent:' + hasAxiosuagentheader);
    const hastimestampparam = url.searchParams.get('timestamp') != null;
    debug.common('tsparam:' + hastimestampparam);
    //const bypass = bypasscookie && nextpreviewData && uagentheader && tsparam;
    const bypass =
      hasBypasscookie && hasNextpreviewData && hasAxiosuagentheader && hastimestampparam;
    debug.common('bypass:' + bypass);

    if (
      !url.pathname.includes('/api/editing/render') &&
      !bypass &&
      process.env.ENABLE_BASIC_AUTH === 'true'
    ) {
      debug.common('basic auth enabled for:' + url.pathname);
      const basicAuth = req.headers.get('authorization');
      if (basicAuth) {
        debug.common('in basicAuth flow');
        const authValue = basicAuth.split(' ')[1];
        const [user, pwd] = atob(authValue).split(':');

        if (user === process.env.BASIC_AUTH_USERNAME && pwd === process.env.BASIC_AUTH_PASSWORD) {
          debug.common('passed authentication test');
          // debug.common('current response cache control:' + res?.headers.get('cache-control'));
          // res?.headers.set('cache-control', 'no-store');
          return NextResponse.next();
        }
      }
      debug.common('rejected as required authentication');
      url.pathname = '/api/auth';
      return NextResponse.rewrite(url);
    }
    return NextResponse.next();
  }
}

export const basicAuthMiddlewarePlugin = new BasicAuthMiddlewarePlugin();
