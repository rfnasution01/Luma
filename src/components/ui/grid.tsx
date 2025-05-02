import clsx from 'clsx'
import { ReactNode } from 'react'

export function GridParent({
  cols = 12,
  colsPhone = 1,
  className,
  children,
}: {
  cols?: number
  colsPhone?: number
  className?: string
  children: ReactNode
}) {
  return (
    <div
      className={clsx(
        className,
        `grid gap-32 grid-cols-${cols} phones:grid-cols-${colsPhone}`,
      )}
    >
      {children}
    </div>
  )
}

export function GridChildren({
  colSpan = 1,
  colSpanPhone = 1,
  className,
  children,
}: {
  colSpan?: number
  colSpanPhone?: number
  className?: string
  children: ReactNode
}) {
  return (
    <div
      className={clsx(
        className,
        `col-span-${colSpan} phones:col-span-${colSpanPhone}`,
      )}
    >
      {children}
    </div>
  )
}
