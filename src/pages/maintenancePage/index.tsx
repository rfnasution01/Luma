import AlternatifErrorPage from '../alternativeErrorPage'
import ImgPage from '@/assets/images/maintenance.png'

export default function MaintenancePage() {
  return (
    <AlternatifErrorPage
      judul="Sedang Dalam Perbaikan"
      deskripsi="Halaman ini sedang dalam proses pemeliharaan untuk peningkatan layanan. Kami akan segera kembali. Terima kasih atas kesabaran Anda."
      image={ImgPage}
      kode="503"
      nama="Sentra Web Media"
    />
  )
}
