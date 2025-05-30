import { useEffect, useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import Select, { components } from 'react-select'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/feedback/form'
import { cn } from '@/utils/cn'
import { customStyles } from './selectType'
import clsx from 'clsx'
import { ResReferensiType, useGetKabupatenQuery } from './data'

type inputProps = {
  placeholder: string
  isDisabled?: boolean
  name: string
  headerLabel?: string
  form: UseFormReturn
  className?: string
  level1?: boolean
  level2?: boolean
  level3?: boolean
  level4?: boolean
  level5?: boolean
  level6?: boolean
  isRow?: boolean
}

export function SelectKabupaten({
  name,
  headerLabel,
  placeholder,
  isDisabled,
  form,
  className,
  level1,
  level2,
  level3,
  level4,
  level5,
  level6,
  isRow,
}: inputProps) {
  const [query, setQuery] = useState<string>(null)
  const [listKabupaten, setListKabupaten] = useState<ResReferensiType[]>([])
  const provinsi = form.watch('provinsi_id')

  const { data, isSuccess, isLoading, isFetching } = useGetKabupatenQuery(
    { idProvinsi: provinsi },
    { skip: !provinsi },
  )

  useEffect(() => {
    if (!isFetching) {
      if (data?.meta?.page > 1) {
        setListKabupaten((prevData) => [...prevData, ...(data?.data ?? [])])
      } else {
        setListKabupaten([...(data?.data ?? [])])
      }
    }
  }, [data, provinsi, isFetching])

  let kabupatenOption = []
  if (isSuccess) {
    kabupatenOption = listKabupaten.map((item) => {
      return {
        value: item?.id,
        label: item?.nama,
      }
    })
  }

  const search = (newValue: string) => {
    if (newValue != query) {
      setQuery(newValue)
    }
  }

  const Option = (props) => {
    return (
      <components.Option {...props}>
        <div ref={props.innerRef}>
          <div className="text-[12px]">{props.label}</div>
        </div>
      </components.Option>
    )
  }

  return (
    <FormField
      name={name}
      control={form.control}
      render={({ field }) => {
        return (
          <FormItem
            className={cn(
              `${level1 ? 'z-50' : level2 ? 'z-40' : level3 ? 'z-30' : level4 ? 'z-20' : level5 ? 'z-10' : level6 ? 'z-[5]' : 'z-0'} flex w-full gap-12 text-[2rem] phones:flex-col phones:items-start phones:gap-12 phones:text-[2rem]`,
              className,
              isRow ? 'flex-row' : 'flex-col',
            )}
          >
            {headerLabel && (
              <div
                className={clsx('phones:w-full phones:text-left', {
                  'w-2/5': isRow,
                  'w-full': !isRow,
                })}
              >
                <FormLabel>{headerLabel}</FormLabel>
              </div>
            )}
            <div className={`${!isRow ? 'w-full' : 'w-3/5'} phones:w-full`}>
              <FormControl>
                <Select
                  {...field}
                  styles={{
                    ...customStyles,
                    singleValue: (provided) => ({
                      ...provided,
                      color: '#1F475C',
                      // textTransform: 'uppercase',
                    }),
                    input: (provided) => ({
                      ...provided,
                      color: '#1F475C',
                      padding: 0,
                    }),
                    menuList: (provided) => ({
                      ...provided,
                      padding: 0,
                      maxHeight: '27vh',
                      overflowY: 'auto',
                      '&::-webkit-scrollbar': {
                        width: 0,
                        height: 0,
                      },
                      '&::-webkit-scrollbar-track': {
                        backgroundColor: 'transparent',
                      },
                      '&::-webkit-scrollbar-thumb': {
                        backgroundColor: 'transparent',
                        borderRadius: '6px',
                      },
                      border: '1px solid grey',
                    }),
                    control: (provided) => ({
                      ...provided,
                      height: '4.8rem', // Menambahkan tinggi input
                      backgroundColor: isDisabled
                        ? '#F0F3FF'
                        : 'rgb(255 255 255 / var(--tw-bg-opacity))',
                      border:
                        '1px solid rgb(203 213 225 / var(--tw-bg-opacity))',
                      borderRadius: '0.375rem',
                      fontSize: '2rem',
                    }),
                    option: (provided) => ({
                      ...provided,
                      backgroundColor:
                        'rgb(255 255 255 / var(--tw-bg-opacity))',
                      color: '#1F475C',
                      cursor: isDisabled ? 'not-allowed' : 'default',
                      ':hover': {
                        cursor: 'pointer',
                        backgroundColor:
                          'rgb(240 244 247 / var(--tw-bg-opacity))',
                      },
                    }),
                  }}
                  className={`${level1 ? 'z-50' : level2 ? 'z-40' : level3 ? 'z-30' : level4 ? 'z-20' : level5 ? 'z-10' : level6 ? 'z-[5]' : 'z-0'} text-[2rem]`}
                  options={kabupatenOption}
                  value={
                    kabupatenOption.filter(
                      (item) => item.value === field.value,
                    )[0]
                  }
                  placeholder={placeholder ?? 'Pilih'}
                  onInputChange={search}
                  onChange={(optionSelected) => {
                    field.onChange(optionSelected.value)
                    form.setValue('kabupaten_id', optionSelected.value)
                    form.setValue('kecamatan_id', null)
                    form.setValue('kelurahan_id', null)
                    form.setValue(`detail_${name}`, optionSelected?.label)
                  }}
                  isDisabled={isDisabled}
                  isLoading={isFetching || isLoading}
                  components={{ Option }}
                />
              </FormControl>
            </div>
            <FormMessage />
          </FormItem>
        )
      }}
    />
  )
}
