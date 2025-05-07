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

    kepada_1: 'Yth. HRD PT Maju Sejahtera',
    kepada_2: 'Jl. Merdeka No. 99',
    kepada_3: 'di Tempat',

    dengan_hormat_1:
      'Dengan hormat,\nBersama ini saya mengajukan lamaran pekerjaan di perusahaan yang Bapak/Ibu pimpin.',

    ul_1: 'Andi Saputra',
    ul_2: 'Jl. Melati No. 45, Bandung',
    ul_3: 'Bandung, 12 Januari 1995',
    ul_4: 'S1 Teknik Informatika',
    ul_5: '0812-3456-7890',

    memberitahukan_1:
      'Saya memiliki pengalaman bekerja sebagai web developer selama 3 tahun dan memiliki kemampuan dalam React.js dan Node.js.',
    memberitahukan_2:
      'Saya siap mengikuti proses seleksi dan bekerja dengan dedikasi tinggi.',

    demikian:
      'Demikian surat lamaran ini saya sampaikan. Atas perhatian Bapak/Ibu, saya ucapkan terima kasih.',

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
                placeholder="SURAT KETERANGAN DOMISILI"
                className="w-full text-center text-[2.4rem] font-bold"
              />
            </div>
            <div className="mt-[4rem] flex flex-col gap-4">
              <FormInput
                name="kepada_1"
                value={formData.kepada_1}
                onChange={handleChange}
                placeholder="Kepada Yth."
              />
              <FormInput
                name="kepada_2"
                value={formData.kepada_2}
                onChange={handleChange}
                placeholder="Lurah Kelurahan Sukamaju"
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
                placeholder="Dengan ini kami menyatakan bahwa nama yang tersebut di bawah ini adalah benar-benar berdomisili di wilayah kami:"
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
                      placeholder="Andi Saputra"
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
                      placeholder="S1 Teknik Informatika"
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
                      placeholder="0812-3456-7890"
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
                      placeholder="Jl. Melati No. 45, RT 03 RW 05, Kel. Sukamaju, Kec. Sukasari, Kota Bandung"
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
                      placeholder="Bandung, 12 Januari 1995"
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
                placeholder="Berdasarkan data administrasi dan pengamatan kami, yang bersangkutan memang benar
bertempat tinggal di alamat tersebut sejak tahun 2020 hingga saat surat ini dibuat.
"
              />
              <FormTextArea
                name="memberitahukan_2"
                value={formData.memberitahukan_2}
                onChange={handleChange}
                rows={isMobile ? 3 : 2}
                placeholder="Surat keterangan ini dibuat untuk keperluan: Pengurusan administrasi kependudukan."
              />
            </div>

            <FormTextArea
              placeholder="Demikian surat keterangan ini dibuat dengan sebenar-benarnya agar dapat dipergunakan sebagaimana mestinya."
              name="demikian"
              value={formData.demikian}
              onChange={handleChange}
              rows={isMobile ? 3 : 2}
            />

            <div className="flexcol flex flex-col items-end justify-center gap-80">
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
                placeholder="[Nama Siswa]"
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
