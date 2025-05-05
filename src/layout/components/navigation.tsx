import { useNavigate } from 'react-router-dom'
import { usePathname } from '@/hooks/usePathname'
import { convertToSlug } from '@/utils/formatText'
import clsx from 'clsx'

export default function Navigation() {
  const navigate = useNavigate()
  const { firstPathname } = usePathname()
  const navItems = ['Home', 'Surat']

  return (
    <nav className="flex items-center gap-32 font-inter text-[2.4rem]">
      {navItems.map((item, idx) => {
        const isActive =
          convertToSlug(item) === firstPathname ||
          (!firstPathname && item === 'Home')
        return (
          <div
            key={idx}
            onClick={() => {
              if (item === 'Home') {
                navigate('/')
              } else {
                navigate(`/${convertToSlug(item)}`)
              }
            }}
            className={clsx(
              'transition-all duration-300 hover:cursor-pointer',
              {
                'text-gray-900': isActive,
                'text-gray-500 hover:text-blue-500': !isActive,
              },
            )}
          >
            <p>{item}</p>
          </div>
        )
      })}
    </nav>
  )
}
