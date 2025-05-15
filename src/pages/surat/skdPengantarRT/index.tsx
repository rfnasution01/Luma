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

export default function SuratKeteranganDomisiliPengantarRT() {
  const { isMobile } = useMobile()
  const [pdfUrl, setPdfUrl] = useState(null)
  const [debounceTimer, setDebounceTimer] = useState(null)

  const [formData, setFormData] = useState({
    header1: 'Rukun Tetangga 05 / 03 Perumahan Harmoni Sejahtera',
    header2: 'Desa Maju Jaya, Kecamatan Lembah Hijau',
    header3: 'Kabupaten Cendekia - 54321',
    header4: 'Jl. Harmoni Raya No. 9, Cendekia, Kode Pos: 54321',

    title: 'SURAT KETERANGAN DOMISILI',
    no_surat: 'Nomor: 05/03/DS/XX/2025',

    pengantar:
      'Yang bertanda tangan di bawah ini, Ketua RT. 05 RW. 03 Desa Maju Jaya Kecamatan Lembah Hijau Kabupaten Cendekia, dengan ini menerangkan bahwa:',

    ul_1: 'Rizky Alfarizi',
    ul_2: 'Laki-laki',
    ul_3: 'Cendekia, 15 Februari 1999',
    ul_4: '3210987654320001',
    ul_5: 'Wiraswasta',
    ul_6: 'Islam',
    ul_7: 'Indonesia',
    ul_8: 'Jl. Anggrek Merah No. 12, Perum. Harmoni Sejahtera',

    memberitahukan_1:
      'Adalah benar warga kami yang berdomisili di lingkungan RT. 05 RW. 03 Perumahan Harmoni Sejahtera, Desa Maju Jaya, Kecamatan Lembah Hijau, Kabupaten Cendekia.',

    memberitahukan_2:
      'Demikian Surat Keterangan ini dibuat untuk dapat digunakan sebagaimana mestinya.',

    alamat_tanggal: `Cendekia, ${dayjs().locale('id').format('DD MMMM YYYY')}`,

    jabatan_penandatangan: 'Pemohon',
    nama_penandatangan: 'Rizky Alfarizi',
    jabatan_rt: 'Ketua RT. 05 RW. 03',
    nama_rt: 'Satria Nugraha',
    mengetahui: 'Mengetahui',
    jabatan_rw: 'Ketua RW. 03',
    nama_rw: 'Lestari Wibowo',
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
      .download('skd-pengantar-rt.pdf')
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
          Surat Keterangan Domisili Pengantar RT
        </p>
        <div className="scrollbar flex h-full flex-col gap-24 overflow-auto rounded-2x border bg-[#fefefe] p-[2.4rem] shadow-md phones:h-auto phones:overflow-visible">
          <div className="scrollbar flex min-h-[120rem] w-full flex-col gap-16 overflow-auto">
            {/* --- Kop Surat --- */}
            <div className="flex w-full gap-32 border-b border-black pb-12">
              <div className="flex flex-1 flex-col gap-4">
                <FormInput
                  name="header1"
                  value={formData.header1}
                  onChange={handleChange}
                  placeholder="Rukun Tetangga 05 / 03 Perumahan Harmoni Sejahtera"
                  className="text-center text-[2.8rem] font-bold"
                />
                <FormInput
                  name="header2"
                  value={formData.header2}
                  onChange={handleChange}
                  placeholder="Desa Maju Jaya, Kecamatan Lembah Hijau"
                  className="text-center text-[2.4rem]"
                />
                <FormInput
                  name="header3"
                  value={formData.header3}
                  onChange={handleChange}
                  placeholder="Kabupaten Cendekia - 54321"
                  className="text-center text-[2.4rem]"
                />
                <FormInput
                  name="header4"
                  value={formData.header4}
                  onChange={handleChange}
                  placeholder="Jl. Harmoni Raya No. 9, Cendekia, Kode Pos: 54321"
                  className="text-center"
                />
              </div>
            </div>

            <div className="mt-[4rem] flex flex-col items-center justify-center">
              <FormInput
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="SURAT KETERANGAN DOMISILI"
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
                placeholder="Yang bertanda tangan di bawah ini, Ketua RT. 05 RW. 03 Desa Maju Jaya Kecamatan Lembah Hijau Kabupaten Cendekia, dengan ini menerangkan bahwa:"
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
                      placeholder="Rizky Alfarizi"
                      className="w-[80%] phones:w-[60%]"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="w-[20%] pr-4 align-top phones:w-[40%]">
                    Jenis Kalamin
                  </td>
                  <td>
                    :{' '}
                    <FormInput
                      name="ul_2"
                      value={formData.ul_2}
                      onChange={handleChange}
                      placeholder="Laki-laki"
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
                      placeholder="Cendekia, 15 Februari 1999"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="w-[20%] pr-4 align-top phones:w-[40%]">
                    No. KK / KTP
                  </td>
                  <td>
                    :{' '}
                    <FormInput
                      name="ul_4"
                      value={formData.ul_4}
                      onChange={handleChange}
                      placeholder="3210987654320001"
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
                      name="ul_5"
                      value={formData.ul_5}
                      onChange={handleChange}
                      placeholder="Wiraswasta"
                      className="w-[80%] phones:w-[60%]"
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
                    Kewarganegaraan
                  </td>
                  <td>
                    :{' '}
                    <FormInput
                      name="ul_7"
                      value={formData.ul_7 || ''}
                      onChange={handleChange}
                      placeholder="Indonesia"
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
                      name="ul_8"
                      value={formData.ul_8 || ''}
                      onChange={handleChange}
                      placeholder="Jl. Anggrek Merah No. 12, Perum. Harmoni Sejahtera"
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
                rows={isMobile ? 4 : 2}
                placeholder="Adalah benar warga kami yang berdomisili di lingkungan RT. 05 RW. 03 Perumahan Harmoni Sejahtera, Desa Maju Jaya, Kecamatan Lembah Hijau, Kabupaten Cendekia."
              />
              <FormTextArea
                name="memberitahukan_2"
                value={formData.memberitahukan_2}
                onChange={handleChange}
                rows={isMobile ? 2 : 1}
                placeholder="Demikian Surat Keterangan ini dibuat untuk dapat digunakan sebagaimana mestinya."
              />
            </div>

            <div className="mt-[4rem] flex items-start justify-between gap-32">
              <div className="flex flex-col justify-center gap-80">
                <div className="flex flex-col gap-12">
                  <FormInput
                    name="alamat_tanggal"
                    value={formData.alamat_tanggal}
                    onChange={handleChange}
                    placeholder={`Cendekia, ${dayjs().locale('id').format('DD MMMM YYYY')}`}
                    className="text-center"
                  />
                  <FormInput
                    name="jabatan_penandatangan"
                    value={formData.jabatan_penandatangan}
                    onChange={handleChange}
                    placeholder="Pemohon"
                    className="text-center"
                  />
                </div>
                <FormInput
                  name="nama_penandatangan"
                  value={formData.nama_penandatangan}
                  onChange={handleChange}
                  placeholder="Rizky Alfarizi"
                  className="text-center"
                />
              </div>
              <div className="flex flex-col justify-center gap-80">
                <div className="flex flex-col justify-center gap-80">
                  <div className="flex flex-col gap-12">
                    <p className="text-white">hidden</p>
                    <FormInput
                      name="jabatan_rt"
                      value={formData.jabatan_rt}
                      onChange={handleChange}
                      placeholder="Ketua RT. 05 RW. 03"
                      className="text-center"
                    />
                  </div>
                  <FormInput
                    name="nama_rt"
                    value={formData.nama_rt}
                    onChange={handleChange}
                    placeholder="Satria Nugraha"
                    className="text-center"
                  />
                </div>
              </div>
            </div>
            <div className="mt-[4rem] flex items-start justify-center gap-32">
              <div className="flex flex-col justify-center gap-80">
                <div className="flex flex-col gap-12">
                  <FormInput
                    name="mengetahui"
                    value={formData.mengetahui}
                    onChange={handleChange}
                    placeholder="Mengetahui"
                    className="text-center"
                  />
                  <FormInput
                    name="jabatan_rw"
                    value={formData.jabatan_rw}
                    onChange={handleChange}
                    placeholder="Ketua RW. 03"
                    className="text-center"
                  />
                </div>
                <FormInput
                  name="nama_rw"
                  value={formData.nama_rw}
                  onChange={handleChange}
                  placeholder="Lestari Wibowo"
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
