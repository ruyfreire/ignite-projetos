export const formatCurrency = (value: number) => {
  if (!value || Number.isNaN(Number(value))) {
    return value
  }

  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}
