import dayjsOriginal from "dayjs"
import "dayjs/locale/pt-br"
import localizedFormat from "dayjs/plugin/localizedFormat"
import relativeTime from "dayjs/plugin/relativeTime"

dayjsOriginal.extend(relativeTime)
dayjsOriginal.extend(localizedFormat)
dayjsOriginal.locale("pt-br")

export { dayjsOriginal as dayjs }
