import * as React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { cn } from '@/utils/cn'

const Dialog = DialogPrimitive.Root

const DialogTrigger = DialogPrimitive.Trigger

const DialogPortal = ({ ...props }: DialogPrimitive.DialogPortalProps) => (
  <DialogPrimitive.Portal {...props} />
)
DialogPortal.displayName = DialogPrimitive.Portal.displayName

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay> & {
    position?: 'left' | 'right' | 'top' | 'bottom' | 'middle'
  }
>(({ className, position, ...props }, ref) => {
  let overlayClassName =
    'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50'

  switch (position) {
    case 'left':
      overlayClassName += ' left-0 top-0 bottom-0'
      break
    case 'right':
      overlayClassName += ' right-0 top-0 bottom-0'
      break
    case 'top':
      overlayClassName += ' top-0 left-0 right-0'
      break
    case 'bottom':
      overlayClassName += ' bottom-0 left-0 right-0'
      break
    case 'middle':
      overlayClassName += ' top-0 left-0 right-0'
      break
    default:
      overlayClassName += ' top-0 left-0 right-0'
  }

  return (
    <DialogPrimitive.Overlay
      ref={ref}
      className={cn(overlayClassName, className)}
      {...props}
    />
  )
})
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
    position?: 'left' | 'right' | 'top' | 'bottom' | 'middle'
  }
>(({ className, position, children, ...props }, ref) => {
  let contentClassName =
    'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] fixed z-[1400] gap-24 rounded-2xl shadow-lg duration-200'

  switch (position) {
    case 'left':
      contentClassName += ' left-0 top-[50%] transform translate-y-[-50%]'
      break
    case 'right':
      contentClassName += ' right-0 top-[50%] transform translate-y-[-50%]'
      break
    case 'top':
      contentClassName += ' top-0 left-[50%] transform translate-x-[-50%]'
      break
    case 'bottom':
      contentClassName += ' bottom-0 left-[50%] transform translate-x-[-50%]'
      break
    case 'middle':
      contentClassName +=
        ' top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]'
      break
    default:
      contentClassName +=
        ' top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]'
  }

  return (
    <DialogPortal>
      <DialogOverlay className="z-[1300]" position={position} />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(contentClassName, className)}
        {...props}
      >
        {children}
      </DialogPrimitive.Content>
    </DialogPortal>
  )
})
DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('', className)} {...props} />
)
DialogHeader.displayName = 'DialogHeader'

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex flex-col-reverse phones:flex-row phones:justify-end phones:space-x-2',
      className,
    )}
    {...props}
  />
)
DialogFooter.displayName = 'DialogFooter'

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      'text-lg leading-none tracking-tight font-semibold',
      className,
    )}
    {...props}
  />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}
