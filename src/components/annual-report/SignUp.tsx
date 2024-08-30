import { Field, Text, withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import Curve from 'assets/svg/Curve';
import { ComponentProps } from 'lib/component-props';
import { getCaptchaToken, submitSignUpFormCaptcha } from 'lib/util/captcha';
import { isEmailValid, submitSignUp } from 'lib/util/sign-up';
import Image from 'next/image';
import { useRouter } from 'next/router';
import FooterTops from 'public/images/footer-top.png';
import HeroImage from 'public/images/hero.jpg';
import { FormEvent, useEffect, useState } from 'react';

type SignUpProps = ComponentProps & {
  fields: {
    Headline: Field<string>;
    Description: Field<string>;
    EmailLabel: Field<string>;
    EmailCTA: Field<string>;
  };
};

export const Default = withDatasourceCheck()<SignUpProps>(
  ({ fields: { Description, EmailCTA, EmailLabel, Headline } }: SignUpProps): JSX.Element => {
    const { asPath } = useRouter();
    const [FormMessage, setFormMessage] = useState('');
    const [IsSoftWhite, setIsSoftWhite] = useState(false);

    useEffect(() => {
      const urls = ['about/environmental', 'contact-us'];
      const isGray = urls.some((item) => asPath.includes(item));
      isGray && setIsSoftWhite(true);
    }, [asPath]);

    const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
      setFormMessage('');
      e.preventDefault();
      const form = document.querySelector<HTMLFormElement>('form');
      const btn = form?.querySelector<HTMLButtonElement>('button');
      const formData = new FormData(e.currentTarget);
      const email = formData.get('email') as string;
      const isValid = isEmailValid(email);

      if (!btn || !form) return;
      form.dataset.sending = 'true';
      btn.disabled = true;

      if (!isValid) {
        setFormMessage('Email address is mandatory.');
        btn.disabled = false;
        form.dataset.sending = 'false';
        return;
      }

      const token = await getCaptchaToken();
      const captcha = await submitSignUpFormCaptcha(token, formData);

      if (captcha.success) {
        const sub = await submitSignUp(email);
        setFormMessage(sub.success ? captcha.message : sub.error);
        form.reset();
      } else {
        setFormMessage(captcha.message);
      }
      form.dataset.sending = 'false';
      btn.disabled = false;
    };

    return (
      <>
        <div className={`form pt-28 lg:pt-24 ${IsSoftWhite ? 'bg-soft-white' : 'bg-white'}`}>
          <div className="bg-lighter-green">
            <Curve isForm isWhite={!IsSoftWhite} />
            <div className="container text-dark-blue">
              <div className="form__content">
                <div className="space-y-8 relative top-0 lg:top-6">
                  <div className="space-y-3">
                    <Text field={Headline} tag="h2" />
                    <Text field={Description} tag="span" className="h6 block max-w-[35.5rem]" />
                  </div>
                  <form className="space-y-3" onSubmit={submitHandler} data-sending="false">
                    <Text field={EmailLabel} tag="label" htmlFor="email" />
                    <div className="form__sign-up-group">
                      <input type="email" id="email" name="email" required />
                      <button type="submit" className="btn">
                        <svg
                          className="animate-spin size-5 spinner"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        <Text field={EmailCTA} />
                      </button>
                    </div>
                    <div className="min-h-4">{FormMessage}</div>
                  </form>
                </div>
                <Image
                  fetchPriority="low"
                  loading="lazy"
                  src={HeroImage}
                  className="form__image"
                  placeholder="blur"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
        <Image
          fetchPriority="low"
          loading="lazy"
          src={FooterTops}
          className="object-cover w-full bg-lighter-green"
          placeholder="blur"
          aria-hidden="true"
          alt=""
        />
      </>
    );
  }
);
