import { cn } from '@/utils/cn'
import * as React from 'react'
import { useFormField } from '../form'

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  customProp?: string // Example custom property
}
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    const { error: errorSchema } = useFormField()
    return (
      <textarea
        className={cn(
          'disabled:bg-portal-lightBlue flex-grow rounded-lg border border-gray-300 bg-[#F8F7FD] p-12 transition-all duration-300 file:border-0 file:bg-transparent file:font-medium focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 disabled:cursor-not-allowed',
          'resize-none',
          'min-h-[80px]',
          className,
          errorSchema &&
            'border-destructive text-destructive placeholder:text-destructive',
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
Textarea.displayName = 'Textarea'

export { Textarea }
