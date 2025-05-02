import { Dispatch, ReactNode, SetStateAction } from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/feedback/dialog'
import { X } from 'lucide-react'

export function DialogCustom({
  isOpen,
  setIsOpen,
  buttonContent,
  headerTitle,
  textContent,
  isAuto,
  width,
  isMobile,
  classNameHeader,
  disableOutsideDialog = true,
  backgroundColor = 'bg-white',
  height,
}: {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  buttonContent?: ReactNode
  headerTitle?: ReactNode
  textContent?: ReactNode
  isAuto?: boolean
  width?: string
  isMobile?: boolean
  classNameHeader?: string
  disableOutsideDialog?: boolean
  backgroundColor?: string
  height?: string
}) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        className={`scrollbar flex flex-col overflow-auto border text-[2rem] ${backgroundColor} phones:text-[2rem]`}
        position="middle"
        aria-describedby="dialog-description"
        style={{
          width: isAuto ? 'auto' : isMobile ? '90%' : width ? width : '30%',
          height: height || 'auto',
          maxHeight: '90vh',
        }}
        onInteractOutside={(event) => {
          if (disableOutsideDialog) {
            event?.preventDefault()
          }
        }}
      >
        <div className="scrollbar flex h-full flex-col gap-32 overflow-auto p-32 text-[2rem] phones:text-[2rem]">
          {/* --- Header --- */}
          <DialogHeader>
            <DialogTitle
              className={`text-[2.2rem] font-bold phones:text-[2.6rem] ${classNameHeader ?? 'text-center'}`}
            >
              {headerTitle || ''}
            </DialogTitle>
            <DialogPrimitive.Close className="focus:ring-ring data-[state=open]:text-muted-foreground absolute right-32 top-32 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent">
              <X size={16} />
              <span className="sr-only">Close</span>
            </DialogPrimitive.Close>
          </DialogHeader>

          {/* --- Hidden Description for Accessibility --- */}
          <div id="dialog-description" className="hidden">
            {typeof textContent === 'string'
              ? textContent
              : 'Dialog description'}
          </div>

          <div className="scrollbar flex h-full w-full flex-1 overflow-auto">
            {textContent}
          </div>
          {buttonContent && <div className="flex w-full">{buttonContent}</div>}
        </div>
      </DialogContent>
    </Dialog>
  )
}
