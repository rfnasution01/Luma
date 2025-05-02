import clsx from 'clsx'
import { ReactNode } from 'react'

export function Typograpwhy({
  label,
  value,
  display,
}: {
  label: ReactNode
  value: ReactNode
  display: 'row' | 'column'
}) {
  return (
    <div
      className={clsx('flex phones:flex-col phones:items-start phones:gap-16', {
        'flex-col items-start justify-start gap-8': display === 'column',
        'flex-row items-center justify-between gap-32': display === 'row',
      })}
    >
      {label}
      {value}
    </div>
  )
}
