const { getPublicUrl } = require('@sitecore-jss/sitecore-jss-nextjs');
const jssConfig = require('./src/temp/config');
const plugins = require('./src/temp/next-config-plugins') || {};

// const publicUrl = jssConfig.publicUrl;
const publicUrl = getPublicUrl;

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  // Set assetPrefix to our public URL
  assetPrefix: publicUrl,
  assetPrefix:
    process.env.BUILD_STANDALONE === 'true'
      ? publicUrl +
        '/' +
        process.env.ASSETS_BASE_FOLDER_PREFIX +
        '-' +
        process.env.CODEBUILD_BUILD_NUMBER
      : publicUrl,

  cacheHandler:
    process.env.BUILD_STANDALONE === 'true' ? require.resolve('./cache-handler.js') : undefined,

  // Allow specifying a distinct distDir when concurrently running app in a container
  distDir: process.env.NEXTJS_DIST_DIR || '.next',

  output: process.env.BUILD_STANDALONE === 'true' ? 'standalone' : undefined,

  // Make the same PUBLIC_URL available as an environment variable on the client bundle
  env: {
    PUBLIC_URL: publicUrl,
  },

  i18n: {
    // These are all the locales you want to support in your application.
    // These should generally match (or at least be a subset of) those in Sitecore.
    locales: ['en'],
    // This is the locale that will be used when visiting a non-locale
    // prefixed path e.g. `/styleguide`.
    defaultLocale: jssConfig.defaultLanguage,
  },

  // Enable React Strict Mode
  reactStrictMode: true,

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), geolocation=(self), microphone=()',
          },
          {
            key: 'Referrer-Policy',
            value: 'no-referrer',
          },
          {
            key: 'Set-Cookie',
            value: 'SameSite=None; Secure; HttpOnly; Path=/;',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains;',
          },
          {
            key:
              process.env.NODE_ENV !== 'development'
                ? 'Content-Security-Policy'
                : 'Content-Security-Policy-Report-Only',
            value:
              "default-src 'none' ; script-src 'self' https://*.vercel.app/ https://*.oshyn.com/ https://www.youtube.com/ https://www.youtube.com/iframe_api https://static.doubleclick.net; style-src 'self' 'unsafe-inline' https://*.vercel.app/ https://*.oshyn.com/ https://fonts.googleapis.com https://cdnjs.cloudflare.com https://www.youtube.com; object-src 'none'; base-uri 'self'; connect-src 'self' https://*.vercel.app/ https://*.oshyn.com/; font-src 'self' https://fonts.gstatic.com/ https://cdnjs.cloudflare.com https://*.vercel.app; frame-src 'self' https://www.youtube-nocookie.com/; img-src 'self' https://i.ytimg.com/ https://sc-dev-baaqmd.oshyn.com https://sc-dev-strategicplan.baaqmd.gov/ https://sc-dev-strategicplan.baaqmd.gov/~/media/ https://sc-qa.baaqmd.gov https://sc-qa.baaqmd.gov/~/media/ https://*.vercel.app/ https://*.oshyn.com/ https://www.youtube.com; manifest-src 'self'; worker-src 'none'; frame-ancestors 'self'; form-action 'self';",
          },
        ],
      },
    ];
  },

  // use this configuration to ensure that only images from the whitelisted domains
  // can be served from the Next.js Image Optimization API
  // see https://nextjs.org/docs/app/api-reference/components/image#remotepatterns
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'edge*.**',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'feaas*.blob.core.windows.net',
        port: '',
      },
      {
        hostname: 'sc-dev-strategicplan.baaqmd.gov',
        port: '',
      },
      {
        hostname: 'sc-qa.baaqmd.gov',
        port: '',
      },
      {
        hostname: 'baaqmd-sc.dev.local',
        port: '',
      },
    ],
  },

  async rewrites() {
    // When in connected mode we want to proxy Sitecore paths off to Sitecore
    return [
      // API endpoints
      {
        source: '/sitecore/api/:path*',
        destination: `${jssConfig.sitecoreApiHost}/sitecore/api/:path*`,
      },
      // media items
      {
        source: '/-/:path*',
        destination: `${jssConfig.sitecoreApiHost}/-/:path*`,
      },
      // healthz check
      {
        source: '/healthz',
        destination: '/api/healthz',
      },
      // rewrite for Sitecore service pages
      {
        source: '/sitecore/service/:path*',
        destination: `${jssConfig.sitecoreApiHost}/sitecore/service/:path*`,
      },
    ];
  },
};


module.exports = () => {
  // Run the base config through any configured plugins
  return Object.values(plugins).reduce((acc, plugin) => plugin(acc), nextConfig);
};
