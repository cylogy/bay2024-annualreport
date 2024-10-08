import {
  ImageField,
  useSitecoreContext,
  Image as JssImage,
} from '@sitecore-jss/sitecore-jss-nextjs';
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

export default function NextImage({ field, ...props }: NextImageProps) {
  const { sitecoreContext } = useSitecoreContext();
  const isPageEditing = sitecoreContext.pageEditing;
  const { value } = field;

  if (value && Object.keys(value).length === 0) return <></>;

  if (isPageEditing)
    return <JssImage {...props} field={field} editable fetchPriority="low" loading="lazy" />;

  const hasDimensions = value?.height !== '' && value?.width !== '';
  const src = value?.src?.includes('http:') ? value?.src.replace('http:', 'https:') : value?.src;

  return (
    <Image
      src={src ?? ''}
      alt={value?.alt ?? ''}
      fill={!hasDimensions}
      height={hasDimensions ? Number(value?.height) : undefined}
      width={hasDimensions ? Number(value?.width) : undefined}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 40vw, (max-width: 1440px) 33vw, 30vw"
      {...props}
    />
  );
}
