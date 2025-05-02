import AlternatifErrorPage from '../alternativeErrorPage'
import ImgPage from '@/assets/images/no-internet.png'

export default function NoInternetPage() {
  return (
    <AlternatifErrorPage
      judul="Koneksi Terputus"
      deskripsi="Sepertinya Anda sedang offline. Periksa sambungan internet Anda dan coba kembali beberapa saat lagi."
      image={ImgPage}
      kode="503"
      nama="Sentra Web Media"
    />
  )
}
