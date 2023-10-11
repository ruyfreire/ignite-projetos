import dayjs from 'dayjs'

export function dateToTimestamp(value: string | Date) {
  const date = dayjs(value)

  if (!date.isValid()) return value

  return date.format('YYYY-MM-DD HH:mm:ss')
}
