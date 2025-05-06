export default function FormInput({
  name,
  value,
  placeholder,
  onChange,
  className = '',
  type = 'text',
}) {
  return (
    <input
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      className={`border-b border-gray-300 py-2 focus:border-blue-500 focus:outline-none ${className}`}
    />
  )
}
