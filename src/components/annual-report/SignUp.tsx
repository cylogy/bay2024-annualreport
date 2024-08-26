import { Text, Field, withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import Curve from 'assets/svg/Curve';
import { ComponentProps } from 'lib/component-props';
import { isEmailValid } from 'lib/util/email';
import Image from 'next/image';
import { FormEvent } from 'react';
import HeroImage from 'public/images/hero.jpg';
import FooterTops from 'public/images/footer-top.png';

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
    const submitHandler = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const email = formData.get('email') as string;
      const isValid = isEmailValid(email);
      console.log({ isValid });
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
                    <input type="email" id="email" name="email" />
                    <button type="submit" className="btn">
                      <Text field={EmailCTA} />
                    </button>
                  </div>
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
