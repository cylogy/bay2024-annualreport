import { ImageField } from '@sitecore-jss/sitecore-jss-nextjs';
import Image from 'next/image';
import { ImageProps } from 'next/image';

type NextImageProps = {
  field: {
    value?: {
      alt?: string;
      height?: string;
      width?: string;
    };
  } & ImageField;
} & Omit<ImageProps, 'src' | 'alt'>;

export default function NextImage({ field: { value }, ...props }: NextImageProps) {
  const hasDimentions = value?.height !== '' && value?.width !== '';
  return (
    <Image
      {...props}
      src={value?.src ?? ''}
      alt={value?.alt ?? ''}
      fill={!hasDimentions}
      height={hasDimentions ? Number(value?.height) : undefined}
      width={hasDimentions ? Number(value?.width) : undefined}
    />
  );
}
