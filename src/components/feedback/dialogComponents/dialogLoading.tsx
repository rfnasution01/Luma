import { Dispatch, SetStateAction } from 'react'
import { Dialog, DialogContent } from '@/components/feedback/dialog'
import { Loader2 } from 'lucide-react'

export function DialogLoading({
  isOpen,
  setIsOpen,
  disableOutsideDialog = true,
}: {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  disableOutsideDialog?: boolean
}) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        className={`scrollbar flex flex-col overflow-auto border bg-white text-[2rem] phones:text-[2rem]`}
        position="middle"
        onInteractOutside={(event) => {
          if (disableOutsideDialog) {
            event?.preventDefault()
          }
        }}
      >
        <div className="scrollbar flex h-full flex-col items-center justify-center gap-32 overflow-auto bg-transparent p-32 text-[2rem] phones:text-[2rem]">
          <Loader2
            size={32}
            className="animate-spin transition-all duration-300"
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
