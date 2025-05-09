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

export default function SuratKeteranganBelumMenikah() {
  const { isMobile } = useMobile()
  const [pdfUrl, setPdfUrl] = useState(null)
  const [debounceTimer, setDebounceTimer] = useState(null)

  const [formData, setFormData] = useState({
    logo: '',

    header1: 'PEMERINTAHAN KABUPATEN PURBALINGGA',
    header2: 'KECAMATAN  KERTANEGARA',
    header3: 'DESA  LANGKAP',
    header4: 'Alamat : Jalan Raya Langkap – Kertanegara, 53358',

    title: 'SURAT KETERANGAN BELUM MENIKAH',
    no_surat: 'Nomor: RT/RW/No/XX/YYYY',

    pengantar1: 'Yang bertanda tangan di bawah ini :',

    ul_1: 'Nama Kepala Desa',
    ul_2: 'Kepala Desa Langkap',

    pengantar2: 'Menerangkan dengan sebenarnya bahwa :',

    ul_3: 'Syamil Wahyudi',
    ul_4: 'Laki-laki',
    ul_5: 'Bekasi, 1 Januari 2000',
    ul_6: 'Islam',
    ul_7: 'Pengusaha Mebel',
    ul_8: '010101010101',
    ul_9: 'Jl Gajah Mundur, No. 8, Suka Maju',

    pengantar3:
      'Menurut pendataan kami, hingga saat dikeluarkan Surat Keterangan ini serta diperjelas berdasarkan Pernyataan saudara :',

    ul_10: 'Abdillah',
    ul_11: 'Laki-laki',
    ul_12: 'Bekasi, 1 Januari 1970',
    ul_13: 'Ayah',

    memberitahukan_1:
      'yang bersangkutan “Belum pernah menikah, dan tercatat masih berstatus Perjaka/ Perawan)*”',

    memberitahukan_2:
      'Surat keterangan ini diberikan untuk melengkapi persyaratan ......................................................',
    memberitahukan_3:
      'Demikain keterangan ini kami berikan untuk dapat dipergunakan seperlunya.',

    alamat_tanggal: `Jakarta, ${dayjs().locale('id').format('DD MMMM YYYY')}`,

    jabatan_penandatangan: 'Kepala Desa Setempat',
    nama_penandatangan: 'Syamiliyah',
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
        <p className="text-[2.8rem] font-bold">
          Surat Keterangan Belum Menikah
        </p>
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
                  placeholder="PEMERINTAHAN KABUPATEN PURBALINGGA"
                  className="text-center text-[2.8rem] font-bold"
                />
                <FormInput
                  name="header2"
                  value={formData.header2}
                  onChange={handleChange}
                  placeholder="KECAMATAN  KERTANEGARA"
                  className="text-center text-[2.4rem]"
                />
                <FormInput
                  name="header3"
                  value={formData.header3}
                  onChange={handleChange}
                  placeholder="DESA  LANGKAP"
                  className="text-center text-[2.4rem]"
                />
                <FormInput
                  name="header4"
                  value={formData.header4}
                  onChange={handleChange}
                  placeholder="Alamat : Jalan Raya Langkap – Kertanegara, 53358"
                  className="text-center"
                />
              </div>
            </div>

            <div className="mt-[4rem] flex flex-col items-center justify-center">
              <FormInput
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="SURAT KETERANGAN BELUM MENIKAH"
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
                name="pengantar1"
                value={formData.pengantar1}
                onChange={handleChange}
                rows={isMobile ? 3 : 2}
                placeholder="Yang bertanda tangan di bawah ini :"
              />
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
                        placeholder="Nama Kepala Desa"
                        className="w-[80%] phones:w-[60%]"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="w-[20%] pr-4 align-top phones:w-[40%]">
                      Jabatan
                    </td>
                    <td>
                      :{' '}
                      <FormInput
                        name="ul_2"
                        value={formData.ul_2}
                        onChange={handleChange}
                        placeholder="Kepala Desa Langkap"
                        className="w-[80%] phones:w-[60%]"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-[4rem] flex flex-col gap-4">
              <FormTextArea
                name="pengantar2"
                value={formData.pengantar2}
                onChange={handleChange}
                rows={isMobile ? 3 : 2}
                placeholder="Menerangkan dengan sebenarnya bahwa :"
              />
              <table className="w-full table-auto">
                <tbody>
                  <tr>
                    <td className="w-[20%] pr-4 align-top phones:w-[40%]">
                      Nama Lengkap
                    </td>
                    <td>
                      :{' '}
                      <FormInput
                        name="ul_3"
                        value={formData.ul_3}
                        onChange={handleChange}
                        placeholder="Syamil Wahyudi"
                        className="w-[80%] phones:w-[60%]"
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
                      Tempat, Tgl. Lahir
                    </td>
                    <td>
                      :{' '}
                      <FormInput
                        name="ul_5"
                        className="w-[80%] phones:w-[60%]"
                        value={formData.ul_5}
                        onChange={handleChange}
                        placeholder="Bekasi, 1 Januari 2000"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="w-[20%] pr-4 align-top phones:w-[40%]">
                      Agama
                    </td>
                    <td>
                      :{' '}
                      <FormInput
                        name="ul_6"
                        value={formData.ul_6}
                        onChange={handleChange}
                        placeholder="Islam"
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
                        name="ul_7"
                        value={formData.ul_7}
                        onChange={handleChange}
                        placeholder="Pengusaha Mebel"
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
                        name="ul_8"
                        value={formData.ul_8}
                        onChange={handleChange}
                        placeholder="010101010101"
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
                        name="ul_9"
                        value={formData.ul_9 || ''}
                        onChange={handleChange}
                        placeholder="Jl Gajah Mundur, No. 8, Suka Maju"
                        className="w-[80%] phones:w-[60%]"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-[4rem] flex flex-col gap-4">
              <FormTextArea
                name="pengantar3"
                value={formData.pengantar3}
                onChange={handleChange}
                rows={isMobile ? 3 : 2}
                placeholder="Menurut pendataan kami, hingga saat dikeluarkan Surat Keterangan ini serta diperjelas berdasarkan Pernyataan saudara :"
              />
              <table className="w-full table-auto">
                <tbody>
                  <tr>
                    <td className="w-[20%] pr-4 align-top phones:w-[40%]">
                      Nama Lengkap
                    </td>
                    <td>
                      :{' '}
                      <FormInput
                        name="ul_10"
                        value={formData.ul_10}
                        onChange={handleChange}
                        placeholder="Abdillah"
                        className="w-[80%] phones:w-[60%]"
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
                        name="ul_11"
                        value={formData.ul_11}
                        onChange={handleChange}
                        placeholder="Laki-laki"
                        className="w-[80%] phones:w-[60%]"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="w-[20%] pr-4 align-top phones:w-[40%]">
                      Tempat, Tgl. Lahir
                    </td>
                    <td>
                      :{' '}
                      <FormInput
                        name="ul_12"
                        value={formData.ul_12}
                        onChange={handleChange}
                        placeholder="Bekasi, 1 Januari 1970"
                        className="w-[80%] phones:w-[60%]"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="w-[20%] pr-4 align-top phones:w-[40%]">
                      Hubungan Keluarga
                    </td>
                    <td>
                      :{' '}
                      <FormInput
                        name="ul_13"
                        value={formData.ul_13}
                        onChange={handleChange}
                        placeholder="Ayah"
                        className="w-[80%] phones:w-[60%]"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-[4rem] flex flex-col gap-12">
              <FormTextArea
                name="memberitahukan_1"
                value={formData.memberitahukan_1}
                onChange={handleChange}
                rows={isMobile ? 2 : 1}
                placeholder="yang bersangkutan “Belum pernah menikah, dan tercatat masih berstatus Perjaka/ Perawan)*”"
              />
              <FormTextArea
                name="memberitahukan_2"
                value={formData.memberitahukan_2}
                onChange={handleChange}
                rows={isMobile ? 3 : 2}
                placeholder="Surat keterangan ini diberikan untuk melengkapi persyaratan ......................................................"
              />
              <FormTextArea
                name="memberitahukan_3"
                value={formData.memberitahukan_3}
                onChange={handleChange}
                placeholder="Demikain keterangan ini kami berikan untuk dapat dipergunakan seperlunya."
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
                  placeholder="Kepala Desa Setempat"
                  className="text-center"
                />
              </div>
              <FormInput
                name="nama_penandatangan"
                value={formData.nama_penandatangan}
                onChange={handleChange}
                placeholder="Syamiliyah"
                className="text-center"
              />
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
