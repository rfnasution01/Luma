import { useEffect, useState } from 'react'
import pdfMake from 'pdfmake/build/pdfmake'
import * as pdfFonts from 'pdfmake/build/vfs_fonts'
import DocumentActions from '@/components/common/documentAction'
import generatePdfDefinition from './generatePDFDefenition'
import FormInput from '@/components/ui/formInput'
import FormTextArea from '@/components/ui/formTextArea'
import PDFPreview from '@/components/common/pdfPreview'
import { useMobile } from '@/hooks/useMobile'
import 'dayjs/locale/id'
import dayjs from 'dayjs'

pdfMake.vfs = pdfFonts.vfs

export default function SuratIzinSakitKuliahPage() {
  const { isMobile } = useMobile()
  const [pdfUrl, setPdfUrl] = useState(null)
  const [debounceTimer, setDebounceTimer] = useState(null)

  const [formData, setFormData] = useState({
    tempat_tanggal: `Yogyakarta, ${dayjs().locale('id').format('DD MMMM YYYY')}`,
    kepada_1: 'Yth.',
    kepada_2: 'Dosen Pengampu Mata Kuliah',
    kepada_3: 'di Tempat',
    dengan_hormat_1: 'Dengan hormat,',
    dengan_hormat_2: 'Saya yang bertanda tangan di bawah ini:',
    ul_1: 'Nama Mahasiswa',
    ul_2: 'NIM Mahasiswa',
    ul_3: 'Program Studi',
    ul_4: 'Fakultas',
    memberitahukan_1:
      'Melalui surat ini, saya mengajukan permohonan izin karena tidak dapat mengikuti kegiatan perkuliahan pada mata kuliah yang Bapak/Ibu ampu pada hari dan tanggal yang telah ditentukan, dikarenakan alasan kesehatan. Sebagai bukti, saya lampirkan surat keterangan dokter.',
    memberitahukan_2:
      'Demikian surat permohonan ini saya sampaikan dengan sebenar-benarnya. Atas perhatian dan pengertiannya, saya ucapkan terima kasih.',
    hormat_saya_1: 'Hormat saya,',
    hormat_saya_2: 'Nama Mahasiswa',
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
      .download('surat-izin-sakit-kuliah.pdf')
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
        <p className="text-[2.8rem] font-bold">Surat Izin Sakit Kuliah</p>
        <div className="scrollbar flex h-full flex-col gap-24 overflow-auto rounded-2x border bg-[#fefefe] p-[2.4rem] shadow-md phones:h-auto phones:overflow-visible">
          <div className="scrollbar-new flex min-h-[120rem] w-full flex-col gap-16 overflow-auto">
            <div className="mt-[4rem] flex items-center justify-end">
              <FormInput
                name="tempat_tanggal"
                value={formData.tempat_tanggal}
                onChange={handleChange}
                placeholder="Yogyakarta, 15 Mei 2025"
                className="w-1/2 text-end text-[2rem]"
              />
            </div>
            <div className="mt-[4rem] flex flex-col gap-4">
              <FormInput
                name="kepada_1"
                value={formData.kepada_1}
                onChange={handleChange}
                placeholder="Yth."
              />
              <FormInput
                name="kepada_2"
                value={formData.kepada_2}
                onChange={handleChange}
                placeholder="Dosen Pengampu Mata Kuliah"
              />
              <FormInput
                name="kepada_3"
                value={formData.kepada_3}
                onChange={handleChange}
                placeholder="di Tempat  "
              />
            </div>

            <div className="mt-[4rem] flex flex-col gap-24">
              <FormInput
                name="dengan_hormat_1"
                value={formData.dengan_hormat_1}
                onChange={handleChange}
                placeholder="Dengan hormat,"
              />
              <FormTextArea
                name="dengan_hormat_2"
                value={formData.dengan_hormat_2}
                onChange={handleChange}
                placeholder="Saya yang bertanda tangan di bawah ini:"
                rows={isMobile ? 2 : 1}
              />
            </div>

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
                      placeholder="Nama Mahasiswa"
                      className="w-[98%] phones:w-[97%]"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="w-[20%] pr-4 align-top">NIM</td>
                  <td>
                    :{' '}
                    <FormInput
                      name="ul_2"
                      value={formData.ul_2}
                      onChange={handleChange}
                      className="w-[98%] phones:w-[97%]"
                      placeholder="NIM Mahasiswa"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="w-[20%] pr-4 align-top">Program Studi</td>
                  <td>
                    :{' '}
                    <FormInput
                      name="ul_3"
                      className="w-[98%] phones:w-[97%]"
                      value={formData.ul_3}
                      onChange={handleChange}
                      placeholder="Program Studi"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="w-[20%] pr-4 align-top">Fakultas</td>
                  <td>
                    :{' '}
                    <FormInput
                      name="ul_4"
                      className="w-[98%] phones:w-[97%]"
                      value={formData.ul_4}
                      onChange={handleChange}
                      placeholder="Fakultas"
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
                placeholder="Melalui surat ini, saya mengajukan permohonan izin karena tidak dapat mengikuti kegiatan perkuliahan pada mata kuliah yang Bapak/Ibu ampu pada hari dan tanggal yang telah ditentukan, dikarenakan alasan kesehatan. Sebagai bukti, saya lampirkan surat keterangan dokter."
              />
              <FormTextArea
                name="memberitahukan_2"
                value={formData.memberitahukan_2}
                onChange={handleChange}
                rows={isMobile ? 3 : 2}
                placeholder="Demikian surat permohonan ini saya sampaikan dengan sebenar-benarnya. Atas perhatian dan pengertiannya, saya ucapkan terima kasih."
              />
            </div>

            <div className="mt-[4rem] flex flex-col items-end justify-center gap-12">
              <div className="flex w-1/3 flex-col gap-80 phones:w-2/5">
                <FormInput
                  name="hormat_saya_1"
                  value={formData.hormat_saya_1}
                  onChange={handleChange}
                  placeholder="Hormat saya,"
                  className="text-center"
                />
                <FormInput
                  name="hormat_saya_2"
                  value={formData.hormat_saya_2}
                  onChange={handleChange}
                  placeholder="Nama Mahasiswa"
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
