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

export default function SuratKeteranganDomisiliUsaha() {
  const { isMobile } = useMobile()
  const [pdfUrl, setPdfUrl] = useState(null)
  const [debounceTimer, setDebounceTimer] = useState(null)

  const [formData, setFormData] = useState({
    logo: '',
    header1: 'Pemerintah Kota Medan',
    header2: 'Kecamatan Sayur Bayam',
    header3: 'Kelurahan Suka Maju',
    header4: 'Jl. Sukamaju Raya No. 1, Bandung Kode Pos: 12345',

    title: 'SURAT KETERANGAN DOMISILI USAHA',
    no_surat: 'Nomor: RT/RW/No/XX/YYYY',

    pengantar:
      'Yang bertanda tangan di bawah ini Lurah Suka Maju Kecamatan Sayur Bayam Kota Medan, menerangkan dengan sebenarnya bahwa',
    nama_usaha: 'CV. ANGIN RIBUT',

    ul_1: 'Syamil Wahyudi',
    ul_2: 'Jl. Tumis Kangkung, No. 9 Jakarta Utara',
    ul_3: 'Financial Technology',
    ul_4: 'Suka Maju, Medan',

    memberitahukan_1:
      'Adalah benar berdomisili di Suka Maju Medan dan berada di Wilayah Kerja Kelurahan Suka Maju Kecamatan Sayur Bayam Kota Medan. Surat Keterangan ini berlaku 6 ( Enam ) Bulan sejak Surat Keterangan Domisili ini dikeluarkan',

    memberitahukan_2:
      'Demikian Surat Keterangan ini kami buat, untuk dipergunakan sebagaimana mestinya',

    alamat_tanggal: `Jakarta, ${dayjs().locale('id').format('DD MMMM YYYY')}`,

    jabatan_penandatangan: 'Lurah',
    nama_penandatangan: 'Budi Santoso',
    nip: '1234567890',
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
    pdfMake
      .createPdf(generatePdfDefinition(formData))
      .download('surat-keterangan-domisili.pdf')
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
        <p className="text-[2.8rem] font-bold">
          Surat Keterangan Domisili Usaha
        </p>
        <div className="scrollbar flex h-full flex-col gap-24 overflow-auto rounded-2x border bg-[#fefefe] p-[2.4rem] shadow-md phones:h-auto phones:overflow-visible">
          <div className="scrollbar-new flex min-h-[120rem] w-full flex-col gap-16 overflow-auto">
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
                  placeholder="Pemerintah Kota Medan"
                  className="text-center text-[2.8rem] font-bold"
                />
                <FormInput
                  name="header2"
                  value={formData.header2}
                  onChange={handleChange}
                  placeholder="Kecamatan Sayur Bayam"
                  className="text-center text-[2.4rem]"
                />
                <FormInput
                  name="header3"
                  value={formData.header3}
                  onChange={handleChange}
                  placeholder="Kelurahan Suka Maju"
                  className="text-center text-[2.4rem]"
                />
                <FormInput
                  name="header4"
                  value={formData.header4}
                  onChange={handleChange}
                  placeholder="Jl. Sukamaju Raya No. 1, Bandung Kode Pos: 12345"
                  className="text-center"
                />
              </div>
            </div>

            <div className="mt-[4rem] flex flex-col items-center justify-center">
              <FormInput
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="SURAT KETERANGAN DOMISILI USAHA"
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
                placeholder="Yang bertanda tangan di bawah ini Lurah Suka Maju Kecamatan Sayur Bayam Kota Medan, menerangkan dengan sebenarnya bahwa"
              />
            </div>

            <table className="w-full table-auto">
              <tbody>
                <tr>
                  <td className="w-[20%] pr-4 align-top phones:w-[40%]">
                    Nama Pimpinan
                  </td>
                  <td>
                    :{' '}
                    <FormInput
                      name="ul_1"
                      value={formData.ul_1}
                      onChange={handleChange}
                      placeholder="Syamil Wahyudi"
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
                      name="ul_2"
                      className="w-[80%] phones:w-[60%]"
                      value={formData.ul_2}
                      onChange={handleChange}
                      placeholder="Jl. Tumis Kangkung, No. 9 Jakarta Utara"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="w-[20%] pr-4 align-top phones:w-[40%]">
                    Bergerak di Bidang
                  </td>
                  <td>
                    :{' '}
                    <FormInput
                      name="ul_3"
                      value={formData.ul_3}
                      onChange={handleChange}
                      placeholder="Financial Technology"
                      className="w-[80%] phones:w-[60%]"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="w-[20%] pr-4 align-top phones:w-[40%]">
                    Alamat Usaha
                  </td>
                  <td>
                    :{' '}
                    <FormInput
                      name="ul_4"
                      value={formData.ul_4}
                      onChange={handleChange}
                      placeholder="Suka Maju, Medan"
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
                rows={isMobile ? 5 : 3}
                placeholder="Adalah benar berdomisili di Suka Maju Medan dan berada di Wilayah Kerja Kelurahan Suka Maju Kecamatan Sayur Bayam Kota Medan. Surat Keterangan ini berlaku 6 ( Enam ) Bulan sejak Surat Keterangan Domisili ini dikeluarkan."
              />
              <FormTextArea
                name="memberitahukan_2"
                value={formData.memberitahukan_2}
                onChange={handleChange}
                rows={isMobile ? 2 : 1}
                placeholder="Demikian Surat Keterangan ini kami buat, untuk dipergunakan sebagaimana mestinya"
              />
            </div>

            <div className="mt-[4rem] flex flex-col items-end justify-center gap-80">
              <div className="flex flex-col gap-12">
                <FormInput
                  name="alamat_tanggal"
                  value={formData.alamat_tanggal}
                  onChange={handleChange}
                  placeholder={`Jakarta, ${dayjs().locale('id').format('DD MMMM YYYY')}`}
                  className="text-center"
                />
                <FormInput
                  name="jabatan_penandatangan"
                  value={formData.jabatan_penandatangan}
                  onChange={handleChange}
                  placeholder="Lurah"
                  className="text-center"
                />
              </div>
              <div className="flex flex-col gap-12">
                <FormInput
                  name="nama_penandatangan"
                  value={formData.nama_penandatangan}
                  onChange={handleChange}
                  placeholder="Budi Santoso"
                  className="text-center"
                />
                <FormInput
                  name="nip"
                  value={formData.nip}
                  onChange={handleChange}
                  placeholder="1234567890"
                  className="text-center"
                />
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
