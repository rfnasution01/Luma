import { usePathname } from '@/hooks/usePathname'
import { convertSlugToText } from '@/utils/formatText'
import clsx from 'clsx'
import { ChevronLeft } from 'lucide-react'
import { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

export function Breadcrumbs({
  isBack,
  text = 'text-[3.2rem]',
  rightContent,
}: {
  isBack?: boolean
  text?: string
  rightContent?: ReactNode
}) {
  const navigate = useNavigate()
  const { lastPathname } = usePathname()

  return (
    <div
      onClick={() => {
        if (isBack) {
          navigate(-1)
        }
      }}
      className="flex items-center justify-between gap-12 hover:cursor-pointer"
    >
      <div className="flex items-end gap-12">
        {isBack && (
          <span className="flex h-[3rem] w-[3rem] items-center justify-center rounded-full bg-[#DCE2FB] hover:bg-opacity-80">
            <ChevronLeft size={12} />
          </span>
        )}
        <p className={clsx(text, 'font-roboto')}>
          {convertSlugToText(lastPathname)}
        </p>
      </div>
      {rightContent}
    </div>
  )
}
