import { useEffect, useState } from 'react'
import pdfMake from 'pdfmake/build/pdfmake'
import * as pdfFonts from 'pdfmake/build/vfs_fonts'
import DocumentActions from '@/components/common/documentAction'
import FormInput from '@/components/ui/formInput'
import FormTextArea from '@/components/ui/formTextArea'
import PDFPreview from '@/components/common/pdfPreview'
import { useMobile } from '@/hooks/useMobile'
import { generatePdfDefinition } from './generatePDFDefenition'
import dayjs from 'dayjs'
import 'dayjs/locale/id'

pdfMake.vfs = pdfFonts.vfs

export default function SuratKeteranganTidakMampu() {
  const { isMobile } = useMobile()
  const [pdfUrl, setPdfUrl] = useState(null)
  const [debounceTimer, setDebounceTimer] = useState(null)

  const [formData, setFormData] = useState({
    logo: '',

    header1: 'Pemerintah Kabupaten Contoh',
    header2: 'Kecamatan Harapan Jaya',
    header3: 'Desa Suka Damai',
    header4: 'Jl. Cendrawasih No. 1, Kota Fiktif, Kode Pos: 54321',

    title: 'SURAT KETERANGAN TIDAK MAMPU',
    no_surat: 'Nomor: 01/SKD/SD/IV/2025',

    pengantar:
      'Yang bertanda tangan di bawah ini Kepala Desa Suka Damai Kecamatan Harapan Jaya Kabupaten Contoh. Menerangkan dengan sebenar-benarnya bahwa orang tersebut di bawah ini:',

    ul_1: 'Rafi Pratama',
    ul_2: 'Buruh Harian Lepas',
    ul_3: 'Kota Fiktif, 5 Mei 1995',
    ul_4: 'Laki-laki',
    ul_5: '9876543210123456',
    ul_6: '082112345678',
    ul_7: 'Jl. Melati Indah No. 10, RT 04 RW 02, Desa Suka Damai',

    memberitahukan_1:
      'Orang tersebut benar-benar penduduk Desa Suka Damai Kecamatan Harapan Jaya dan tinggal di alamat seperti tersebut di atas. Menurut pengamatan kami, orang tersebut benar-benar berasal dari keluarga tidak mampu. Adapun surat keterangan tidak mampu ini diberikan kepada yang bersangkutan sebagai lampiran untuk mendapatkan keringanan biaya pengobatan di fasilitas kesehatan setempat.',

    memberitahukan_2:
      'Demikian surat keterangan tidak mampu ini dibuat dengan sebenar-benarnya untuk dapat dipergunakan sebagaimana mestinya.',

    pemohon: 'Pemohon',
    mengetahui: 'Mengetahui',
    alamat_tanggal: `Kota Fiktif, ${dayjs().locale('id').format('DD MMMM YYYY')}`,

    jabatan_kades: 'Kepala Desa Suka Damai',
    nama_kades: 'Syamil Wahyudi',
    NIP: '9999999999999',
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  useEffect(() => {
    if (debounceTimer) clearTimeout(debounceTimer)
    const newTimer = setTimeout(() => {
      const pdfDoc = pdfMake.createPdf(generatePdfDefinition(formData))
      pdfDoc.getBlob((blob) => {
        const url = URL.createObjectURL(blob)
        setPdfUrl((prev) => {
          if (prev) URL.revokeObjectURL(prev)
          return url
        })
      })
    }, 1000)
    setDebounceTimer(newTimer)
    return () => clearTimeout(newTimer)
  }, [formData])

  const handleDownload = () => {
    pdfMake.createPdf(generatePdfDefinition(formData)).download('sktm.pdf')
  }

  const handlePrint = () => {
    pdfMake.createPdf(generatePdfDefinition(formData)).print()
  }

  const handleOpen = () => {
    pdfMake.createPdf(generatePdfDefinition(formData)).open()
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onloadend = () => {
      setFormData((prev) => ({
        ...prev,
        logo: reader.result as string,
      }))
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="scrollbar flex h-full w-full gap-32 overflow-auto phones:h-auto phones:flex-col phones:overflow-visible">
      {/* --- Form Untuk Mengubah Data --- */}
      <div className="scrollbar flex h-full w-1/2 flex-col gap-32 overflow-auto phones:h-auto phones:w-full phones:overflow-visible">
        <p className="text-[2.8rem] font-bold">Surat Keterangan Tidak Mampu</p>
        <div className="scrollbar flex h-full flex-col gap-24 overflow-auto rounded-2x border bg-[#fefefe] p-[2.4rem] shadow-md phones:h-auto phones:overflow-visible">
          <div className="scrollbar flex min-h-[120rem] w-full flex-col gap-16 overflow-auto">
            {/* --- Kop Surat --- */}
            <div className="flex w-full gap-32 border-b border-black pb-12">
              <div className="relative flex w-[20rem] flex-col items-start gap-12">
                <label className="text-sm mb-2 block font-medium text-gray-700">
                  Unggah Logo
                </label>

                {!formData.logo ? (
                  // Input Upload jika belum ada logo
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="mt-2"
                  />
                ) : (
                  // Preview Gambar jika sudah ada logo
                  <div className="relative">
                    <img
                      src={formData.logo}
                      alt="Logo Preview"
                      className="rounded h-[12rem] object-contain"
                    />

                    {/* Tombol Ganti */}
                    <button
                      type="button"
                      onClick={() =>
                        document.getElementById('logo-upload').click()
                      }
                      className="rounded absolute right-0 top-0 border bg-white px-2 py-1 shadow"
                    >
                      Ganti
                    </button>

                    {/* Hidden file input for "Ganti" button */}
                    <input
                      id="logo-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </div>
                )}
              </div>
              <div className="flex flex-1 flex-col gap-4">
                <FormInput
                  name="header1"
                  value={formData.header1}
                  onChange={handleChange}
                  placeholder="Pemerintah Kabupaten Contoh"
                  className="text-center text-[2.8rem] font-bold"
                />
                <FormInput
                  name="header2"
                  value={formData.header2}
                  onChange={handleChange}
                  placeholder="Kecamatan Harapan Jaya"
                  className="text-center text-[2.4rem]"
                />
                <FormInput
                  name="header3"
                  value={formData.header3}
                  onChange={handleChange}
                  placeholder="Desa Suka Damai"
                  className="text-center text-[2.4rem]"
                />
                <FormInput
                  name="header4"
                  value={formData.header4}
                  onChange={handleChange}
                  placeholder="Jl. Cendrawasih No. 1, Kota Fiktif, Kode Pos: 54321"
                  className="text-center"
                />
              </div>
            </div>

            <div className="mt-[4rem] flex flex-col items-center justify-center">
              <FormInput
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="SURAT KETERANGAN TIDAK MAMPU"
                className="w-full text-center text-[2.4rem] font-bold"
              />
              <FormInput
                name="no_surat"
                value={formData.no_surat}
                onChange={handleChange}
                placeholder="No Surat: RT/RW/No/XX/YYYY"
                className="w-full text-center"
              />
            </div>

            <div className="mt-[4rem] flex flex-col gap-4">
              <FormTextArea
                name="pengantar"
                value={formData.pengantar}
                onChange={handleChange}
                rows={isMobile ? 3 : 2}
                placeholder="Yang bertanda tangan di bawah ini Kepala Desa Suka Damai Kecamatan Harapan Jaya Kabupaten Contoh. Menerangkan dengan sebenar-benarnya bahwa orang tersebut di bawah ini:"
              />
            </div>

            <table className="w-full table-auto">
              <tbody>
                <tr>
                  <td className="w-[20%] pr-4 align-top phones:w-[40%]">
                    Nama Lengkap
                  </td>
                  <td>
                    :{' '}
                    <FormInput
                      name="ul_1"
                      value={formData.ul_1}
                      onChange={handleChange}
                      placeholder="Rafi Pratama"
                      className="w-[80%] phones:w-[60%]"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="w-[20%] pr-4 align-top phones:w-[40%]">
                    Pekerjaan
                  </td>
                  <td>
                    :{' '}
                    <FormInput
                      name="ul_2"
                      value={formData.ul_2}
                      onChange={handleChange}
                      placeholder="Buruh Harian Lepas"
                      className="w-[80%] phones:w-[60%]"
                    />
                  </td>
                </tr>

                <tr>
                  <td className="w-[20%] pr-4 align-top phones:w-[40%]">
                    Tempat/Tgl Lahir
                  </td>
                  <td>
                    :{' '}
                    <FormInput
                      name="ul_3"
                      className="w-[80%] phones:w-[60%]"
                      value={formData.ul_3}
                      onChange={handleChange}
                      placeholder="Kota Fiktif, 5 Mei 1995"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="w-[20%] pr-4 align-top phones:w-[40%]">
                    Jenis Kelamin
                  </td>
                  <td>
                    :{' '}
                    <FormInput
                      name="ul_4"
                      value={formData.ul_4}
                      onChange={handleChange}
                      placeholder="Laki-laki"
                      className="w-[80%] phones:w-[60%]"
                    />
                  </td>
                </tr>

                <tr>
                  <td className="w-[20%] pr-4 align-top phones:w-[40%]">
                    No. NIK
                  </td>
                  <td>
                    :{' '}
                    <FormInput
                      name="ul_5"
                      value={formData.ul_5}
                      onChange={handleChange}
                      placeholder="9876543210123456"
                      className="w-[80%] phones:w-[60%]"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="w-[20%] pr-4 align-top phones:w-[40%]">
                    Telepon
                  </td>
                  <td>
                    :{' '}
                    <FormInput
                      name="ul_6"
                      value={formData.ul_6}
                      onChange={handleChange}
                      placeholder="082112345678"
                      className="w-[80%] phones:w-[60%]"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="w-[20%] pr-4 align-top phones:w-[40%]">
                    Alamat
                  </td>
                  <td>
                    :{' '}
                    <FormInput
                      name="ul_7"
                      value={formData.ul_7 || ''}
                      onChange={handleChange}
                      placeholder="Jl. Melati Indah No. 10, RT 04 RW 02, Desa Suka Damai"
                      className="w-[80%] phones:w-[60%]"
                    />
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="mt-[4rem] flex flex-col gap-24">
              <FormTextArea
                name="memberitahukan_1"
                value={formData.memberitahukan_1}
                onChange={handleChange}
                rows={isMobile ? 8 : 4}
                placeholder="Orang tersebut benar-benar penduduk Desa Suka Damai Kecamatan Harapan Jaya dan tinggal di alamat seperti tersebut di atas. Menurut pengamatan kami, orang tersebut benar-benar berasal dari keluarga tidak mampu. Adapun surat keterangan tidak mampu ini diberikan kepada yang bersangkutan sebagai lampiran untuk mendapatkan keringanan biaya pengobatan di fasilitas kesehatan setempat."
              />
              <FormTextArea
                name="memberitahukan_2"
                value={formData.memberitahukan_2}
                onChange={handleChange}
                rows={isMobile ? 3 : 2}
                placeholder="Demikian surat keterangan tidak mampu ini dibuat dengan sebenar-benarnya untuk dapat dipergunakan sebagaimana mestinya."
              />
            </div>

            <div className="mt-[4rem] flex items-start justify-between gap-32">
              <div className="flex w-1/3 flex-col justify-center gap-80 phones:w-2/5">
                <div className="flex flex-col gap-12">
                  <p className="text-white">hidden</p>
                  <p className="text-white">hidden</p>
                  <FormInput
                    name="pemohon"
                    value={formData.pemohon}
                    onChange={handleChange}
                    placeholder="Pemohon"
                    className="text-center"
                  />
                </div>
              </div>
              <div className="flex w-1/3 flex-col justify-center gap-80 phones:w-2/5">
                <div className="flex flex-col justify-center gap-80">
                  <div className="flex flex-col gap-12">
                    <FormInput
                      name="mengetahui"
                      value={formData.mengetahui}
                      onChange={handleChange}
                      placeholder="Mengetahui"
                    />
                    <FormInput
                      name="alamat_tanggal"
                      value={formData.alamat_tanggal}
                      onChange={handleChange}
                      placeholder="Kota Fiktif, 14 Mei 2025"
                    />
                    <FormInput
                      name="jabatan_kades"
                      value={formData.jabatan_kades}
                      onChange={handleChange}
                      placeholder="Kepala Desa Suka Damai"
                    />
                  </div>
                  <div className="flex flex-col gap-12">
                    <FormInput
                      name="nama_kades"
                      value={formData.nama_kades}
                      onChange={handleChange}
                      placeholder="Syamil Wahyudi"
                    />
                    <FormInput
                      name="NIP"
                      value={formData.NIP}
                      onChange={handleChange}
                      placeholder="9999999999999"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- Preview PDF --- */}
      <div className="scrollbar flex h-full w-1/2 flex-col gap-16 overflow-auto phones:h-auto phones:w-full phones:overflow-visible">
        <div className="flex items-center justify-between gap-32 phones:flex-col phones:items-start phones:justify-start">
          <p className="text-[2.8rem] font-medium">Preview Dokumen</p>
          <DocumentActions
            onOpen={handleOpen}
            onPrint={handlePrint}
            onDownload={handleDownload}
          />
        </div>

        <PDFPreview pdfUrl={pdfUrl} />
      </div>
    </div>
  )
}
