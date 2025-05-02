/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseFormReturn } from 'react-hook-form'
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/feedback/form'
import { Input } from '.'
import { ReactNode } from 'react'
import clsx from 'clsx'

export function InputText({
  form,
  label,
  placeholder = '',
  name,
  prefix,
  suffix,
  type,
  handlerClick,
  className,
  isDisabled,
  isNumber,
  isFloat,
  isRow,
  isTime,
  defaultValue,
  inputClassName,
  onChange,
  isRupiah,
}: {
  form: UseFormReturn | undefined | any
  label?: string | ReactNode
  placeholder?: string
  name: string
  isRow?: boolean
  prefix?: JSX.Element
  suffix?: JSX.Element
  type?:
    | 'text'
    | 'number'
    | 'password'
    | 'date'
    | 'file'
    | 'time'
    | 'email'
    | 'url'
    | 'datetime-local'
    | 'color'
  handlerClick?: () => void
  className?: string
  isDisabled?: boolean
  isNumber?: boolean
  isFloat?: boolean
  isTime?: boolean
  defaultValue?: string
  inputClassName?: string
  onChange?: (value: string) => void
  isRupiah?: boolean
}) {
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
                'w-3/5 phones:w-full': isTime,
              })}
            >
              {label}
            </FormLabel>
          )}
          <div
            className={clsx('flex flex-col gap-12 bg-white', {
              'w-2/3 phones:w-full': isRow && label,
              'w-full phones:w-full': isRow && !label,
              'w-2/5 phones:w-full': isTime,
            })}
          >
            <Input
              {...field}
              type={type}
              placeholder={placeholder}
              value={
                isRupiah && isNumber
                  ? new Intl.NumberFormat('id-ID').format(
                      Number(field.value) || 0,
                    )
                  : field.value
              }
              defaultValue={defaultValue}
              prefix={prefix}
              className={clsx(`${inputClassName}`)}
              suffix={suffix}
              handlerClick={handlerClick}
              disabled={isDisabled}
              onInput={(e) => {
                const inputValue = (e.target as HTMLInputElement).value

                if (isNumber && type === 'text') {
                  const inputValue = (e.target as HTMLInputElement).value
                  ;(e.target as HTMLInputElement).value = inputValue.replace(
                    /[^\d]/g,
                    '',
                  )
                  field.onChange((e.target as HTMLInputElement).value)
                }
                if (isFloat && type === 'text') {
                  const inputValue = (e.target as HTMLInputElement).value
                  const formattedValue = inputValue
                    .replace(/[^\d.]/g, '') // Remove non-digit and non-period characters
                    .replace(/(\..*?)\..*/g, '$1') // Allow only one period

                  ;(e.target as HTMLInputElement).value = formattedValue
                  field.onChange(formattedValue)
                }
                if (onChange) {
                  onChange(inputValue)
                }
              }}
            />
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  )
}
