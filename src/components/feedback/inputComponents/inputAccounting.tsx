import { UseFormReturn } from 'react-hook-form'
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/feedback/form'
import { ReactNode, useRef } from 'react'
import clsx from 'clsx'
import { Input } from './input'

export function InputTextAccounting({
  form,
  label,
  placeholder = '',
  name,
  type = 'text',
  className,
  isDisabled,
  isRupiah,
  defaultValue,
  inputClassName,
  onChange,
  isRow,
}: {
  isRow?: boolean
  form: UseFormReturn
  label?: string | ReactNode
  placeholder?: string
  name: string
  prefix?: JSX.Element
  suffix?: JSX.Element
  type?: 'text' | 'number' | 'password' | 'email'
  handlerClick?: () => void
  className?: string
  isDisabled?: boolean
  isRupiah?: boolean
  defaultValue?: string
  inputClassName?: string
  onChange?: (value: string) => void
}) {
  const inputRef = useRef<HTMLInputElement | null>(null) // Ref untuk menyimpan input element
  const cursorRef = useRef<number>(0) // Ref untuk menyimpan posisi kursor

  // Fungsi untuk memformat angka ke Rupiah
  const formatRupiah = (value: string) => {
    const numberString = value.replace(/[^,\d]/g, '') // Hanya angka & koma
    const [integerPart, decimalPart] = numberString.split(',')

    const formattedNumber = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    return decimalPart !== undefined
      ? `Rp ${formattedNumber},${decimalPart}`
      : `Rp ${formattedNumber}`
  }

  // Handle perubahan input dengan menjaga posisi kursor
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    const cursorPosition = e.target.selectionStart || 0 // Simpan posisi kursor

    if (isRupiah) {
      const cleanValue = inputValue.replace(/[^0-9,]/g, '') // Hanya angka & koma
      const formattedValue = formatRupiah(cleanValue)

      // Simpan posisi kursor sebelum update state
      cursorRef.current =
        cursorPosition + (formattedValue.length - inputValue.length)

      // Update nilai input
      e.target.value = formattedValue
      form.setValue(name, cleanValue) // Simpan angka bersih di state

      if (onChange) {
        onChange(cleanValue)
      }

      // Restore posisi kursor setelah re-render
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.setSelectionRange(
            cursorRef.current,
            cursorRef.current,
          )
        }
      }, 0)
    }
  }

  return (
    <FormField
      control={form?.control}
      name={name}
      render={({ field }) => (
        <FormItem
          className={clsx(`flex w-full text-[2rem] ${className}`, {
            'flex-row items-center gap-32 phones:flex-col phones:items-start phones:gap-12':
              isRow,
            'flex-col gap-8': !isRow,
          })}
        >
          {label && (
            <FormLabel
              className={clsx('font-sans font-normal', {
                'w-1/3 phones:w-full': isRow && label,
                'hidden phones:w-full': isRow && !label,
              })}
            >
              {label}
            </FormLabel>
          )}
          <div
            className={clsx('flex flex-col gap-12 bg-white', {
              'w-2/3 phones:w-full': isRow && label,
              'w-full phones:w-full': isRow && !label,
            })}
          >
            <Input
              {...field}
              type={type}
              ref={inputRef}
              placeholder={placeholder}
              value={isRupiah ? formatRupiah(field.value || '') : field.value}
              defaultValue={defaultValue}
              className={clsx(`${inputClassName}`)}
              disabled={isDisabled}
              onChange={handleInputChange}
              onClick={(e) => {
                cursorRef.current =
                  (e.target as HTMLInputElement).selectionStart || 0
              }}
            />
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  )
}
