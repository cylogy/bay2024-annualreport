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
  fields: Fields | undefined;
};

const initialValue = 0;
const duration = 500;

export const Default = (props: MetricProps): JSX.Element => {
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
    if (!isVisible || !props.fields || props.fields.Value.value === '') return;
    const numericValue = Number(props.fields.Value.value);
    const targetValue = isNaN(numericValue) ? 0 : numericValue;

    const increment = targetValue / (duration / 10);
    let currentCount = initialValue;
    const step = () => {
      currentCount += increment;
      if (currentCount >= targetValue) {
        currentCount = targetValue;
        setCount(currentCount);
        return;
      }
      setCount(Math.floor(currentCount));
      requestAnimationFrame(step);
    };

    requestAnimationFrame(step);

    return () => setCount(initialValue);
  }, [isVisible, props]);

  if (!props.fields) return <></>;
  const { Description, Prefix, Suffix, Value } = props.fields;

  return (
    <div className="metric col-span-1" ref={elementRef}>
      {Value.value !== '' && (
        <h3 className="flex justify-center">
          {Prefix.value ?? ''}
          {count}
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
