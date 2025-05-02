/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FieldPath,
  FieldValues,
  UseControllerProps,
  UseFormReturn,
} from 'react-hook-form'
import { StylesConfig } from 'react-select'

export type DataSelectType = {
  value: number | string | undefined
  label: string | undefined
}
export interface FormInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  headerLabel?: string
  useFormReturn: UseFormReturn | any | undefined
  formName?: string
  isDisabled?: boolean
}

export type FormInputPropsType<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  headerLabel?: string
  useFormReturn: UseFormReturn
  formName?: string
  isDisabled?: boolean
  className?: string
} & UseControllerProps<TFieldValues, TName>

export const customStyles: StylesConfig = {
  control: (base, state) => {
    return {
      ...base,
      background: state.isDisabled ? '#f2f2f2' : 'white',
      opacity: state.isDisabled ? '0.5' : base.opacity,
      cursor: state.isDisabled ? 'not-allowed' : base.cursor,
      pointerEvents: state.isDisabled ? 'auto' : base.pointerEvents,
    }
  },
}
