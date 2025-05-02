import { Dispatch, ReactNode, SetStateAction } from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../dialog'
import { XSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function DialogLogout({
  isOpen,
  setIsOpen,
  child,
  isAuto,
  isMobile,
  width,
  disableOutsideDialog = true,
}: {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  child: ReactNode
  isAuto?: boolean
  width?: string
  isMobile?: boolean
  disableOutsideDialog?: boolean
}) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        className="scrollbar bg-portal-lightBlue text-portal-violet flex flex-col overflow-y-auto"
        position="middle"
        style={{
          width: isAuto ? 'auto' : isMobile ? '90%' : width ? width : '30%',
        }}
        onInteractOutside={(event) => {
          if (disableOutsideDialog) {
            event?.preventDefault()
          }
        }}
      >
        <div className="flex flex-col gap-24 p-32">
          {/* --- Header --- */}
          <DialogHeader>
            <DialogTitle>
              <p className="border-b pb-16 text-left text-[2.4rem] font-bold">
                Logout
              </p>
            </DialogTitle>
            <DialogPrimitive.Close className="focus:ring-ring data-[state=open]:text-muted-foreground absolute right-32 top-32 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent">
              <XSquare size={16} />
              <span className="sr-only">Close</span>
            </DialogPrimitive.Close>
          </DialogHeader>
          <p className="font-sans text-[2rem]" style={{ lineHeight: '130%' }}>
            Apakah Anda yakin ingin keluar? Untuk kembali masuk, harap masukkan
            username dan password Anda.
          </p>
          <div className="flex items-center justify-end gap-0 text-[2rem]">
            <Button
              color="bg-transparent"
              fx={() => setIsOpen(false)}
              label="Batalkan"
              type="button"
              text="text-portal-violet"
            />

            {child}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
