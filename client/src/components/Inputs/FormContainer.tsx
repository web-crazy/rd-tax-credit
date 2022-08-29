/* eslint-disable */
import { yupResolver } from '@hookform/resolvers/yup'
import React, { CSSProperties, FormHTMLAttributes } from 'react'
import { FormProvider, useForm, UseFormReturn } from 'react-hook-form'
import { ObjectSchema } from 'yup'
import { ObjectShape } from 'yup/lib/object'

export type FormContainerProps<T extends ObjectShape = {}> = {
  validation?: ObjectSchema<T>
  defaultValues?: Partial<T>
  onSuccess?: (values: any) => void
  handleSubmit?: (values: any) => void
  formContext?: UseFormReturn<any>
  FormProps?: FormHTMLAttributes<HTMLFormElement>
  children?: any
}

const formStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
}

const FormContainerCore: React.FC<FormContainerProps> = ({
  defaultValues = {},
  onSuccess = () => {},
  validation,
  FormProps,
  children,
}) => {
  const methods = useForm<typeof defaultValues>({
    defaultValues,
    ...(validation ? { resolver: yupResolver(validation) } : {}),
  })
  const { handleSubmit } = methods

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSuccess)}
        noValidate
        style={formStyle}
        {...FormProps}
      >
        {children}
      </form>
    </FormProvider>
  )
}

const FormContainer: React.FC<FormContainerProps> = React.memo((props) => {
  if (!props.formContext && !props.handleSubmit) {
    return <FormContainerCore {...props} />
  }
  if (props.handleSubmit && props.formContext) {
    return (
      <FormProvider {...props.formContext}>
        <form
          noValidate
          {...props.FormProps}
          style={formStyle}
          onSubmit={props.handleSubmit}
        >
          {props.children}
        </form>
      </FormProvider>
    )
  }
  if (props.formContext && props.onSuccess) {
    return (
      <FormProvider {...props.formContext}>
        <form
          onSubmit={props.formContext.handleSubmit(props.onSuccess)}
          style={formStyle}
          noValidate
          {...props.FormProps}
        >
          {props.children}
        </form>
      </FormProvider>
    )
  }

  return <div>Incomplete setup of FormContainer..</div>
})

export default FormContainer
