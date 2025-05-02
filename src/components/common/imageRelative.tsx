import clsx from 'clsx'
import { ReactNode } from 'react'

export function ImageRelative({
  alt,
  children,
  childrenClassName,
  src,
  className,
  imageClassName,
  loading = 'eager',
}: {
  className?: string
  imageClassName?: string
  loading?: 'eager' | 'lazy'
  alt: string
  src: string
  children?: ReactNode
  childrenClassName?: string
}) {
  return (
    <div className={clsx('relative w-full', className)}>
      <img
        src={src}
        className={clsx(imageClassName, 'w-full')}
        loading={loading}
        alt={alt}
      />
      <div
        className={clsx(
          childrenClassName,
          'absolute left-0 top-0 flex h-full w-full',
        )}
      >
        {children}
      </div>
    </div>
  )
}
