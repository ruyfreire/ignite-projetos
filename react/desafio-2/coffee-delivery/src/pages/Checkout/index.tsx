import clsx from 'clsx'
import {
  Bank,
  CaretUp,
  CreditCard,
  CurrencyDollar,
  MapPinLine,
  Money,
} from 'phosphor-react'
import { FocusEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z as zod } from 'zod'
import { addYears, format } from 'date-fns'
import { Button } from '../../components/Button'
import { theme } from '../../styles/themes/default'
import {
  BoxAddress,
  BoxPayment,
  BoxResumeCart,
  BoxTextTitle,
  ButtonShowItens,
  Container,
  SubTitle,
  FooterCart,
} from './styles'
import { routesList } from '../../routes'
import { useCartContext } from '../../contexts/CartContext'
import { CardCheckout } from '../../components/CardCheckout'
import { formatCurrency } from '../../utils/currency'
import { Form, InputWrapper } from '../../components/FormComponents'
import { FormPayment } from '../../components/FormPayment'
import { PaymentTypes } from '../../reducers/cart'

const requiredMessage = 'Campo obrigatório'
const invalidNumberMessage = 'Campo deve ser um número'
const intNumberMessage = 'Campo deve ser um número inteiro'
const positiveMessage = 'Número deve ser positivo'
const cepLengthMessage = 'CEP deve ter 8 dígitos'
const startStringMessage = 'Deve começar com letra'
const maxDate = addYears(new Date(), 20)

const formAddressValidationSchema = zod.object({
  zipcode: zod
    .string()
    .nonempty(requiredMessage)
    .regex(/^[0-9]+$/, 'Deve ter apenas números')
    .length(8, cepLengthMessage),
  street: zod
    .string()
    .nonempty(requiredMessage)
    .regex(/^[a-zA-Z]/, startStringMessage),
  number: zod
    .number({
      required_error: requiredMessage,
      invalid_type_error: invalidNumberMessage,
    })
    .int(intNumberMessage)
    .positive(positiveMessage),
  complement: zod.string().optional(),
  neighborhood: zod
    .string()
    .nonempty(requiredMessage)
    .regex(/^[a-zA-Z]/, startStringMessage),
  city: zod
    .string()
    .nonempty(requiredMessage)
    .regex(/^[a-zA-Z]/, startStringMessage),
  uf: zod
    .string()
    .nonempty(requiredMessage)
    .regex(/^[a-zA-Z]+$/, 'Deve ter apenas letras')
    .length(2, 'Deve ter 2 caracteres'),
})

const formPaymentValidationSchema = zod.object({
  number: zod
    .number({
      required_error: requiredMessage,
      invalid_type_error: invalidNumberMessage,
    })
    .int(intNumberMessage)
    .positive(positiveMessage)
    .refine((number) => String(number).length === 16, {
      message: 'Número deve ter 16 dígitos',
    }),
  validate: zod.string().pipe(
    zod.coerce
      .date({
        errorMap: (error, ctx) => {
          if (error.code === zod.ZodIssueCode.invalid_date) {
            return { message: 'Campo deve ser uma data válida' }
          }

          return { message: ctx.defaultError }
        },
      })
      .min(new Date(), { message: 'Data deve ser maior que a atual' })
      .max(maxDate, {
        message: `Data deve ser menor que ${format(maxDate, 'dd/MM/yyyy')}`,
      }),
  ),
  cvv: zod
    .string()
    .nonempty(requiredMessage)
    .regex(/^[0-9]+$/, 'Deve ter apenas números')
    .length(3, 'Deve ter 3 dígitos'),
  name: zod
    .string()
    .nonempty(requiredMessage)
    .regex(/^[a-zA-Z]/, startStringMessage),
  cpf: zod
    .string()
    .nonempty(requiredMessage)
    .regex(/^[0-9]+$/, 'Deve ter apenas números')
    .length(11, 'Deve ter 11 dígitos'),
})

const formCheckoutValidationSchema = zod.object({
  address: formAddressValidationSchema,
  payment: formPaymentValidationSchema.optional(),
})

export type FormCheckoutData = zod.infer<typeof formCheckoutValidationSchema>

export function Checkout() {
  const navigate = useNavigate()
  const { coffees, address, payment, addAddress, addPayment } = useCartContext()

  const [showCart, setShowCart] = useState(false)
  const [paymentType, setPaymentType] = useState(payment?.type)

  const formCheckout = useForm<FormCheckoutData>({
    mode: 'onBlur',
    resolver: zodResolver(formCheckoutValidationSchema),
    defaultValues: {
      address,
      payment: payment?.bank_card,
    },
  })

  const {
    register,
    unregister,
    getValues,
    trigger,
    setValue,
    formState: { errors, touchedFields },
  } = formCheckout

  const handleCompletePurchase = async () => {
    const isValid = await trigger(undefined, { shouldFocus: true })
    if (!isValid) {
      alert('Preencha todos os campos obrigatórios')
      return
    }

    if (!paymentType) {
      alert('Selecione um método de pagamento')
      return
    }

    navigate(routesList.checkoutSuccess)
  }

  const handleSearchZipCode = async (event: FocusEvent<HTMLInputElement>) => {
    const zipcode = event.target.value

    if (zipcode.length !== 8 || /\D/.test(zipcode)) {
      return
    }

    try {
      const response = await fetch(`https://viacep.com.br/ws/${zipcode}/json/`)
      const data = await response.json()

      setValue('address.street', data.logradouro, { shouldValidate: true })
      setValue('address.complement', data.complemento, { shouldValidate: true })
      setValue('address.neighborhood', data.bairro, { shouldValidate: true })
      setValue('address.city', data.localidade, { shouldValidate: true })
      setValue('address.uf', data.uf, { shouldValidate: true })
    } catch (error) {
      console.error(error)
    }
  }

  const handleSaveData = async () => {
    const isValid = await trigger()
    if (isValid) {
      const data = getValues()
      addAddress(data.address)

      if (paymentType) {
        addPayment({
          type: paymentType,
          bank_card: data.payment,
        })
      }
    }
  }

  const handleSetPayment = (type: PaymentTypes) => {
    setPaymentType(type)

    if (type === PaymentTypes.money) {
      addPayment({
        type,
      })

      unregister([
        'payment.number',
        'payment.validate',
        'payment.cvv',
        'payment.name',
        'payment.cpf',
      ])
    } else {
      const paymentValue = getValues().payment
      addPayment({
        bank_card: paymentValue,
        type,
      })
    }
  }

  const totalItens = coffees.reduce((total, item) => item.quantity + total, 0)
  const totalValue = coffees.reduce(
    (total, item) => item.total_value + total,
    0,
  )

  return (
    <main className="global-container">
      <Container className={clsx({ 'show-cart': showCart })}>
        <div className="left-container">
          <SubTitle>Complete seu pedido</SubTitle>

          <BoxAddress>
            <BoxTextTitle>
              <MapPinLine size={22} color={theme.palette.yellow.dark} />
              <div>
                <h6>Endereço de entrega</h6>
                <p>Informe o endereço onde deseja receber seu pedido</p>
              </div>
            </BoxTextTitle>

            <Form onBlur={handleSaveData}>
              <InputWrapper
                colSpan={3}
                error={
                  !!errors.address?.zipcode && !!touchedFields.address?.zipcode
                }
              >
                <input
                  min={1}
                  type="number"
                  placeholder="CEP *"
                  {...register('address.zipcode', {
                    onBlur: handleSearchZipCode,
                  })}
                />
                <span>{errors.address?.zipcode?.message}</span>
              </InputWrapper>

              <InputWrapper
                error={
                  !!errors.address?.street && !!touchedFields.address?.street
                }
              >
                <input
                  {...register('address.street', { required: true })}
                  placeholder="Rua *"
                />
                <span>{errors.address?.street?.message}</span>
              </InputWrapper>

              <InputWrapper
                colSpan={3}
                error={
                  !!errors.address?.number && !!touchedFields.address?.number
                }
              >
                <input
                  min={1}
                  type="number"
                  placeholder="Número *"
                  {...register('address.number', {
                    valueAsNumber: true,
                  })}
                />
                <span>{errors.address?.number?.message}</span>
              </InputWrapper>

              <InputWrapper
                colSpan={5}
                className="complement"
                error={
                  !!errors.address?.complement &&
                  !!touchedFields.address?.complement
                }
              >
                <input
                  {...register('address.complement')}
                  placeholder="Complemento"
                />
                <span>{errors.address?.complement?.message}</span>
              </InputWrapper>

              <InputWrapper
                colSpan={3}
                error={
                  !!errors.address?.neighborhood &&
                  !!touchedFields.address?.neighborhood
                }
              >
                <input
                  {...register('address.neighborhood')}
                  placeholder="Bairro *"
                />
                <span>{errors.address?.neighborhood?.message}</span>
              </InputWrapper>

              <InputWrapper
                colSpan={3}
                error={!!errors.address?.city && !!touchedFields.address?.city}
              >
                <input {...register('address.city')} placeholder="Cidade *" />
                <span>{errors.address?.city?.message}</span>
              </InputWrapper>

              <InputWrapper
                colSpan={2}
                error={!!errors.address?.uf && !!touchedFields.address?.uf}
              >
                <input
                  {...register('address.uf', {
                    setValueAs: (value) => value.toUpperCase(),
                  })}
                  placeholder="UF *"
                />
                <span>{errors.address?.uf?.message}</span>
              </InputWrapper>
            </Form>
          </BoxAddress>

          <BoxPayment>
            <BoxTextTitle>
              <CurrencyDollar size={22} color={theme.palette.purple.base} />
              <div>
                <h6>Pagamento</h6>
                <p>
                  O pagamento é feito na entrega. Escolha a forma que deseja
                  pagar
                </p>
              </div>
            </BoxTextTitle>

            <div className="payment-options">
              <Button
                icon={<CreditCard size={16} />}
                onClick={() => handleSetPayment(PaymentTypes.credit_card)}
                selected={paymentType === PaymentTypes.credit_card}
              >
                {PaymentTypes.credit_card}
              </Button>

              <Button
                icon={<Bank size={16} />}
                onClick={() => handleSetPayment(PaymentTypes.debit_card)}
                selected={paymentType === PaymentTypes.debit_card}
              >
                {PaymentTypes.debit_card}
              </Button>

              <Button
                icon={<Money size={16} />}
                onClick={() => handleSetPayment(PaymentTypes.money)}
                selected={paymentType === PaymentTypes.money}
              >
                {PaymentTypes.money}
              </Button>
            </div>

            {(paymentType === PaymentTypes.credit_card ||
              paymentType === PaymentTypes.debit_card) && (
              <FormProvider {...formCheckout}>
                <FormPayment onBlur={handleSaveData} className="form-payment" />
              </FormProvider>
            )}
          </BoxPayment>
        </div>

        <div className="right-container">
          <SubTitle>Cafés selecionados</SubTitle>

          <BoxResumeCart className={clsx({ 'show-cart': showCart })}>
            <div className="itens-cart">
              {coffees.map((item) => (
                <CardCheckout key={item.id} itemCart={item} />
              ))}
            </div>

            <ButtonShowItens onClick={() => setShowCart((state) => !state)}>
              <CaretUp size={12} weight="bold" />
              mostrar itens
            </ButtonShowItens>

            <FooterCart>
              <div className="cart-line">
                <p>Total de itens</p>
                <p>{totalItens}</p>
              </div>

              <div className="cart-line">
                <p>Entrega</p>
                <p>{formatCurrency(totalValue ? 3.5 : 0, true)}</p>
              </div>

              <div className="cart-total">
                <p>Total</p>
                <p>{formatCurrency(totalValue, true)}</p>
              </div>

              <button
                type="button"
                onClick={handleCompletePurchase}
                disabled={totalValue === 0}
              >
                Confirmar pedido
              </button>
            </FooterCart>
          </BoxResumeCart>
        </div>

        <div className="backdrop" onClick={() => setShowCart(false)} />
      </Container>
    </main>
  )
}
