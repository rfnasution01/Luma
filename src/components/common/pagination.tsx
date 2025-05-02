import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'
import clsx from 'clsx'

export function Pagination({
  pageNow,
  lastPage,
  setPageNumber,
  backgroundColor = 'bg-slate-100',
  borderColor = 'border-slate-300',
  textColor = 'text-slate-700',
  style,
}: {
  pageNow: number
  lastPage: number
  setPageNumber: Dispatch<SetStateAction<number>>
  borderColor?: string
  backgroundColor?: string
  textColor?: string
  style?: React.CSSProperties
}) {
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= lastPage) {
      setPageNumber(page)
    }
  }

  const getPageNumbers = () => {
    const pages = []
    const maxPageButtons = 5
    const halfRange = Math.floor(maxPageButtons / 2)

    let startPage = Math.max(1, pageNow - halfRange)
    let endPage = Math.min(lastPage, pageNow + halfRange)

    if (endPage - startPage + 1 < maxPageButtons) {
      if (startPage === 1) {
        endPage = Math.min(lastPage, startPage + maxPageButtons - 1)
      } else if (endPage === lastPage) {
        startPage = Math.max(1, endPage - maxPageButtons + 1)
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }

    return pages
  }

  const pageNumbers = getPageNumbers()

  return (
    <div className="flex items-center gap-[1.6rem] phones:gap-[0.8rem]">
      {/* Previous Button */}
      <button
        onClick={() => handlePageChange(pageNow - 1)}
        disabled={pageNow <= 1}
        style={style}
        className={clsx(
          'flex h-[4rem] w-[4rem] items-center justify-center rounded-2xl transition-all duration-300',
          backgroundColor,
          textColor,
          'disabled:cursor-not-allowed disabled:opacity-50',
        )}
      >
        <ChevronLeft size={16} />
      </button>

      {/* Page Buttons */}
      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          style={style}
          className={clsx(
            'flex h-[4rem] w-[4rem] items-center justify-center rounded-2xl border transition-all duration-300',
            page === pageNow
              ? [backgroundColor, textColor, 'border-transparent']
              : [borderColor, 'text-black'],
          )}
        >
          {page}
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={() => handlePageChange(pageNow + 1)}
        disabled={pageNow >= lastPage}
        style={style}
        className={clsx(
          'flex h-[4rem] w-[4rem] items-center justify-center rounded-2xl transition-all duration-300',
          backgroundColor,
          textColor,
          'disabled:cursor-not-allowed disabled:opacity-50',
        )}
      >
        <ChevronRight size={16} />
      </button>
    </div>
  )
}
