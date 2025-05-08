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
    title: 'SURAT PENGUNDURAN DIRI',

    kepada_1: 'Yth. HRD PT Maju Sejahtera',
    kepada_2: 'Jl. Merdeka No. 99',
    kepada_3: 'di Tempat',

    dengan_hormat_1:
      'Dengan hormat,\nBersama surat ini saya bermaksud untuk mengajukan pengunduran diri dari jabatan saya di perusahaan yang Bapak/Ibu pimpin.',

    nama: 'Andi Saputra',
    jabatan: 'Staff IT',
    departemen: 'Divisi Teknologi Informasi',
    alamat: 'Jl. Melati No. 45, Bandung',

    isi_pengunduran:
      'Adapun alasan pengunduran diri ini adalah karena saya ingin melanjutkan studi dan mengembangkan diri lebih lanjut. Saya berharap perusahaan dapat memahami keputusan ini.',

    penutup:
      'Saya mengucapkan terima kasih atas kesempatan, pengalaman, dan kerja sama yang telah diberikan selama ini. Semoga perusahaan semakin maju dan sukses di masa yang akan datang.',

    hormat_saya_1: 'Hormat saya,',
    hormat_saya_2: 'Andi Saputra',
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
      .download('surat-pengunduran-diri.pdf')
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
        <p className="text-[2.8rem] font-bold">Surat Pengunduran Diri</p>
        <div className="scrollbar flex h-full flex-col gap-24 overflow-auto rounded-2x border bg-[#fefefe] p-[2.4rem] shadow-md phones:h-auto phones:overflow-visible">
          <div className="scrollbar-new flex min-h-[120rem] w-full flex-col gap-16 overflow-auto">
            <div className="mt-[4rem] flex items-center justify-center">
              <FormInput
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="SURAT PENGUNDURAN DIRI"
                className="w-full text-center text-[2.4rem] font-bold"
              />
            </div>
            <div className="mt-[4rem] flex flex-col gap-4">
              <FormInput
                name="kepada_1"
                value={formData.kepada_1}
                onChange={handleChange}
                placeholder="Yth. HRD PT Maju Sejahtera"
              />
              <FormInput
                name="kepada_2"
                value={formData.kepada_2}
                onChange={handleChange}
                placeholder="Jl. Merdeka No. 99"
              />
              <FormInput
                name="kepada_3"
                value={formData.kepada_3}
                onChange={handleChange}
                placeholder="di Tempat"
              />
            </div>

            <div className="mt-[4rem] flex flex-col gap-24">
              <FormTextArea
                name="dengan_hormat_1"
                value={formData.dengan_hormat_1}
                onChange={handleChange}
                rows={isMobile ? 5 : 3}
                placeholder="Dengan hormat,
Bersama surat ini saya bermaksud untuk mengajukan pengunduran diri dari jabatan saya di perusahaan yang Bapak/Ibu pimpin."
              />
            </div>

            <table className="w-full table-auto">
              <tbody>
                <tr>
                  <td className="w-[20%] pr-4 align-top">Nama</td>
                  <td>
                    :{' '}
                    <FormInput
                      name="nama"
                      value={formData.nama}
                      onChange={handleChange}
                      placeholder="Andi Saputra"
                      className="w-[98%] phones:w-[97%]"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="w-[20%] pr-4 align-top">Jabatan</td>
                  <td>
                    :{' '}
                    <FormInput
                      name="jabatan"
                      value={formData.jabatan}
                      onChange={handleChange}
                      placeholder="Staff IT"
                      className="w-[98%] phones:w-[97%]"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="w-[20%] pr-4 align-top">Departemen</td>
                  <td>
                    :{' '}
                    <FormInput
                      name="departemen"
                      value={formData.departemen}
                      onChange={handleChange}
                      placeholder="Divisi Teknologi Informasi"
                      className="w-[98%] phones:w-[97%]"
                    />
                  </td>
                </tr>

                <tr>
                  <td className="w-[20%] pr-4 align-top">Alamat</td>
                  <td>
                    :{' '}
                    <FormInput
                      name="alamat"
                      value={formData.alamat}
                      onChange={handleChange}
                      className="w-[98%] phones:w-[97%]"
                      placeholder="Jl. Melati No. 45, Bandung"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="mt-[4rem] flex flex-col gap-24">
              <FormTextArea
                name="isi_pengunduran"
                value={formData.isi_pengunduran}
                onChange={handleChange}
                rows={isMobile ? 4 : 2}
                placeholder="Adapun alasan pengunduran diri ini adalah karena saya ingin melanjutkan studi dan mengembangkan diri lebih lanjut. Saya berharap perusahaan dapat memahami keputusan ini."
              />
              <FormTextArea
                name="penutup"
                value={formData.penutup}
                onChange={handleChange}
                rows={isMobile ? 4 : 2}
                placeholder="Saya mengucapkan terima kasih atas kesempatan, pengalaman, dan kerja sama yang telah diberikan selama ini. Semoga perusahaan semakin maju dan sukses di masa yang akan datang."
              />
            </div>

            <div className="mt-[4rem] flex flex-col items-end justify-center gap-80">
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
                placeholder="Andi Saputra"
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
