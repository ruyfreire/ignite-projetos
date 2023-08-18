import { dayjs } from "@/lib/dayjs"
import { capitalizeString } from "./string"

export function getFormattedDate(dateString: string) {
  if (!dateString)
    return { formattedDate: dateString, utcDate: dateString, date: dateString }

  const objectDate = dayjs(dateString)

  if (!objectDate.isValid()) {
    return { formattedDate: dateString, utcDate: dateString, date: dateString }
  }

  const distanceDate = objectDate.fromNow()
  const formattedDate = capitalizeString(distanceDate)
  const utcDate = capitalizeString(objectDate.format("LLLL"))

  return { formattedDate, utcDate, date: objectDate }
}
