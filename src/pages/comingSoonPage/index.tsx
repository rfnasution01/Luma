import AlternatifErrorPage from '../alternativeErrorPage'
import ImgPage from '@/assets/images/coming-soon.png'

export default function ComingSoonPage() {
  return (
    <AlternatifErrorPage
      deskripsi="Halaman ini sedang dalam tahap pengembangan. Silakan kembali lagi nanti."
      image={ImgPage}
      judul="Halaman sedang dikembangkan"
      kode="404"
      nama="Sentra Web Media"
    />
  )
}
