import { Dispatch, SetStateAction, useState } from 'react'
import clsx from 'clsx'
import { ChevronDown, ChevronUp } from 'lucide-react'
import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarTrigger,
} from '../menubar'

export function MenubarPerPage({
  pageSize,
  setPageSize,
  isCard,
  position,
}: {
  pageSize: number
  setPageSize: Dispatch<SetStateAction<number>>
  isCard?: boolean
  position?: 'top' | 'bottom'
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const num = isCard ? 12 : 10

  const numberList = []
  for (let i = num; i <= num * 10; i += num) {
    numberList?.push(i)
  }

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <Menubar className="px-4">
      <MenubarMenu>
        <MenubarTrigger
          className="w-full text-center transition-all duration-300 hover:cursor-pointer hover:opacity-90 disabled:cursor-not-allowed"
          variant="nothing"
          layout="icon"
          size="fit"
          onClick={handleMenuClick}
        >
          <div className="flex items-center gap-12 rounded-2xl border bg-[#F8F7FD] px-24 py-12">
            {pageSize ?? numberList?.[0]}
            {isMenuOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </div>
        </MenubarTrigger>
        {isMenuOpen && (
          <MenubarContent
            className={clsx(
              'text-warna-dark absolute w-auto bg-white p-32 text-[2rem] shadow-lg transition-all duration-300',
              {
                '-left-8 top-0': position === 'bottom',
                '-right-[10.5rem] bottom-[7rem]': position !== 'bottom',
              },
            )}
          >
            <div className="flex flex-col gap-24">
              {numberList?.map((item, idx) => (
                <p
                  onClick={() => {
                    setPageSize(item)
                    setIsMenuOpen(false)
                  }}
                  className={clsx(
                    'hover:text-primary-active text-center hover:cursor-pointer',
                    {
                      'text-primary-inactive': pageSize !== item,
                      'text-primary-active': pageSize === item,
                    },
                  )}
                  key={idx}
                >
                  {item}
                </p>
              ))}
            </div>
          </MenubarContent>
        )}
      </MenubarMenu>
    </Menubar>
  )
}
