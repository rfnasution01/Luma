import { cn } from '@/utils/cn'
import clsx from 'clsx'
import { Search } from 'lucide-react'
import { Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react'

export function Searching({
  setSearch,
  search,
  className = 'w-full',
  setPage,
  rounded = 'rounded-lg',
  position = 'start',
  isAdditionIcon,
  additionIcon,
  innerClassName,
}: {
  setSearch: Dispatch<SetStateAction<string>>
  setPage?: Dispatch<SetStateAction<number>>
  search: string
  className?: string
  innerClassName?: string
  rounded?: string
  position?: 'start' | 'end'
  isAdditionIcon?: boolean
  additionIcon?: ReactNode
}) {
  const [inputValue, setInputValue] = useState(search) // Local state for debounce

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearch(inputValue) // Update the parent state after 3 seconds
      if (setPage) {
        setPage(1)
      }
    }, 1000) // 3-second delay

    return () => {
      clearTimeout(handler) // Clear the timeout if inputValue changes
    }
  }, [inputValue, setSearch, setPage])

  return (
    <div className={`relative flex ${className}`}>
      <div
        className={clsx(
          'pointer-events-none absolute inset-y-0 flex items-center',
          {
            'left-0 pl-16': position === 'start',
            'right-0 pr-16': position === 'end',
          },
        )}
      >
        <Search size={14} />
      </div>
      {isAdditionIcon && (
        <div
          className={clsx(
            'absolute inset-y-0 right-0 flex items-center pr-16 hover:cursor-pointer',
          )}
        >
          {additionIcon}
        </div>
      )}
      <input
        type="search"
        placeholder="Cari"
        value={inputValue} // Controlled by local state
        className={cn(
          `disabled:text-formText-disabled border-input text-sm placeholder:text-muted-foreground disabled:bg-form-disabled focus:shadow-primary-shade-1 h-[4.8rem] flex-grow ${rounded} border border-gray-300 bg-[#F8F7FD] py-16 transition-all duration-300 file:border-0 file:bg-transparent file:text-[2rem] file:font-medium focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-50 phones:pl-64`,
          position === 'end'
            ? `${isAdditionIcon ? 'pl-48' : 'pl-24'} pr-48 phones:pl-24`
            : `pl-48 ${isAdditionIcon ? 'pr-48' : 'pr-16'}`,
          innerClassName,
        )}
        onChange={(e) => {
          setInputValue(e.target.value) // Update local state immediately
        }}
      />
      {/* {inputValue !== '' && (
        <div
          className="absolute inset-y-0 right-32 flex items-center pr-16 text-stone-500 hover:cursor-pointer"
          onClick={() => {
            setInputValue('') // Clear local state
            if (setPage) {
              setPage(1)
            }
          }}
        >
          <X size={16} />
        </div>
      )} */}
    </div>
  )
}
