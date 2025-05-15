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

export default function SuratKeteranganKehilangan() {
  const { isMobile } = useMobile()
  const [pdfUrl, setPdfUrl] = useState(null)
  const [debounceTimer, setDebounceTimer] = useState(null)

  const [formData, setFormData] = useState({
    title: 'SURAT PERNYATAAN KEHILANGAN',

    pengantar: 'Saya yang bertanda tangan di bawah ini:',

    ul_1: 'Rama Adinata',
    ul_2: 'Jl. Melati Indah No. 12, Kelurahan Damai Sentosa',
    ul_3: 'Laki-laki',
    ul_4: 'Warga Negara Indonesia',
    ul_5: '1234567890123456',

    memberitahukan_1:
      'Dengan ini menyatakan bahwa pada hari Minggu, 11 Mei 2025 telah kehilangan sebuah dompet berwarna hitam. Dompet tersebut hilang dalam perjalanan dari kantor menuju tempat tinggal.',

    memberitahukan_2:
      'Demikian surat pernyataan kehilangan ini saya buat dengan sebenar-benarnya agar dapat dipergunakan sebagaimana mestinya.',

    menyatakan: 'Yang menyatakan',
    alamat_tanggal: `Kota Sejahtera, ${dayjs().locale('id').format('DD MMMM YYYY')}`,
    nama: 'Rama Adinata',
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
      .download('skkehilangan.pdf')
  }

  const handlePrint = () => {
    pdfMake.createPdf(generatePdfDefinition(formData)).print()
  }

  const handleOpen = () => {
    pdfMake.createPdf(generatePdfDefinition(formData)).open()
  }

  return (
    <div className="scrollbar flex h-full w-full gap-32 overflow-auto phones:h-auto phones:flex-col phones:overflow-visible">
      {/* --- Form Untuk Mengubah Data --- */}
      <div className="scrollbar flex h-full w-1/2 flex-col gap-32 overflow-auto phones:h-auto phones:w-full phones:overflow-visible">
        <p className="text-[2.8rem] font-bold">Surat Keterangan Kehilangan</p>
        <div className="scrollbar flex h-full flex-col gap-24 overflow-auto rounded-2x border bg-[#fefefe] p-[2.4rem] shadow-md phones:h-auto phones:overflow-visible">
          <div className="scrollbar flex min-h-[120rem] w-full flex-col gap-16 overflow-auto">
            {/* --- Kop Surat --- */}

            <div className="mt-[4rem] flex flex-col items-center justify-center">
              <FormInput
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="SURAT PERNYATAAN KEHILANGAN"
                className="w-full text-center text-[2.4rem] font-bold"
              />
            </div>

            <div className="mt-[4rem] flex flex-col gap-4">
              <FormTextArea
                name="pengantar"
                value={formData.pengantar}
                onChange={handleChange}
                rows={isMobile ? 2 : 1}
                placeholder="Saya yang bertanda tangan dibawah ini:"
              />
            </div>

            <table className="w-full table-auto">
              <tbody>
                <tr>
                  <td className="w-[20%] pr-4 align-top phones:w-[40%]">
                    Nama
                  </td>
                  <td>
                    :{' '}
                    <FormInput
                      name="ul_1"
                      value={formData.ul_1}
                      onChange={handleChange}
                      placeholder="Rama Adinata"
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
                      value={formData.ul_2}
                      onChange={handleChange}
                      placeholder="Jl. Melati Indah No. 12, Kelurahan Damai Sentosa"
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
                      name="ul_3"
                      className="w-[80%] phones:w-[60%]"
                      value={formData.ul_3}
                      onChange={handleChange}
                      placeholder="Laki-laki"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="w-[20%] pr-4 align-top phones:w-[40%]">
                    Kebangsaan
                  </td>
                  <td>
                    :{' '}
                    <FormInput
                      name="ul_4"
                      value={formData.ul_4}
                      onChange={handleChange}
                      placeholder="Warga Negara Indonesia"
                      className="w-[80%] phones:w-[60%]"
                    />
                  </td>
                </tr>

                <tr>
                  <td className="w-[20%] pr-4 align-top phones:w-[40%]">
                    No. KTP
                  </td>
                  <td>
                    :{' '}
                    <FormInput
                      name="ul_5"
                      value={formData.ul_5}
                      onChange={handleChange}
                      placeholder="1234567890123456"
                      className="w-[80%] phones:w-[60%]"
                    />
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="mt-[4rem] flex flex-col gap-12">
              <FormTextArea
                name="memberitahukan_1"
                value={formData.memberitahukan_1}
                onChange={handleChange}
                rows={isMobile ? 4 : 2}
                placeholder="Dengan ini menyatakan bahwa pada hari Minggu, 11 Mei 2025 telah kehilangan sebuah dompet berwarna hitam. Dompet tersebut hilang dalam perjalanan dari kantor menuju tempat tinggal."
              />
              <FormTextArea
                name="memberitahukan_2"
                value={formData.memberitahukan_2}
                onChange={handleChange}
                rows={isMobile ? 3 : 2}
                placeholder="Demikian surat pernyataan kehilangan ini saya buat dengan sebenar-benarnya agar dapat dipergunakan sebagaimana mestinya."
              />
            </div>

            <div className="mt-[4rem] flex items-start justify-end gap-32">
              <div className="flex flex-col justify-center gap-80">
                <div className="flex flex-col justify-center gap-80">
                  <div className="flex flex-col gap-12">
                    <FormInput
                      name="alamat_tanggal"
                      value={formData.alamat_tanggal}
                      onChange={handleChange}
                      placeholder="Kota Sejahtera, 11 Mei 2025"
                      className="text-center"
                    />
                    <FormInput
                      name="menyatakan"
                      value={formData.menyatakan}
                      onChange={handleChange}
                      placeholder="Yang menyatakan"
                      className="text-center"
                    />
                  </div>
                  <FormInput
                    name="nama"
                    className="text-center"
                    value={formData.nama}
                    onChange={handleChange}
                    placeholder="Rama Adinata"
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
