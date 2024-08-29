import { Field, Text } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { useState, useRef, useEffect } from 'react';

interface Fields {
  Prefix: Field<string>;
  Value: Field<string>;
  Suffix: Field<string>;
  Description: Field<string>;
}

type MetricProps = ComponentProps & {
  params: { [key: string]: string };
  fields: Fields;
};

const initialValue = 0;
const duration = 1000;

export const Default = ({
  fields: { Description, Prefix, Suffix, Value },
}: MetricProps): JSX.Element => {
  const [count, setCount] = useState(initialValue);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.8 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(elementRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible || Value.value === '') return;
    let startValue = initialValue;
    const numericValue = Number(Value.value);
    const targetValue = isNaN(numericValue) ? 0 : numericValue;
    const interval = Math.floor(duration / (targetValue - initialValue));

    const counter = setInterval(() => {
      startValue += 1;
      setCount(startValue);
      if (startValue >= targetValue) clearInterval(counter);
    }, interval);

    return () => clearInterval(counter);
  }, [isVisible, Value.value]);

  return (
    <div className="metric col-span-1" ref={elementRef}>
      {Value.value !== '' && (
        <h3 className="flex justify-center">
          {count}
          {Prefix.value ?? ''}
          {Suffix.value ?? ''}
        </h3>
      )}
      <Text
        field={Description}
        className={`p2 max-w-[8.125rem] mx-auto ${
          isVisible ? 'animated animatedFadeInUp fadeInUp' : ''
        }`}
        tag="p"
      />
    </div>
  );
};
