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

export default function SuratKeteranganSanggupMembayarAngsuran() {
  const { isMobile } = useMobile()
  const [pdfUrl, setPdfUrl] = useState(null)
  const [debounceTimer, setDebounceTimer] = useState(null)

  const [formData, setFormData] = useState({
    tempat_tanggal: `Kota Harmoni, ${dayjs().locale('id').format('DD MMMM YYYY')}`,

    dengan_hormat_1: 'Saya yang bertanda tangan di bawah ini,',
    dengan_hormat_2:
      'Menyatakan bersedia membayar ganti rugi sebesar Rp10 juta kepada Saudara Reza Fadillah sebagai sang pemilik rumah jika saya secara sepihak membatalkan penyewaan rumah yang telah disepakati pada 10 Mei 2022 dengan masa sewa 1 tahun.',
    dengan_hormat_3:
      'Apabila saya mengingkari isi surat ini di kemudian hari, saya bersedia dituntut sesuai hukum yang berlaku. Demikian surat pernyataan ini dibuat dengan sebenar-benarnya untuk digunakan sebagaimana mestinya.',

    ul_1: 'Dewi Larasati',
    ul_2: '9876543210',
    ul_3: 'Wirausaha',
    ul_4: 'Jl. Kenanga No. 77, Kota Harmoni',

    hormat_saya_1: `Kota Harmoni, ${dayjs().locale('id').format('DD MMMM YYYY')}`,
    hormat_saya_2: 'Yang membuat pernyataan,',
    hormat_saya_3: 'Dewi Larasati',
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
      .download('sp-sanggup-membayar-ganti-rugi.pdf')
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
        <p className="text-[2.8rem] font-bold">
          Surat Pernyataan Sanggup Membayar Ganti Rugi
        </p>
        <div className="scrollbar flex h-full flex-col gap-24 overflow-auto rounded-2x border bg-[#fefefe] p-[2.4rem] shadow-md phones:h-auto phones:overflow-visible">
          <div className="scrollbar-new flex min-h-[120rem] w-full flex-col gap-16 overflow-auto">
            <div className="mt-[4rem] flex items-center justify-end">
              <FormInput
                name="tempat_tanggal"
                value={formData.tempat_tanggal}
                onChange={handleChange}
                placeholder={'Kota Harmoni, 14 Mei 2025'}
                className="w-1/2 text-end text-[2rem]"
              />
            </div>

            <div className="mt-[4rem] flex flex-col gap-24">
              <FormInput
                name="dengan_hormat_1"
                value={formData.dengan_hormat_1}
                onChange={handleChange}
                placeholder="Saya yang bertanda tangan di bawah ini,"
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
                        placeholder="Dewi Larasati"
                        className="w-[98%] phones:w-[97%]"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="w-[20%] pr-4 align-top">NIK</td>
                    <td>
                      :{' '}
                      <FormInput
                        name="ul_2"
                        value={formData.ul_2}
                        onChange={handleChange}
                        className="w-[98%] phones:w-[97%]"
                        placeholder="9876543210"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="w-[20%] pr-4 align-top">Pekerjaan</td>
                    <td>
                      :{' '}
                      <FormInput
                        name="ul_3"
                        value={formData.ul_3}
                        onChange={handleChange}
                        className="w-[98%] phones:w-[97%]"
                        placeholder="Wirausaha"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="w-[20%] pr-4 align-top">Alamat</td>
                    <td>
                      :{' '}
                      <FormInput
                        name="ul_4"
                        className="w-[98%] phones:w-[97%]"
                        value={formData.ul_4}
                        onChange={handleChange}
                        placeholder="Jl. Kenanga No. 77, Kota Harmoni"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-[4rem] flex flex-col gap-12">
              <FormTextArea
                name="dengan_hormat_2"
                value={formData.dengan_hormat_2}
                onChange={handleChange}
                placeholder="Menyatakan bersedia membayar ganti rugi sebesar Rp10 juta kepada Saudara Reza Fadillah sebagai sang pemilik rumah jika saya secara sepihak membatalkan penyewaan rumah yang telah disepakati pada 10 Mei 2022 dengan masa sewa 1 tahun."
                rows={isMobile ? 5 : 3}
              />

              <FormTextArea
                name="dengan_hormat_3"
                value={formData.dengan_hormat_3}
                onChange={handleChange}
                placeholder="Apabila saya mengingkari isi surat ini di kemudian hari, saya bersedia dituntut sesuai hukum yang berlaku. Demikian surat pernyataan ini dibuat dengan sebenar-benarnya untuk digunakan sebagaimana mestinya."
                rows={isMobile ? 5 : 2}
              />
            </div>

            <div className="mt-[4rem] flex flex-col items-end justify-center gap-80">
              <div className="flex w-1/3 flex-col gap-80 phones:w-2/5">
                <div className="flex flex-col gap-12">
                  <FormInput
                    name="hormat_saya_1"
                    value={formData.hormat_saya_1}
                    onChange={handleChange}
                    placeholder="Kota Harmoni, 14 Mei 2025"
                    className="text-center"
                  />
                  <FormInput
                    name="hormat_saya_2"
                    value={formData.hormat_saya_2}
                    onChange={handleChange}
                    placeholder="Yang membuat pernyataan,"
                    className="text-center"
                  />
                </div>
                <FormInput
                  name="hormat_saya_3"
                  value={formData.hormat_saya_3}
                  onChange={handleChange}
                  placeholder="Dewi Larasati"
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
