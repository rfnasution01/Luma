import { useState, useEffect } from 'react'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import 'dayjs/locale/id'

dayjs.extend(localizedFormat)
dayjs.locale('id')

const RealTimeClock = () => {
  const [time, setTime] = useState(dayjs())

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(dayjs())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="text-placeholder">
      {time.format('dddd, D MMMM YYYY HH:mm')}
    </div>
  )
}

export default RealTimeClock
