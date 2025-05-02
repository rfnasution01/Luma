import { useEffect, useState } from 'react'

export function useGeoLocation() {
  const [data, setData] = useState({ device: '', city: 'Mengambil lokasi...' })

  useEffect(() => {
    const userAgent = navigator.userAgent
    const device = /Android|iPhone|iPad|Mac|Windows/i.exec(userAgent) || [
      'Unknown Device',
    ]

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords

          try {
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
            )
            const data = await res.json()

            // Ambil data lokasi dari beberapa kemungkinan
            const city =
              data.address.city ||
              data.address.town ||
              data.address.village ||
              data.address.county ||
              data.address.state ||
              'Tidak Diketahui'

            setData({ device: device[0], city })
          } catch {
            setData({ device: device[0], city: 'Gagal mendapatkan lokasi' })
          }
        },
        () => setData({ device: device[0], city: 'Lokasi tidak diizinkan' }),
      )
    } else {
      setData({ device: device[0], city: 'Geolocation tidak didukung' })
    }
  }, [])

  return {
    data,
  }
}
