import { UseFormReturn } from 'react-hook-form'
import clsx from 'clsx'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/feedback/form'
import { Textarea } from './textArea'

export const InputTextArea = ({
  name,
  placeholder,
  label,
  isDisabled,
  form,
  inputClassName,
  className,
  isRow,
}: {
  name: string
  placeholder?: string
  label?: string
  isDisabled?: boolean
  form: UseFormReturn
  inputClassName?: string
  className?: string
  isRow?: boolean
}) => {
  return (
    <FormField
      name={name}
      control={form.control}
      render={({ field }) => {
        return (
          <FormItem
            className={`flex ${isRow ? 'flex-row gap-32 phones:flex-col' : 'flex-col gap-12'} ${className}`}
          >
            {label && (
              <FormLabel
                className={clsx('font-sans font-normal', {
                  'w-1/3 phones:w-full': isRow,
                })}
              >
                {label}
              </FormLabel>
            )}
            <FormControl>
              <Textarea
                disabled={isDisabled}
                className={clsx(`${inputClassName}`, {
                  'w-2/3 phones:w-full': isRow,
                })}
                placeholder={placeholder}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )
      }}
    />
  )
}
