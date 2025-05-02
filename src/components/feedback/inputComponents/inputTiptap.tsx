/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseFormReturn } from 'react-hook-form'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../form'
import Tiptap from '../tiptapComponents'
import { ReactNode } from 'react'
import clsx from 'clsx'

export function InputTipTap({
  form,
  name,
  className,
  inputClassName,
  isRow,
  label,
  placeholder,
}: {
  form: UseFormReturn | undefined | any
  label?: string | ReactNode
  placeholder?: string
  name: string
  isRow?: boolean
  className?: string
  inputClassName?: string
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
            <FormControl>
              <Tiptap
                content={field.value}
                placeholder={placeholder}
                update={field.onChange}
                toolbarClassName={`gap-4 p-4 ${inputClassName}`}
              />
            </FormControl>
          </div>

          <FormMessage />
        </FormItem>
      )}
    />
  )
}
