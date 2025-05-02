/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseFormReturn } from 'react-hook-form'
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/feedback/form'
import { Input } from '.'
import clsx from 'clsx'

export function InputCheckbox({
  form,
  label,
  name,
  className,
  isDisabled,
  isRow,
}: {
  form: UseFormReturn | undefined | any
  label?: string
  name: string
  className?: string
  isDisabled?: boolean
  isRow?: boolean
}) {
  return (
    <FormField
      control={form?.control}
      name={name}
      render={({ field }) => (
        <FormItem
          className={`flex w-full ${isRow ? 'flex-row items-center gap-12' : 'flex-col gap-12'} font-sans text-[2rem] ${className}`}
        >
          <div className="flex items-center gap-12">
            <label className="flex items-center gap-8">
              <Input
                type="checkbox"
                checked={field.value === 'Ya'}
                onChange={() =>
                  field.onChange(field.value === 'Ya' ? 'Tidak' : 'Ya')
                }
                disabled={isDisabled}
                className="h-[2rem] w-[2rem]"
              />
              {label && (
                <FormLabel
                  className={clsx('font-sans font-normal', {
                    'w-1/3 phones:w-full': isRow,
                  })}
                >
                  {label}
                </FormLabel>
              )}
            </label>
            <FormMessage className="text-nowrap" />
          </div>
        </FormItem>
      )}
    />
  )
}
