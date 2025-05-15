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

export default function SuratKeteranganTidakBeasiswaGanda() {
  const { isMobile } = useMobile()
  const [pdfUrl, setPdfUrl] = useState(null)
  const [debounceTimer, setDebounceTimer] = useState(null)

  const [formData, setFormData] = useState({
    logo: '',
    header1: 'Departemen Pendidikan Nasional',
    header2: 'Universitas Contoh Nusantara',
    header3: 'Fakultas Ilmu Pendidikan dan Pengembangan',
    header4:
      'Alamat: Jl. Cendekia No. 45, Kota Edukasi, Telp. (021) 12345678 Fax. (021) 87654321',

    title:
      'SURAT KETERANGAN TIDAK SEDANG MENERIMA BEASISWA DALAM WAKTU BERSAMAAN (BEASISWA GANDA)',
    no_surat: 'Nomor: 001/SKTB-FIP/IV/2025',

    pengantar_1: 'Saya yang bertanda tangan di bawah ini:',

    ul_1: 'Rafi Pratama',
    ul_2: 'Kota Fiktif, 12 Januari 1996',
    ul_3: '1234567890', // NIM/NIK
    ul_4: 'Pendidikan Bahasa',
    ul_5: 'Program Studi Pendidikan Bahasa Indonesia',
    ul_6: 'Beasiswa Prestasi Akademik',
    ul_7: 'Jl. Mawar No. 10, Kota Fiktif',

    penutup_1:
      'Dengan ini saya menyatakan bahwa saya sebagai calon penerima Beasiswa tidak sedang menerima beasiswa lain dalam waktu bersamaan (Beasiswa Ganda). Jika di kemudian hari terbukti saya menerima dua (2) beasiswa sebagaimana dinyatakan di atas, maka saya bersedia menerima sanksi akademik dari Pimpinan Fakultas Ilmu Pendidikan dan Pengembangan Universitas Contoh Nusantara.',
    penutup_2:
      'Demikianlah surat pernyataan ini saya buat dengan sebenar-benarnya untuk dapat dipergunakan sebagaimana mestinya.',

    mengetahui_1: 'Mengetahui:',
    jabatan_1: 'Wakil Dekan III',
    nama_1: 'Dr. Ahmad Santoso',
    nip_1: 'NIP. 19876543210',
    mengetahui_2: `Kota Edukasi, ${dayjs().locale('id').format('DD MMMM YYYY')}`,
    jabatan_2: 'Yang Menyatakan,',
    nama_2: 'Rafi Pratama',
    nip_2: 'NIM. 2022123456',
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
      .download('sk-tidak-beasiswa-ganda.pdf')
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
          SURAT KETERANGAN TIDAK SEDANG MENERIMA BEASISWA DALAM WAKTU BERSAMAAN
          (BEASISWA GANDA)
        </p>
        <div className="scrollbar flex h-full flex-col gap-24 overflow-auto rounded-2x border bg-[#fefefe] p-[2.4rem] shadow-md phones:h-auto phones:overflow-visible">
          <div className="scrollbar flex min-h-[120rem] w-full flex-col gap-16 overflow-auto">
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
                  placeholder="Departemen Pendidikan Nasional"
                  className="text-center text-[2.8rem] font-bold"
                />
                <FormInput
                  name="header2"
                  value={formData.header2}
                  onChange={handleChange}
                  placeholder="Universitas Contoh Nusantara"
                  className="text-center text-[2.4rem]"
                />
                <FormInput
                  name="header3"
                  value={formData.header3}
                  onChange={handleChange}
                  placeholder="Fakultas Ilmu Pendidikan dan Pengembangan"
                  className="text-center text-[2.4rem]"
                />
                <FormInput
                  name="header4"
                  value={formData.header4}
                  onChange={handleChange}
                  placeholder="Alamat: Jl. Cendekia No. 45, Kota Edukasi, Telp. (021) 12345678 Fax. (021) 87654321"
                  className="text-center"
                />
              </div>
            </div>

            <div className="mt-[4rem] flex flex-col items-center justify-center">
              <FormTextArea
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="SURAT KETERANGAN TIDAK SEDANG MENERIMA BEASISWA
DALAM WAKTU BERSAMAAN (BEASISWA GANDA)"
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

            <div className="mt-[4rem] flex flex-col gap-24">
              <FormTextArea
                name="pengantar_1"
                value={formData.pengantar_1}
                onChange={handleChange}
                rows={isMobile ? 2 : 1}
                placeholder="Saya yang bertanda tangan di bawah ini:"
              />
              <table className="w-full table-auto">
                <tbody>
                  <tr>
                    <td className="w-[20%] pr-4 align-top">Nama</td>
                    <td>
                      :{' '}
                      <FormInput
                        name="ul_1"
                        value={formData.ul_1}
                        onChange={handleChange}
                        placeholder="Rafi Pratama"
                        className="w-[80%]"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="pr-4 align-top">Tempat/Tgl. Lahir</td>
                    <td>
                      :{' '}
                      <FormInput
                        name="ul_2"
                        value={formData.ul_2}
                        onChange={handleChange}
                        placeholder="Kota Fiktif, 12 Januari 1996"
                        className="w-[80%]"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="pr-4 align-top">NIM</td>
                    <td>
                      :{' '}
                      <FormInput
                        name="ul_3"
                        value={formData.ul_3}
                        onChange={handleChange}
                        placeholder="1234567890"
                        className="w-[80%]"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="pr-4 align-top">Jurusan</td>
                    <td>
                      :{' '}
                      <FormInput
                        name="ul_4"
                        value={formData.ul_4}
                        onChange={handleChange}
                        placeholder="Pendidikan Bahasa"
                        className="w-[80%]"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="pr-4 align-top">Program Studi</td>
                    <td>
                      :{' '}
                      <FormInput
                        name="ul_5"
                        value={formData.ul_5}
                        onChange={handleChange}
                        placeholder="Program Studi Pendidikan Bahasa Indonesia"
                        className="w-[80%]"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="pr-4 align-top">Program</td>
                    <td>
                      :{' '}
                      <FormInput
                        name="ul_6"
                        value={formData.ul_6}
                        onChange={handleChange}
                        placeholder="Beasiswa Prestasi Akademik"
                        className="w-[80%]"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="pr-4 align-top">Alamat</td>
                    <td>
                      :{' '}
                      <FormInput
                        name="ul_7"
                        value={formData.ul_7}
                        onChange={handleChange}
                        placeholder="Jl. Mawar No. 10, Kota Fiktif"
                        className="w-[80%]"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-[4rem] flex flex-col gap-12">
              <FormTextArea
                name="penutup_1"
                value={formData.penutup_1}
                onChange={handleChange}
                rows={isMobile ? 8 : 4}
                placeholder="Dengan ini saya menyatakan bahwa saya sebagai calon penerima Beasiswa tidak sedang menerima beasiswa lain dalam waktu bersamaan (Beasiswa Ganda). Jika di kemudian hari terbukti saya menerima dua (2) beasiswa sebagaimana dinyatakan di atas, maka saya bersedia menerima sanksi akademik dari Pimpinan Fakultas Ilmu Pendidikan dan Pengembangan Universitas Contoh Nusantara."
              />
              <FormTextArea
                name="penutup_2"
                value={formData.penutup_2}
                onChange={handleChange}
                rows={isMobile ? 2 : 1}
                placeholder="Demikianlah surat pernyataan ini saya buat dengan sebenar-benarnya untuk dapat dipergunakan sebagaimana mestinya."
              />
            </div>

            <div className="mt-[4rem] flex flex-row items-start justify-between gap-32">
              <div className="flex w-1/3 flex-col justify-center gap-80 phones:w-2/5">
                <div className="flex flex-col gap-12">
                  <FormInput
                    name="mengetahui_1"
                    value={formData.mengetahui_1}
                    onChange={handleChange}
                    placeholder={`Mengetahui:`}
                  />
                  <FormInput
                    name="jabatan_1"
                    value={formData.jabatan_1}
                    onChange={handleChange}
                    placeholder={`Wakil Dekan III`}
                  />
                </div>
                <div className="flex flex-col gap-12">
                  <FormInput
                    name="nama_1"
                    value={formData.nama_1}
                    onChange={handleChange}
                    placeholder="Dr. Ahmad Santoso"
                  />
                  <FormInput
                    name="nip_1"
                    value={formData.nip_1}
                    onChange={handleChange}
                    placeholder="NIP. 19876543210"
                  />
                </div>
              </div>
              <div className="flex w-1/3 flex-col justify-center gap-80 phones:w-2/5">
                <div className="flex flex-col gap-12">
                  <FormInput
                    name="mengetahui_2"
                    value={formData.mengetahui_2}
                    onChange={handleChange}
                    placeholder={`Kota Edukasi, 14 Mei 2025`}
                  />
                  <FormInput
                    name="jabatan_2"
                    value={formData.jabatan_2}
                    onChange={handleChange}
                    placeholder="Yang Menyatakan,"
                  />
                </div>
                <div className="flex flex-col gap-12">
                  <FormInput
                    name="nama_2"
                    value={formData.nama_2}
                    onChange={handleChange}
                    placeholder="Rafi Pratama"
                  />
                  <FormInput
                    name="nip_2"
                    value={formData.nip_2}
                    onChange={handleChange}
                    placeholder="NIM. 2022123456"
                  />
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
