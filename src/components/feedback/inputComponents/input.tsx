import * as React from 'react'
import { useFormField } from '@/components/feedback/form'

import { cn } from '@/utils/cn'

import { FieldError } from 'react-hook-form'

export interface InputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'prefix' | 'suffix'
  > {
  suffix?: React.ReactElement
  prefix?: React.ReactElement
  error?: FieldError | undefined
  handlerClick?: () => void
  onValueChange?: () => void
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      error,
      suffix,
      prefix,
      handlerClick,
      onValueChange,
      ...props
    },
    ref,
  ) => {
    const { error: errorSchema } = useFormField()

    return (
      <div className={cn('relative flex w-full', className)}>
        {prefix && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-16">
            {prefix}
          </div>
        )}
        <input
          type={type}
          className={cn(
            `disabled:bg-portal-lightBlue h-[4.8rem] flex-grow rounded-lg border border-gray-300 bg-[#F8F7FD] p-12 transition-all duration-300 file:border-0 file:bg-transparent file:font-medium focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 disabled:cursor-not-allowed`,
            className,
            errorSchema &&
              'border-destructive text-destructive placeholder:text-destructive',
            error && 'border-destructive',
            prefix && 'pl-48 phones:pl-64', // add left padding if prefix is present
            suffix && 'pr-48 phones:pr-64', // add right padding if suffix is present
          )}
          onChange={onValueChange}
          ref={ref}
          {...props}
        />
        {suffix && (
          <div
            className="absolute inset-y-0 right-0 flex items-center pr-16 hover:cursor-pointer"
            onClick={handlerClick}
          >
            {suffix}
          </div>
        )}
      </div>
    )
  },
)

Input.displayName = 'Input'

export { Input }
