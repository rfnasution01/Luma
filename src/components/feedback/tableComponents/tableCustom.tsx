import React, { Fragment, ReactNode, useState } from 'react'
import clsx from 'clsx'
import Loading from '@/components/ui/loading'

export type Column<T> = {
  header: string
  key?: string | number
  renderCell?: (rowData: T) => React.ReactNode
  width?: string
}

type Props<T, P> = {
  data: T[]
  columns: Column<T>[] | ((props: P) => Column<T>[])
  containerClasses?: string
  maxHeight?: string
  loading?: boolean
  columnProps?: P
  onItemClick?: (rowData: T) => void
  isNumber?: boolean
  currentPage?: number
  pageSize?: number
  setCheckedPool?: React.Dispatch<React.SetStateAction<string[]>>
  checkedPool?: string[]
  disabledCheckboxList?: string[]
  isChecked?: boolean
  checkboxEnablerColumn?: string
  reverseCheckbox?: boolean
  disableCheckbox?: boolean
  checkFn?: (e: boolean, id: string) => void
  colorHeader?: string
  colorBorder?: string
  borderSeparate?: boolean
  isAction?: boolean
  alignPosition?: 'top' | 'middle' | 'bottom'
  actionHeader?: ReactNode
  actionBody?: (data: T) => React.ReactNode
  theadClassName?: string
  tbody?: string
  style?: React.CSSProperties
  search?: string
}

export function TableCustom<T, P>({
  data,
  columns,
  containerClasses = '',
  maxHeight = 'max-h-[70vh]',
  loading,
  columnProps,
  onItemClick,
  isNumber,
  currentPage,
  pageSize,
  setCheckedPool,
  checkedPool,
  disabledCheckboxList,
  isChecked,
  checkboxEnablerColumn,
  reverseCheckbox,
  disableCheckbox,
  checkFn,
  colorBorder = 'border-[#E0EFFF]',
  colorHeader = 'bg-[#E0EFFF]',
  borderSeparate,
  alignPosition = 'top',
  style,
  isAction,
  actionHeader,
  actionBody,
  theadClassName,
  tbody,
  search,
}: Props<T, P>) {
  const searchingNotFound = !search || search === ''

  const columnArray =
    typeof columns === 'function' ? columns(columnProps as P) : columns

  // Header checkbox state
  const [headerChecked, setHeaderChecked] = useState(false)

  // Header checkbox event handler
  const checkHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked
    if (setCheckedPool) {
      setCheckedPool(checked ? data?.map((item) => item['id']) : [])
      setHeaderChecked(checked)
    }
  }

  // Update header checkbox state based on checkedPool
  React.useEffect(() => {
    if (data?.length === 0) {
      setHeaderChecked(false)
    } else {
      const selectedCount = checkedPool?.length ?? 0
      const totalCount = data?.length - (disabledCheckboxList?.length ?? 0)
      setHeaderChecked(selectedCount === totalCount)
    }
  }, [checkedPool, data?.length, disabledCheckboxList])

  return (
    <div
      className={`scrollbar h-full w-full flex-1 overflow-auto ${containerClasses}`}
    >
      {/* ----- Loading UI ----- */}
      <div
        className={`scrollbar flex w-full flex-col overflow-auto ${maxHeight}`}
        // style={{ scrollbarGutter: 'stable' }}
      >
        <table className="scrollbar h-full flex-1 border-collapse font-sans text-[2rem]">
          <thead className="relative z-10 border align-middle leading-medium">
            <tr className={`border ${colorBorder} ${theadClassName}`}>
              {/* --- NO --- */}
              {isNumber && pageSize && currentPage && (
                <th
                  style={style}
                  className={`sticky top-0 w-[5%] p-12 text-center ${colorHeader}`}
                >
                  #
                </th>
              )}

              {/* --- Checked --- */}
              {isChecked && (
                <th
                  style={style}
                  className={`sticky top-0 ${colorHeader} p-12 text-center`}
                >
                  <div className="flex items-center justify-center gap-12">
                    <input
                      type="checkbox"
                      className="!pt-0"
                      onChange={checkHandler}
                      checked={headerChecked}
                    />
                  </div>
                </th>
              )}

              {/* ----- Table Headers ----- */}
              {columnArray
                ?.filter((column) => !column.header.includes('Aksi'))
                ?.map((column, colIndex) => (
                  <th
                    style={style}
                    className={`sticky top-0 ${colorHeader} p-12 text-left ${column.width}`}
                    key={column.key || colIndex.toString()}
                  >
                    {column.header}
                  </th>
                ))}

              {/* --- Action --- */}
              {isAction && (
                <th
                  style={style}
                  className={`sticky top-0 w-[5%] p-12 text-center ${colorHeader}`}
                >
                  {actionHeader}
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr
                className={clsx(
                  `border hover:bg-slate-100 ${colorBorder} ${tbody} transition-all ease-in hover:cursor-pointer`,
                )}
              >
                <td
                  colSpan={20}
                  className="p-12 text-center align-middle leading-medium"
                >
                  <Loading />
                </td>
              </tr>
            ) : data?.length === 0 ? (
              <tr
                className={clsx(
                  `border hover:bg-slate-100 ${colorBorder} ${tbody} transition-all ease-in hover:cursor-pointer`,
                )}
              >
                <td
                  className="p-12 text-left align-top leading-medium"
                  colSpan={20}
                >
                  {searchingNotFound
                    ? `Tidak ada data yang cocok dengan pencarian "${search}"`
                    : 'Tidak ada data yang dapat ditampilkan'}
                </td>
              </tr>
            ) : (
              data?.map((row: T, rowIndex) => (
                <Fragment key={rowIndex}>
                  <tr
                    className={clsx(
                      `hover:bg-slate-100 ${borderSeparate ? `border-b ${colorBorder}` : `border ${colorBorder}`} transition-all ${tbody} ease-in hover:cursor-pointer`,
                    )}
                    onClick={onItemClick ? () => onItemClick(row) : undefined}
                  >
                    {/* ----- Nomor ----- */}
                    {isNumber && currentPage && pageSize && (
                      <td
                        className={clsx('p-12 text-center leading-medium', {
                          'align-top': alignPosition === 'top',
                          'align-middle': alignPosition === 'middle',
                          'align-bottom': alignPosition === 'bottom',
                        })}
                      >
                        {currentPage * pageSize + (rowIndex + 1 - pageSize)}
                      </td>
                    )}
                    {/* --- Checked --- */}
                    {isChecked && (
                      <td
                        className={clsx('p-12 text-center leading-medium', {
                          'align-top': alignPosition === 'top',
                          'align-middle': alignPosition === 'middle',
                          'align-bottom': alignPosition === 'bottom',
                        })}
                      >
                        <input
                          type="checkbox"
                          checked={
                            checkboxEnablerColumn
                              ? reverseCheckbox
                                ? !row[checkboxEnablerColumn]
                                : row[checkboxEnablerColumn]
                              : checkedPool
                                ? checkedPool.includes(row['id'])
                                : false
                          }
                          onClick={(e) => e.stopPropagation()}
                          onChange={(e) => {
                            if (setCheckedPool) {
                              setCheckedPool((prev) => {
                                if (!prev) return []
                                return e.target.checked
                                  ? [...prev, row['id']]
                                  : prev.filter((item) => item !== row['id'])
                              })
                            }
                            if (checkFn) checkFn(e.target.checked, row['id'])
                          }}
                          disabled={
                            disableCheckbox ||
                            (disabledCheckboxList &&
                              disabledCheckboxList.includes(
                                row['id'] as string,
                              ))
                          }
                        />
                      </td>
                    )}

                    {/* ----- Cells ----- */}
                    {columnArray
                      ?.filter((column) => !column.header.includes('Aksi'))
                      ?.map((column, colIndex) => (
                        <td
                          className={clsx(
                            `p-12 text-left leading-medium ${column.width}`,
                            {
                              'align-top': alignPosition === 'top',
                              'align-middle': alignPosition === 'middle',
                              'align-bottom': alignPosition === 'bottom',
                            },
                          )}
                          key={colIndex.toString()}
                        >
                          {column.renderCell
                            ? column.renderCell(row)
                            : (row[
                                column.key as keyof T
                              ] as unknown as React.ReactNode)}
                        </td>
                      ))}

                    {/* --- Action --- */}
                    {isAction && actionBody && (
                      <td
                        className={clsx(`p-12 text-left leading-medium`, {
                          'align-top': alignPosition === 'top',
                          'align-middle': alignPosition === 'middle',
                          'align-bottom': alignPosition === 'bottom',
                        })}
                      >
                        {actionBody(row)}
                      </td>
                    )}
                  </tr>
                </Fragment>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
