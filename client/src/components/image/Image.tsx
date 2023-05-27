import { ComponentProps, useState } from 'react'

interface ImageProps extends ComponentProps<'img'> {
  src: string
  alt: string
  callbackImageSrc?: string
}

export const Image = (props: ImageProps) => {
  const {
    src = 'https://picsum.photos/400/400',
    callbackImageSrc,
    alt,
    className,
    ...rest
  } = props
  const [isError, setIsError] = useState(false)
  const source = isError || !src ? callbackImageSrc : src

  return (
    <img
      className={className}
      src={source}
      alt={alt}
      onError={() => setIsError(true)}
      {...rest}
    />
  )
}
