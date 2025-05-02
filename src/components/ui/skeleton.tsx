import clsx from 'clsx'

type SkeletonProps = {
  width?: string
  height?: string
  className?: string
  type?: 'text' | 'card' | 'image'
}

export function Skeleton({
  width,
  height,
  className,
  type = 'text',
}: SkeletonProps) {
  // Default size per type
  const defaultSizes = {
    text: {
      height: 'h-[2rem]',
      width: 'w-full',
      rounded: 'rounded',
    },
    card: {
      height: 'h-[20rem]',
      width: 'w-full',
      rounded: 'rounded-2xl',
    },
    image: {
      height: 'h-[16rem]',
      width: 'w-full',
      rounded: 'rounded-lg',
    },
  }

  const selected = defaultSizes[type]

  return (
    <div
      className={clsx(
        'animate-pulse bg-slate-300 duration-300',
        selected.height,
        selected.width,
        selected.rounded,
        height,
        width,
        className,
      )}
    />
  )
}
