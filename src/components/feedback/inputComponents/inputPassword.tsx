import * as React from 'react'
import { cn } from '@/utils/cn'
import { Input, InputProps } from './input'

export enum FormInputType {
  text,
  password,
}
export interface FormInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  inputType?: FormInputType
}
export const InputPassword = React.forwardRef<HTMLInputElement, InputProps>(
  ({ ...props }, ref) => {
    const [hide, setHide] = React.useState(true)
    const { error } = props
    return (
      <div className="rounded relative border">
        <Input ref={ref} type={hide ? 'password' : 'text'} {...props} />
        <span
          className={cn(
            'absolute inset-y-0 end-0 flex items-center space-x-1 px-4',
          )}
          onClick={() => setHide(!hide)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-gray-400 hover:cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinejoin="round"
              strokeWidth={2}
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
          <p
            className={cn(
              'text-sm text-subdued hover:cursor-pointer',
              error && 'text-red-300',
            )}
          >
            {hide ? 'Tampilkan' : 'Sembunyikan'}
          </p>
        </span>
      </div>
    )
  },
)
