import { setStateTab } from '@/store/reducer/stateTab'
import clsx from 'clsx'
import { SetStateAction } from 'react'
import { useDispatch } from 'react-redux'

export function Tab({
  listMenu,
  menu,
  setMenu,
  localStorages,
  className,
  warnaPrimer,
  warnaSekunder,
}: {
  listMenu: string[]
  menu: string
  setMenu: React.Dispatch<SetStateAction<string>>
  localStorages?: string
  className?: string
  warnaPrimer?: string
  warnaSekunder?: string
}) {
  const dispatch = useDispatch()

  return (
    <div
      className={clsx(
        className,
        'scrollbar flex w-full gap-0 overflow-auto border-b border-[#CDCDCD]',
      )}
    >
      {listMenu?.map((item, idx) => (
        <div
          key={idx}
          onClick={() => {
            if (localStorage) {
              localStorage.setItem(localStorages, item)
            }
            setMenu(item)
            dispatch(setStateTab({ menu: item }))
          }}
          className={clsx(
            'flex min-w-[24rem] items-center justify-center border-b-2 py-12 transition-all duration-300 hover:cursor-pointer',
            {
              '': menu !== item,
              'rounded-t-2xl': menu === item,
            },
          )}
          style={{
            color: menu === item ? warnaPrimer : '#8E8E8E',
            borderColor: menu === item ? warnaPrimer : 'transparent',
            backgroundColor: menu === item ? `${warnaSekunder}29` : '',
            transition: 'color 0.3s',
          }}
          onMouseEnter={(e) => {
            if (menu !== item) e.currentTarget.style.color = warnaPrimer
          }}
          onMouseLeave={(e) => {
            if (menu !== item) e.currentTarget.style.color = '#8E8E8E'
          }}
        >
          <p>{item}</p>
        </div>
      ))}
    </div>
  )
}
