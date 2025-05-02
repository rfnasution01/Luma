import ImgNotFound from '@/assets/images/not-found.jpg'

export default function AlternatifErrorPage({
  deskripsi = ' Maaf, halaman yang Anda cari tidak tersedia atau mungkin telah dipindahkan.',
  image = ImgNotFound,
  judul = 'Halaman Tidak Ditemukan',
  kode = '404',
  nama = 'Sentra Web Media',
}: {
  image?: string
  nama?: string
  judul?: string
  kode?: string
  deskripsi?: string
}) {
  return (
    <div className="scrollbar flex w-full justify-center overflow-auto py-[16rem] phones:py-32">
      <div className="flex w-2/5 items-center justify-center gap-64 phones:w-11/12 phones:flex-col-reverse phones:gap-32">
        <div className="text-placeholder flex flex-1 flex-col gap-16">
          <p className="font-montserrat text-[4.2rem] font-bold">{nama}</p>
          <p>
            <span className="font-bold">{kode}</span> - {judul}
          </p>
          <p>{deskripsi}</p>
        </div>

        <img
          src={image}
          alt="Image Not Found"
          loading="eager"
          className="w-[40rem]"
        />
      </div>
    </div>
  )
}
