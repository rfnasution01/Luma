export default function FormTextArea({
  name,
  value,
  placeholder,
  onChange,
  rows = 2,
  className = '',
}) {
  return (
    <textarea
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      rows={rows}
      className={`border-b border-gray-300 py-2 focus:border-blue-500 focus:outline-none ${className}`}
    />
  )
}
