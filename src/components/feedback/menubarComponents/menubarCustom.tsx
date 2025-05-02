import { ReactNode } from 'react'
import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarTrigger,
} from '@/components/feedback/menubar'
import clsx from 'clsx'

export function MenubarCustom({
  trigger,
  content,
  position = 'right',
  width = 'w-[30rem]',
  padding = 'p-12',
  custom,
  disabled,
  isNoClick,
  handleMenuOpen,
  handleMenuClose,
  isMenuOpen,
  className,
  wfull,
}: {
  trigger: ReactNode
  content: ReactNode
  position?: 'left' | 'right'
  width?: string
  padding?: string
  custom?: string
  disabled?: boolean
  isNoClick?: boolean
  handleMenuClose?: () => void
  handleMenuOpen?: () => void
  isMenuOpen?: boolean
  className?: string
  wfull?: boolean
}) {
  return (
    <Menubar
      className={clsx('px-4', {
        'w-full': wfull,
      })}
    >
      <MenubarMenu>
        <MenubarTrigger
          className="flex w-full items-start transition-all duration-300 hover:cursor-pointer hover:opacity-90 disabled:cursor-not-allowed"
          variant="nothing"
          layout="icon"
          size="fit"
          onClick={handleMenuOpen}
          disabled={disabled}
        >
          {trigger}
        </MenubarTrigger>
        {isMenuOpen && (
          <MenubarContent
            className={clsx(
              `${width} absolute top-0 ${padding} text-[2rem] shadow-lg transition-all duration-300 ${className}`,
              {
                'left-0': position === 'right',
                'right-0 phones:-right-[5rem]': position === 'left',
              },
              custom,
            )}
            onClick={() => {
              if (!isNoClick) {
                handleMenuClose()
              }
            }}
          >
            {content}
          </MenubarContent>
        )}
      </MenubarMenu>
    </Menubar>
  )
}
