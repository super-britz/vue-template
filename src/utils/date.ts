import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'

dayjs.extend(relativeTime)
dayjs.locale('zh-cn')

type DateInput = string | number | Date | dayjs.Dayjs

/**
 * 格式化时间，默认 YYYY-MM-DD HH:mm:ss
 */
export function formatDate(date: DateInput, format = 'YYYY-MM-DD HH:mm:ss'): string {
  return dayjs(date).format(format)
}

/**
 * 格式化为日期，YYYY-MM-DD
 */
export function formatDay(date: DateInput): string {
  return dayjs(date).format('YYYY-MM-DD')
}
