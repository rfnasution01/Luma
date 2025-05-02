import clsx from 'clsx'

export function Info({
  icon,
  label,
  className,
  background = 'bg-[#E0E0F0]',
}: {
  icon: JSX.Element
  label: string
  className?: string
  background?: string
}) {
  return (
    <div
      className={clsx(
        'flex items-center gap-12 rounded-2xl border border-[#4444D8] p-16',
        background,
        className,
      )}
    >
      {icon}
      <p>{label}</p>
    </div>
  )
}
