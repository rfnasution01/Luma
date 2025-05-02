import AlternatifErrorPage from '../alternativeErrorPage'
import ImgPage from '@/assets/images/error.jpg'

export default function ErrorPage() {
  return (
    <AlternatifErrorPage
      judul="Terdapat Masalah dan Kami Akan Memperbaikinya"
      deskripsi="Halaman ini sedang mengalami kendala dan sedang dalam proses perbaikan. Kami mohon maaf atas ketidaknyamanan ini. Silakan coba lagi nanti."
      image={ImgPage}
      kode="404"
      nama="Sentra Web Media"
    />
  )
}
