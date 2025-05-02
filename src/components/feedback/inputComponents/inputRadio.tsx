/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseFormReturn } from 'react-hook-form'
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/feedback/form'
import { Input } from '.'
import { Fragment, ReactNode } from 'react'
import clsx from 'clsx'
import { ResSelectType } from '../selectComponents'

export function InputRadio({
  form,
  label,
  name,
  className,
  isDisabled,
  isRow,
  data,
  defaultValue,
}: {
  form: UseFormReturn | undefined | any
  label?: string | ReactNode
  name: string
  className?: string
  isDisabled?: boolean
  isRow?: boolean
  data: ResSelectType[]
  defaultValue?: ResSelectType
}) {
  return (
    <FormField
      control={form?.control}
      name={name}
      render={({ field }) => (
        <FormItem
          className={`flex w-full ${isRow ? 'flex-row items-center gap-32' : 'flex-col gap-12'} font-sans text-[2rem] ${className}`}
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
          <div className={`flex items-center gap-32`}>
            <div className="flex w-full items-center gap-24">
              {data?.map((item, idx) => (
                <Fragment key={idx}>
                  <label className="flex items-center gap-12">
                    <Input
                      type="radio"
                      value={item?.value}
                      checked={field.value === item?.value}
                      onChange={() => field.onChange(item?.value)}
                      disabled={isDisabled}
                      defaultValue={defaultValue?.value}
                      className="h-[2.8rem] w-[2.8rem]"
                    />
                    <p className="text-nowrap">{item?.label}</p>
                  </label>
                </Fragment>
              ))}
            </div>
            <FormMessage className="text-nowrap" />
          </div>
        </FormItem>
      )}
    />
  )
}
