import { DialogCustom } from '@/components/feedback/dialogComponents'
import { ListSurat } from '@/components/feedback/selectComponents/selectDummy'
import { useMobile } from '@/hooks/useMobile'
import { usePathname } from '@/hooks/usePathname'
import { convertToSlug } from '@/utils/formatText'
import clsx from 'clsx'
import { Filter } from 'lucide-react'
import { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

export default function SuratPage() {
  const { lastPathname } = usePathname()
  const { isMobile } = useMobile()
  const navigate = useNavigate()
  const { secondPathname } = usePathname()

  const [isShow, setIsShow] = useState<boolean>(false)

  return (
    <div className="scrollbar flex h-full flex-col gap-32 overflow-auto px-[16rem] phones:px-32">
      <div className="scrollbar flex w-full items-center gap-32 overflow-auto">
        <div className="scrollbar flex w-full flex-1 items-center gap-32 overflow-auto">
          {ListSurat?.map((item, idx) => {
            return (
              <div
                onClick={() => {
                  navigate(`/surat/${convertToSlug(item?.nama)}`)
                }}
                className={clsx(
                  'flex items-center gap-8 rounded-xl bg-[#f3f4f6] p-16 text-[#374151] hover:cursor-pointer',
                  {
                    'bg-gray-500 text-gray-100':
                      secondPathname === convertToSlug(item?.nama),
                    'transition-all duration-300 hover:bg-gray-500 hover:text-gray-100':
                      secondPathname !== convertToSlug(item?.nama),
                  },
                )}
                key={idx}
              >
                <p>{item?.icon}</p>
                <p className="text-nowrap">{item?.nama}</p>
              </div>
            )
          })}
        </div>
        <div
          onClick={() => setIsShow(true)}
          className="flex cursor-pointer items-center gap-12 rounded-2xl border border-gray-500 px-16 py-12 text-gray-500 transition-all duration-300 hover:bg-gray-500 hover:text-white"
        >
          <Filter size={16} />
          <p>Filter</p>
        </div>
      </div>
      <div className="scrollbar flex h-full w-full flex-1 overflow-auto">
        <Outlet />
      </div>

      <DialogCustom
        isOpen={isShow}
        setIsOpen={setIsShow}
        isMobile={isMobile}
        headerTitle={
          <p className="border-b pb-16 text-left text-[2.8rem] font-bold">
            Pilih Surat
          </p>
        }
        width="60%"
        textContent={
          <div className="grid w-full grid-cols-3 gap-32 font-sans text-[2rem] phones:grid-cols-1">
            {/* Kategori 1: Surat Pribadi & Sekolah */}
            <div className="col-span-1 flex flex-col gap-24">
              <p className="text-[2.2rem] font-medium">
                Surat Pribadi & Sekolah
              </p>
              <div className="flex flex-col gap-4 leading-[1.3]">
                {[
                  'Surat Izin Sakit Sekolah',
                  'Surat Izin Sakit Kuliah',
                  'Surat Izin Sakit Kerja',
                  'Surat Izin Tidak Masuk Sekolah',
                  'Surat Izin Tidak Masuk Kerja',
                  'Surat Keterangan Tidak Mampu (SKTM)',
                  'Surat Keterangan Kehilangan',
                  'Surat Keterangan Aktif Sekolah',
                  'Surat Keterangan Aktif Kuliah',
                  'Surat Keterangan Tidak Sedang Menerima Beasiswa Dalam Waktu Bersamaan',
                  'Surat Keterangan Berkelakuan Baik dan Tidak Pernah Melanggar Tata Tertib Kampus',
                ]?.map((item, idx) => (
                  <div
                    onClick={() => {
                      setIsShow(false)
                      navigate(`/surat/${convertToSlug(item)}`)
                    }}
                    className={clsx(
                      'cursor-pointer p-12 transition-colors duration-300',
                      {
                        'rounded-lg bg-slate-700 text-slate-100':
                          lastPathname === convertToSlug(item),
                        'hover:bg-slate-50':
                          lastPathname !== convertToSlug(item),
                      },
                    )}
                    key={idx}
                  >
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Kategori 2: Surat Pernyataan & Kesanggupan */}
            <div className="col-span-1 flex flex-col gap-24">
              <p className="text-[2.2rem] font-medium">
                Surat Pernyataan & Kesanggupan
              </p>
              <div className="flex flex-col gap-4 leading-[1.3]">
                {[
                  'Surat Pernyataan Belum Menikah',
                  'Surat Pernyataan Kesanggupan',
                  'Surat Pernyataan Kesanggupan Membayar Utang',
                  'Surat Pernyataan Sanggup Membayar Utang dengan Jaminan',
                  'Surat Pernyataan Sanggup Membayar Angsuran',
                  'Surat Pernyataan Kesanggupan Bayar Ganti Rugi',
                  'Surat Pernyataan Sanggup Membayar Pajak',
                  'Surat Pernyataan Kepemilikan',
                  'Surat Pernyataan Tidak Menerima Bantuan',
                ]?.map((item, idx) => (
                  <div
                    onClick={() => {
                      setIsShow(false)
                      navigate(`/surat/${convertToSlug(item)}`)
                    }}
                    className="cursor-pointer p-12 transition-colors duration-300 hover:bg-slate-50"
                    key={idx}
                  >
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Kategori 3: Surat Keterangan Domisili */}
            <div className="col-span-1 flex flex-col gap-24">
              <p className="text-[2.2rem] font-medium">
                Surat Keterangan Domisili
              </p>
              <div className="flex flex-col gap-4 leading-[1.3]">
                {[
                  'Surat Keterangan Domisili Perorangan',
                  'Surat Keterangan Domisili Pengantar RT',
                  'Surat Keterangan Domisili Perusahaan',
                  'Surat Keterangan Domisili Usaha',
                ]?.map((item, idx) => (
                  <div
                    onClick={() => {
                      setIsShow(false)
                      navigate(`/surat/${convertToSlug(item)}`)
                    }}
                    className="cursor-pointer p-12 transition-colors duration-300 hover:bg-slate-50"
                    key={idx}
                  >
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Kategori 4: Surat Keuangan & Pembayaran */}
            <div className="col-span-1 flex flex-col gap-24">
              <p className="text-[2.2rem] font-medium">
                Surat Keuangan & Pembayaran
              </p>
              <div className="flex flex-col gap-4 leading-[1.3]">
                {[
                  'Surat Pernyataan Kesanggupan Membayar Utang',
                  'Surat Pernyataan Sanggup Membayar Angsuran',
                  'Surat Pernyataan Sanggup Membayar Pajak',
                  'Surat Pernyataan Kesanggupan Bayar Ganti Rugi',
                ]?.map((item, idx) => (
                  <div
                    onClick={() => {
                      setIsShow(false)
                      navigate(`/surat/${convertToSlug(item)}`)
                    }}
                    className="cursor-pointer p-12 transition-colors duration-300 hover:bg-slate-50"
                    key={idx}
                  >
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Kategori 5: Surat Legal & Perjanjian */}
            <div className="col-span-1 flex flex-col gap-24">
              <p className="text-[2.2rem] font-medium">
                Surat Legal & Perjanjian
              </p>
              <div className="flex flex-col gap-4 leading-[1.3]">
                {[
                  'Surat Keterangan Usaha (SKU)',
                  'Surat Perjanjian Sewa Menyewa',
                  'Surat Perjanjian Jual Beli',
                  'Surat Kuasa',
                ]?.map((item, idx) => (
                  <div
                    onClick={() => {
                      setIsShow(false)
                      navigate(`/surat/${convertToSlug(item)}`)
                    }}
                    className="cursor-pointer p-12 transition-colors duration-300 hover:bg-slate-50"
                    key={idx}
                  >
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Kategori 6: Surat Terkait Pekerjaan */}
            <div className="col-span-1 flex flex-col gap-24">
              <p className="text-[2.2rem] font-medium">
                Surat Terkait Pekerjaan
              </p>
              <div className="flex flex-col gap-4 leading-[1.3]">
                {[
                  'Surat Lamaran Kerja',
                  'Surat Pengunduran Diri (Resign)',
                  'Surat Tugas',
                  'Surat Rekomendasi Kerja',
                  'Surat Panggilan Kerja',
                  'Surat Peringatan (SP)',
                  'Surat Keterangan Kerja',
                ]?.map((item, idx) => (
                  <div
                    onClick={() => {
                      setIsShow(false)
                      navigate(`/surat/${convertToSlug(item)}`)
                    }}
                    className="cursor-pointer p-12 transition-colors duration-300 hover:bg-slate-50"
                    key={idx}
                  >
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Kategori 7: Surat Bisnis & Komunikasi Resmi */}
            <div className="col-span-1 flex flex-col gap-24">
              <p className="text-[2.2rem] font-medium">
                Surat Bisnis & Komunikasi Resmi
              </p>
              <div className="flex flex-col gap-4 leading-[1.3]">
                {[
                  'Surat Undangan Resmi',
                  'Surat Edaran',
                  'Surat Balasan',
                  'Surat Penawaran',
                  'Surat Permintaan Barang',
                  'Surat Pesanan',
                ]?.map((item, idx) => (
                  <div
                    onClick={() => {
                      setIsShow(false)
                      navigate(`/surat/${convertToSlug(item)}`)
                    }}
                    className="cursor-pointer p-12 transition-colors duration-300 hover:bg-slate-50"
                    key={idx}
                  >
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        }
      />
    </div>
  )
}
