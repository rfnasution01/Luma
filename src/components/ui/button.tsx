export function Button({
  icon,
  label,
  color,
  text,
  disabled,
  className = 'text-[2rem]',
  padding = 'px-24 py-12',
  type = 'button',
  border = 'rounded-2xl',
  items = 'items-center',
  justify = 'justify-center',
  fx,
  style,
}: {
  icon?: JSX.Element
  label?: string
  color?: string
  text?: string
  disabled?: boolean
  fx?: () => void
  className?: string
  padding?: string
  border?: string
  items?: 'items-center' | 'items-start' | 'items-end'
  justify?: 'justify-start' | 'justify-center' | 'justify-end'
  type?: 'submit' | 'button'
  style?: React.CSSProperties
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      style={style}
      className={`font-jakarta flex gap-12 hover:bg-opacity-80 disabled:cursor-not-allowed disabled:bg-opacity-50 ${padding} ${color} ${text} ${className} ${border} ${items} ${justify}`}
      onClick={fx}
    >
      {icon}
      {label && <p className="text-nowrap">{label}</p>}
    </button>
  )
}
