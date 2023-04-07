export const formatCurrency = (value: number, showPrefix?: boolean) => {
  const options: Intl.NumberFormatOptions = {
    currency: 'BRL',
    minimumFractionDigits: 2,
  }

  if (showPrefix) options.style = 'currency'

  return Intl.NumberFormat('pt-BR', options).format(value)
}
