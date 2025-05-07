import { ListSurat } from '@/components/feedback/selectComponents/selectDummy'
import { Searching } from '@/components/ui/searching'
import { convertToSlug } from '@/utils/formatText'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SuratHomePage() {
  const data = ListSurat
  const [search, setSearch] = useState<string>('')
  const [filteredList, setFilteredList] = useState(data)
  const navigate = useNavigate()

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!search) {
        setFilteredList(data)
      } else {
        const keyword = search.toLowerCase()
        const filtered = data.filter((item) =>
          item.nama.toLowerCase().includes(keyword),
        )
        setFilteredList(filtered)
      }
    }, 300) // debounce 300ms

    return () => clearTimeout(timeout)
  }, [search, data])

  return (
    <div className="scrollbar flex h-full w-full flex-col gap-32 overflow-auto phones:h-auto phones:flex-col phones:overflow-visible">
      <div className="flex flex-col gap-8 text-center">
        <h1 className="font-serif text-[3.6rem] font-bold text-gray-800">
          Daftar Surat
        </h1>
        <p className="font-light text-gray-600">
          Pilih jenis surat yang ingin kamu buat dengan cepat dan otomatis.
        </p>
      </div>

      <div className="flex w-full justify-center">
        <Searching
          search={search}
          setSearch={setSearch}
          className="w-1/3 phones:w-full"
          innerClassName="py-24"
          rounded="rounded-2x"
        />
      </div>

      <div className="grid grid-cols-4 gap-32 pb-32 phones:grid-cols-1">
        {filteredList?.map((item, idx) => (
          <div className="col-span-1" key={idx}>
            <div
              onClick={() => {
                navigate(`/surat/${convertToSlug(item?.nama)}`)
              }}
              className="group flex h-full cursor-pointer flex-col gap-24 rounded-2x border p-24 shadow-sm transition-all duration-300 hover:bg-[#f3f4f6] hover:shadow-md"
            >
              <div className="flex h-[6rem] w-[6rem] items-center justify-center rounded-full bg-slate-100 group-hover:bg-slate-200">
                <p className="text-[2.8rem]">{item?.icon}</p>
              </div>
              <div className="flex flex-col gap-12">
                <p className="font-poppins text-[2.4rem] font-semibold">
                  {item?.nama}
                </p>
                <p className="font-montserrat leading-[1.3] text-slate-500">
                  {item?.deskripsi}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
