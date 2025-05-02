import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/utils/cn'
import { Loader } from 'lucide-react'

const buttonVariants = cva(
  'inline-flex items-center whitespace-nowrap overflow-ellipsis justify-center rounded-md text-sm font-medium transition-all duration-300 focus-visible:outline-none disabled:pointer-events-none gap-2',
  {
    variants: {
      colorVariant: {
        nothing: [],
        default: [
          'bg-state-default',
          'border-state-default',
          'text-button-text',
          'hover:bg-state-hover',
          'hover:border-state-hover',
          'hover:text-button-hover-text',
          'active:bg-state-press',
          'active:border-state-press',
          'active:text-button-active-text',
          'focus:button-primary-background-',
          'disabled:bg-form-disabled',
          'disabled:border-state-disable',
          'disabled:text-formText-disabled',
        ],
        danger: [
          'bg-state-danger-default',
          'border-state-danger-default',
          'text-button-danger-text',
          'hover:bg-state-danger-hover',
          'hover:border-state-danger-hover',
          'hover:text-button-danger-hover-text',
          'active:bg-state-danger-press',
          'active:border-state-danger-press',
          'active:text-button-danger-active-text',
          'focus:button-primary-background-',
          'disabled:bg-state-danger-disable',
          'disabled:border-state-danger-disable',
          'disabled:text-button-danger-disabled-text',
        ],
        primary: [
          'bg-state-primary-default',
          'border-state-primary-default',
          'text-button-primary-text',
          'hover:bg-state-primary-hover',
          'hover:border-state-primary-hover',
          'hover:text-button-primary-hover-text',
          'active:bg-state-primary-press',
          'active:border-state-primary-press',
          'active:text-button-primary-active-text',
          'focus-visible:shadow-primary-shade-1',
          'disabled:bg-state-primary-disable',
          'disabled:border-state-primary-disable',
          'disabled:text-button-primary-disabled-text',
        ],
        success: [
          'bg-state-success-default',
          'border-state-success-default',
          'text-button-success-text',
          'hover:bg-state-success-hover',
          'hover:border-state-success-hover',
          'hover:text-button-success-hover-text',
          'active:bg-state-success-press',
          'active:border-state-success-press',
          'active:text-button-success-active-text',
          'focus:button-success-background-',
          'disabled:bg-state-success-disable',
          'disabled:border-state-success-disable',
          'disabled:text-button-success-disabled-text',
        ],
        warning: [
          'bg-state-warning-default',
          'border-state-warning-default',
          'text-button-warning-text',
          'hover:bg-state-warning-hover',
          'hover:border-state-warning-hover',
          'hover:text-button-warning-hover-text',
          'active:bg-state-warning-press',
          'active:border-state-warning-press',
          'active:text-button-warning-active-text',
          'focus:button-primary-background-',
          'disabled:bg-state-warning-disable',
          'disabled:border-state-warning-disable',
          'disabled:text-button-warning-disabled-text',
        ],
      },
      layout: {
        default: [],
        icon: [
          'bg-transparant',
          'hover:bg-transparant',
          'active:bg-transparant',
        ],
        solid: ['focus:ring'],
        outline: ['border-2', 'bg-background'],
      },
      variant: {
        nothing: [],
        outline: [
          'bg-button-outline-background',
          'border-button-outline-border',
          'text-button-outline-text',
          'hover:bg-button-outline-hover-background',
          'hover:border-button-outline-hover-border',
          'hover:text-button-outline-hover-text',
          'active:bg-button-outline-active-background',
          'active:border-button-outline-active-border',
          'active:text-button-outline-active-text',
          'focus:ring',
          'focus:button-primary-background-',
          'disabled:bg-button-outline-disabled-background',
          'disabled:border-button-outline-disabled-border',
          'disabled:text-button-outline-disabled-text',
          'border-2',
        ],
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        visible: 'border-none',
        outlined:
          'bg-background border border-borderSuburbed hover:border-borderHovered hover:bg-backgroundHovered focus-visible:shadow-primary-shade-1',
        'danger-solid': [
          'bg-button-danger-background',
          'border-button-danger-border',
          'text-button-danger-text',
          'hover:bg-button-danger-hover-background',
          'hover:border-button-danger-hover-border',
          'hover:text-button-danger-hover-text',
          'active:bg-button-danger-active-background',
          'active:border-button-danger-active-border',
          'active:text-button-danger-active-text',
          'focus:ring',
          'focus:button-primary-background-',
          'disabled:bg-button-danger-disabled-background',
          'disabled:border-button-danger-disabled-border',
          'disabled:text-button-danger-disabled-text',
          'border-2',
        ],
        'success-solid': [
          'bg-button-success-background',
          'border-button-success-border',
          'text-button-success-text',
          'hover:bg-button-success-hover-background',
          'hover:border-button-success-hover-border',
          'hover:text-button-success-hover-text',
          'active:bg-button-success-active-background',
          'active:border-button-success-active-border',
          'active:text-button-success-active-text',
          'focus:ring',
          'focus:button-primary-background-',
          'disabled:bg-button-success-disabled-background',
          'disabled:border-button-success-disabled-border',
          'disabled:text-button-success-disabled-text',
          'border-2',
        ],
        'primary-solid': [
          'bg-button-primary-background',
          'text-button-primary-text',
          'hover:bg-button-primary-hover-background',
          'active:bg-button-primary-active-background',
          'focus-visible:shadow-primary-shade-1',
          'focus:ring-0',
          'disabled:bg-button-primary-disabled-background',
          'disabled:text-button-primary-disabled-text',
        ],
        'primary-outline': [
          'bg-button-primaryOutline-background',
          'border-button-primaryOutline-border',
          'text-button-primaryOutline-text',
          'text-primaryColor',
          'hover:bg-button-primaryOutline-hover-background',
          'hover:border-button-primaryOutline-hover-border',
          'hover:text-button-primaryOutline-hover-text',
          'active:bg-button-primaryOutline-active-background',
          'active:border-button-primaryOutline-active-border',
          'active:text-button-primaryOutline-active-text',
          'focus:ring',
          'focus:button-primaryOutline-background-',
          'disabled:bg-button-primaryOutline-disabled-background',
          'disabled:border-button-primaryOutline-disabled-border',
          'disabled:text-button-primaryOutline-disabled-text',
          'border-2',
        ],
        icon: ['border-none'],
      },
      size: {
        default: 'h-10 px-4 py-2 text-sm',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
        fit: 'h-fit w-fit px-0 py-0',
      },
    },
    compoundVariants: [
      {
        layout: 'icon',
        colorVariant: 'danger',
        class: [
          'text-state-danger-hover',
          'hover:text-state-danger-hover',
          'active:text-state-danger-press',
        ],
      },
      {
        layout: 'icon',
        colorVariant: 'default',
        class: [
          'text-state-hover',
          'hover:text-state-hover',
          'active:text-state-press',
        ],
      },

      {
        layout: 'outline',
        colorVariant: 'primary',
        class: [
          'text-button-primaryOutline-text',
          'hover:text-button-primaryOutline-hover-text',
          'active:text-button-primaryOutline-active-text',
        ],
      },

      {
        layout: 'outline',
        colorVariant: 'default',
        class: [
          'text-button-primaryOutline-text',
          'hover:text-button-primaryOutline-hover-text',
          'active:text-button-primaryOutline-active-text',
        ],
      },
    ],
    defaultVariants: {
      variant: 'outlined',
      size: 'default',
      colorVariant: 'default',
      layout: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  isLoading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      colorVariant,
      layout,
      asChild = false,
      isLoading,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button'

    return (
      <Comp
        className={cn(
          buttonVariants({ variant, colorVariant, layout, size, className }),
        )}
        ref={ref}
        {...props}
      >
        {isLoading && (
          <span className="animate-spin duration-300">
            <Loader size={24} />
          </span>
        )}
        {props.children}
      </Comp>
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
