import { useEffect, useState } from 'react'
import pdfMake from 'pdfmake/build/pdfmake'
import * as pdfFonts from 'pdfmake/build/vfs_fonts'
import DocumentActions from '@/components/common/documentAction'
import FormInput from '@/components/ui/formInput'
import FormTextArea from '@/components/ui/formTextArea'
import PDFPreview from '@/components/common/pdfPreview'
import { useMobile } from '@/hooks/useMobile'
import { generatePdfDefinition } from './generatePDFDefenition'

pdfMake.vfs = pdfFonts.vfs

export default function SuratLamaranKerja() {
  const { isMobile } = useMobile()
  const [pdfUrl, setPdfUrl] = useState(null)
  const [debounceTimer, setDebounceTimer] = useState(null)

  const [formData, setFormData] = useState({
    title: 'SURAT LAMARAN KERJA',

    kepada_1: 'Yth. HRD PT Sinar Abadi',
    kepada_2: 'Jl. Kebangsaan No. 123',
    kepada_3: 'di Tempat',

    dengan_hormat_1:
      'Dengan hormat,\nBersama ini saya mengajukan lamaran pekerjaan di perusahaan yang Bapak/Ibu pimpin.',

    dengan_hormat_2: 'Saya yang bertanda tangan di bawah ini:',

    ul_1: 'Budi Santosa',
    ul_2: 'Jl. Kenanga No. 12, Surabaya',
    ul_3: 'Surabaya, 5 Mei 1993',
    ul_4: 'S1 Sistem Informasi',
    ul_5: '0857-1234-5678',

    memberitahukan_1:
      'Saya memiliki pengalaman bekerja sebagai software engineer selama 2 tahun dan menguasai teknologi seperti Vue.js dan Laravel.',
    memberitahukan_2:
      'Saya siap mengikuti proses rekrutmen dan berkomitmen untuk memberikan yang terbaik.',

    demikian:
      'Demikian surat lamaran ini saya sampaikan. Atas perhatian Bapak/Ibu, saya ucapkan terima kasih.',

    hormat_saya_1: 'Hormat saya,',
    hormat_saya_2: 'Budi Santosa',
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
      .download('surat-lamaran-kerja.pdf')
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
        <p className="text-[2.8rem] font-bold">Surat Lamaran Kerja</p>
        <div className="scrollbar flex h-full flex-col gap-24 overflow-auto rounded-2x border bg-[#fefefe] p-[2.4rem] shadow-md phones:h-auto phones:overflow-visible">
          <div className="scrollbar-new flex min-h-[120rem] w-full flex-col gap-16 overflow-auto">
            <div className="mt-[4rem] flex items-center justify-center">
              <FormInput
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="SURAT LAMARAN KERJA"
                className="w-full text-center text-[2.4rem] font-bold"
              />
            </div>
            <div className="mt-[4rem] flex flex-col gap-4">
              <FormInput
                name="kepada_1"
                value={formData.kepada_1}
                onChange={handleChange}
                placeholder="Yth. HRD PT Sinar Abadi"
              />
              <FormInput
                name="kepada_2"
                value={formData.kepada_2}
                onChange={handleChange}
                placeholder="Jl. Kebangsaan No. 123"
              />
              <FormInput
                name="kepada_3"
                value={formData.kepada_3}
                onChange={handleChange}
                placeholder="di Tempat"
              />
            </div>

            <div className="mt-[4rem] flex flex-col gap-12">
              <FormTextArea
                name="dengan_hormat_1"
                value={formData.dengan_hormat_1}
                onChange={handleChange}
                rows={isMobile ? 4 : 2}
                placeholder="Dengan hormat,
Bersama ini saya mengajukan lamaran pekerjaan di perusahaan yang Bapak/Ibu pimpin."
              />
              <FormTextArea
                name="dengan_hormat_2"
                value={formData.dengan_hormat_2}
                onChange={handleChange}
                rows={isMobile ? 2 : 1}
                placeholder="Saya yang bertanda tangan di bawah ini:"
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
                      placeholder="Budi Santosa"
                      className="w-[98%] phones:w-[97%]"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="w-[20%] pr-4 align-top">
                    Pendidikan Terakhir
                  </td>
                  <td>
                    :{' '}
                    <FormInput
                      name="ul_4"
                      value={formData.ul_4}
                      onChange={handleChange}
                      placeholder="S1 Sistem Informasi"
                      className="w-[98%] phones:w-[97%]"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="w-[20%] pr-4 align-top">Nomor Telepon</td>
                  <td>
                    :{' '}
                    <FormInput
                      name="ul_5"
                      value={formData.ul_5}
                      onChange={handleChange}
                      placeholder="0857-1234-5678"
                      className="w-[98%] phones:w-[97%]"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="w-[20%] pr-4 align-top">Alamat</td>
                  <td>
                    :{' '}
                    <FormInput
                      name="ul_2"
                      value={formData.ul_2}
                      onChange={handleChange}
                      className="w-[98%] phones:w-[97%]"
                      placeholder="Jl. Kenanga No. 12, Surabaya"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="w-[20%] pr-4 align-top">Tempat/Tgl Lahir</td>
                  <td>
                    :{' '}
                    <FormInput
                      name="ul_3"
                      className="w-[98%] phones:w-[97%]"
                      value={formData.ul_3}
                      onChange={handleChange}
                      placeholder="Surabaya, 5 Mei 1993"
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
                rows={isMobile ? 4 : 2}
                placeholder="Saya memiliki pengalaman bekerja sebagai software engineer selama 2 tahun dan menguasai teknologi seperti Vue.js dan Laravel."
              />
              <FormTextArea
                name="memberitahukan_2"
                value={formData.memberitahukan_2}
                onChange={handleChange}
                rows={isMobile ? 2 : 1}
                placeholder="Saya siap mengikuti proses rekrutmen dan berkomitmen untuk memberikan yang terbaik."
              />
            </div>

            <FormTextArea
              placeholder="Demikian surat lamaran ini saya sampaikan. Atas perhatian Bapak/Ibu, saya ucapkan terima kasih."
              name="demikian"
              value={formData.demikian}
              onChange={handleChange}
              rows={isMobile ? 2 : 1}
            />

            <div className="mt-[4rem] flex flex-col items-end justify-center gap-80">
              <div className="flex w-1/3 flex-col gap-80 phones:w-2/5">
                <FormInput
                  name="hormat_saya_1"
                  value={formData.hormat_saya_1}
                  onChange={handleChange}
                  placeholder="Ketua RT 03 / RW 05"
                  className="text-center"
                />
                <FormInput
                  name="hormat_saya_2"
                  value={formData.hormat_saya_2}
                  onChange={handleChange}
                  placeholder="Budi Santosa"
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
