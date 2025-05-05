import { usePathname } from '@/hooks/usePathname'
import { convertToSlug } from '@/utils/formatText'
import clsx from 'clsx'
import { FileArchive } from 'lucide-react'
import { Outlet, useNavigate } from 'react-router-dom'

export default function SuratPage() {
  const navigate = useNavigate()
  const { secondPathname } = usePathname()

  const listSurat = [
    // 🏠 Surat Pribadi & Keterangan Umum
    'Surat Izin Sakit',
    'Surat Pengantar RT/RW',
    'Surat Keterangan Domisili',
    'Surat Keterangan Tidak Mampu (SKTM)',
    'Surat Keterangan Kehilangan',
    'Surat Pernyataan Belum Menikah',
    'Surat Pernyataan Kesanggupan',
    'Surat Kuasa',
    'Surat Izin Tidak Masuk Sekolah',
    'Surat Izin Tidak Masuk Kerja',

    // 💼 Surat Terkait Pekerjaan
    'Surat Lamaran Kerja',
    'Surat Pengunduran Diri (Resign)',
    'Surat Tugas',
    'Surat Rekomendasi Kerja',
    'Surat Panggilan Kerja',
    'Surat Peringatan (SP)',
    'Surat Keterangan Kerja',

    // 🏢 Surat Administrasi & Legal
    'Surat Keterangan Usaha (SKU)',
    'Surat Keterangan Aktif Sekolah',
    'Surat Keterangan Aktif Kuliah',
    'Surat Perjanjian Sewa Menyewa',
    'Surat Perjanjian Jual Beli',
    'Surat Pernyataan Kepemilikan',
    'Surat Pernyataan Tidak Menerima Bantuan',

    // ✉️ Lain-lain
    'Surat Undangan Resmi',
    'Surat Edaran',
    'Surat Balasan',
    'Surat Penawaran',
    'Surat Permintaan Barang',
    'Surat Pesanan',
  ]

  return (
    <div className="scrollbar flex h-full flex-col gap-32 overflow-auto px-[16rem] phones:px-32">
      <div className="scrollbar flex w-full items-center gap-32 overflow-auto">
        {listSurat?.map((item, idx) => {
          return (
            <div
              onClick={() => {
                navigate(`/surat/${convertToSlug(item)}`)
              }}
              className={clsx(
                'flex items-center gap-12 rounded-xl bg-[#f3f4f6] p-16 text-[#374151] hover:cursor-pointer',
                {
                  'bg-gray-500 text-gray-100':
                    secondPathname === convertToSlug(item),
                  'transition-all duration-300 hover:bg-gray-500 hover:text-gray-100':
                    secondPathname !== convertToSlug(item),
                },
              )}
              key={idx}
            >
              <FileArchive size={16} />
              <p className="text-nowrap">{item}</p>
            </div>
          )
        })}
      </div>
      <Outlet />
    </div>
  )
}
