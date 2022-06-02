import { ImgHTMLAttributes } from 'react';
import styles from './Avatar.module.css'

interface IAvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  hasBorder?: boolean;
  alt?: string;
}

export function Avatar({
  src,
  hasBorder=true,
  alt='Avatar',
  ...rest
}: IAvatarProps) {
  return (
    <img
      className={hasBorder ? styles.avatarWithBorder : styles.avatar}
      src={src}
      alt={alt}
      {...rest}
    />
  )
}