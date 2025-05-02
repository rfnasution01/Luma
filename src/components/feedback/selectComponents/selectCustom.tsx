/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/feedback/form'
import { cn } from '@/utils/cn'
import { UseFormReturn } from 'react-hook-form'
import Select from 'react-select'
import { customStyles } from './selectType'
import clsx from 'clsx'
import { Dispatch, SetStateAction } from 'react'
import { ResSelectType } from './data'

interface inputProps {
  name: string
  placeholder: string
  headerLabel?: string
  isDisabled?: boolean
  className?: string
  level1?: boolean
  level2?: boolean
  level3?: boolean
  level4?: boolean
  level5?: boolean
  level6?: boolean
  form?: UseFormReturn | any | undefined
  data: ResSelectType[]
  defaultValues?: ResSelectType
  isRow?: boolean
  isMulti?: boolean
  setTahun?: Dispatch<SetStateAction<string>>
  setBulan?: Dispatch<SetStateAction<string>>
  fx?: (selectedOption: ResSelectType) => void
}

export function SelectCustom({
  name,
  headerLabel,
  placeholder,
  isDisabled,
  form,
  className,
  data,
  level1,
  level2,
  level3,
  level4,
  level5,
  level6,
  defaultValues,
  isRow,
  isMulti,
  fx,
  setTahun,
  setBulan,
}: inputProps) {
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
                      //                       // textTransform: 'uppercase',
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
                  options={data}
                  defaultValue={defaultValues}
                  isMulti={isMulti}
                  value={
                    isMulti
                      ? data?.filter((item) =>
                          field.value?.includes(item.value),
                        )
                      : data?.find((item) => item.value === field.value)
                  }
                  placeholder={placeholder ?? 'Input here'}
                  onChange={(selectedOption: any) => {
                    if (isMulti) {
                      const selectedValues = selectedOption
                        ? selectedOption?.map((option) => option.value)
                        : []
                      const selectedValuesLabel = selectedOption
                        ? selectedOption?.map((option) => option.label)
                        : []
                      field.onChange(selectedValues)
                      form.setValue(name, selectedValues)
                      form.setValue(`detail_${name}`, selectedValuesLabel)
                    } else {
                      const singleValue = selectedOption?.['value'] || ''
                      field.onChange(singleValue)
                      form.setValue(name, singleValue)
                      form.setValue(
                        `detail_${name}`,
                        selectedOption?.['label'] || '',
                      )
                    }
                    if (fx) {
                      fx(selectedOption)
                    }
                    if (setTahun) {
                      setTahun(selectedOption?.value)
                    }
                    if (setBulan) {
                      setBulan(selectedOption?.value)
                    }
                  }}
                  isDisabled={isDisabled}
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
