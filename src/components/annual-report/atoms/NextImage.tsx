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
  if (value && Object.keys(value).length === 0) return <></>;
  const hasDimensions = value?.height !== '' && value?.width !== '';
  const src = value?.src?.includes('http:') ? value?.src.replace('http:', 'https:') : value?.src;

  return (
    <Image
      {...props}
      src={src ?? ''}
      alt={value?.alt ?? ''}
      fill={!hasDimensions}
      height={hasDimensions ? Number(value?.height) : undefined}
      width={hasDimensions ? Number(value?.width) : undefined}
    />
  );
}
