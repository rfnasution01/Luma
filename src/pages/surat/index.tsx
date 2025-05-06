import { DialogCustom } from '@/components/feedback/dialogComponents'
import { ListSurat } from '@/components/feedback/selectComponents/selectDummy'
import { useMobile } from '@/hooks/useMobile'
import { usePathname } from '@/hooks/usePathname'
import { convertToSlug } from '@/utils/formatText'
import clsx from 'clsx'
import { FileArchive, Filter } from 'lucide-react'
import { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

export default function SuratPage() {
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
            <div className="col-span-1 flex flex-col gap-24">
              <p className="text-[2.2rem] font-medium">
                Surat Pribadi & Keterangan Umum
              </p>
              <div className="flex flex-col gap-4">
                {[
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
            <div className="col-span-1 flex flex-col gap-24">
              <p className="text-[2.2rem] font-medium">
                Surat Terkait Pekerjaan
              </p>
              <div className="flex flex-col gap-4">
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
            <div className="col-span-1 flex flex-col gap-24">
              <p className="text-[2.2rem] font-medium">
                Surat Administrasi & Legal
              </p>
              <div className="flex flex-col gap-4">
                {[
                  'Surat Keterangan Usaha (SKU)',
                  'Surat Keterangan Aktif Sekolah',
                  'Surat Keterangan Aktif Kuliah',
                  'Surat Perjanjian Sewa Menyewa',
                  'Surat Perjanjian Jual Beli',
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
            <div className="col-span-1 flex flex-col gap-24">
              <p className="text-[2.2rem] font-medium">Lain-lain</p>
              <div className="flex flex-col gap-4">
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
