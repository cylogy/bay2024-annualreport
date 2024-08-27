import { Field, Text, withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import Curve from 'assets/svg/Curve';
import { ComponentProps } from 'lib/component-props';
import { getCaptchaToken, submitSignUpForm } from 'lib/util/captcha';
import { isEmailValid } from 'lib/util/email';
import Image from 'next/image';
import FooterTops from 'public/images/footer-top.png';
import HeroImage from 'public/images/hero.jpg';
import { FormEvent, useState } from 'react';

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
    const [FormMessage, setFormMessage] = useState('');

    const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const form = document.querySelector<HTMLFormElement>('form');
      const btn = form?.querySelector<HTMLButtonElement>('button');
      const formData = new FormData(e.currentTarget);
      const email = formData.get('email') as string;
      const isValid = isEmailValid(email);

      if (!btn) return;
      btn.disabled = true;

      if (!isValid) {
        setFormMessage('Invalid form');
        btn.disabled = false;
        return;
      }

      const token = await getCaptchaToken();
      const res = await submitSignUpForm(token, formData);

      if (res.success) {
        // Send form data
        form?.reset();
      }
      setFormMessage(res.message);
      btn.disabled = false;
    };

    return (
      <>
        <div className="form bg-lighter-green mt-28 lg:mt-24">
          <Curve isForm />
          <div className="container text-dark-blue">
            <div className="form__content">
              <div className="space-y-8 relative top-0 lg:top-5">
                <div className="space-y-3">
                  <Text field={Headline} tag="h2" />
                  <Text field={Description} tag="span" className="h6 block max-w-[35.5rem]" />
                </div>
                <form className="space-y-3" onSubmit={submitHandler}>
                  <Text field={EmailLabel} tag="label" htmlFor="email" />
                  <div className="form__sign-up-group">
                    <input type="email" id="email" name="email" required />
                    <button type="submit" className="btn">
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
