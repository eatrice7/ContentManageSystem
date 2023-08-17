import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

export function formatUTC(date: string, formatString: string = 'YYYY/MM/DD HH:mm:ss') {
  // 处理UTC时间
  const resultTime = dayjs.utc(date).utcOffset(8).format(formatString)
  return resultTime
}

// 给用户提示时间
export function userGreetings(name?: string) {
  const nowTime: number = dayjs().hour()
  if (nowTime >= 0 && nowTime < 6) return `用户${name}，凌晨了，注意肾哦！`
  else if (nowTime >= 6 && nowTime < 8)
    return `用户${name}，一日之计在于晨，越早预约办理，越早通过！`
  else if (nowTime >= 8 && nowTime < 11) return `上午好用户${name}，祝您上午工作愉快！`
  else if (nowTime >= 11 && nowTime < 13) return `用户${name}，午休时间，您要保持睡眠哦！`
  else if (nowTime >= 13 && nowTime < 17) return `下午好用户${name}，祝您下午工作愉快！`
  else if (nowTime >= 17 && nowTime < 18) return `用户${name}，今天又要加班吗？`
  else return `晚上好用户${name}，还没休息啊，要注意身体哦！`
}
