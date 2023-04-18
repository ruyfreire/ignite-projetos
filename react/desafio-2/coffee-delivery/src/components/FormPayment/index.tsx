import { FormHTMLAttributes } from 'react'
import { useFormContext } from 'react-hook-form'

import { Form, InputWrapper } from '../FormComponents'
import { FormCheckoutData } from '../../pages/Checkout'

interface FormPaymentProps extends FormHTMLAttributes<HTMLFormElement> {}

export function FormPayment(props: FormPaymentProps) {
  const {
    register,
    formState: { errors, touchedFields },
  } = useFormContext<FormCheckoutData>()

  return (
    <Form {...props}>
      <InputWrapper
        colSpan={4}
        error={!!errors.payment?.number && !!touchedFields.payment?.number}
      >
        <input
          min={1}
          type="number"
          placeholder="Número do cartão *"
          {...register('payment.number', {
            valueAsNumber: true,
          })}
        />
        <span>{errors.payment?.number?.message}</span>
      </InputWrapper>

      <InputWrapper
        colSpan={4}
        error={!!errors.payment?.cpf && !!touchedFields.payment?.cpf}
      >
        <input
          type="number"
          {...register('payment.cpf')}
          placeholder="CPF do titular *"
        />
        <span>{errors.payment?.cpf?.message}</span>
      </InputWrapper>

      <InputWrapper
        colSpan={8}
        error={!!errors.payment?.name && !!touchedFields.payment?.name}
      >
        <input {...register('payment.name')} placeholder="Nome no cartão *" />
        <span>{errors.payment?.name?.message}</span>
      </InputWrapper>

      <InputWrapper
        colSpan={4}
        error={!!errors.payment?.validate && !!touchedFields.payment?.validate}
      >
        <input
          type="date"
          {...register('payment.validate')}
          placeholder="Validade *"
        />
        <span>{errors.payment?.validate?.message}</span>
      </InputWrapper>

      <InputWrapper
        colSpan={4}
        error={!!errors.payment?.cvv && !!touchedFields.payment?.cvv}
      >
        <input
          min={1}
          type="number"
          placeholder="CVV *"
          {...register('payment.cvv')}
        />
        <span>{errors.payment?.cvv?.message}</span>
      </InputWrapper>
    </Form>
  )
}
