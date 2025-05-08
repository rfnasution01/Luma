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
    header1: 'Rukun Tetangga 08 / 02 Perumahan Sumber Waras',
    header2: 'Desa Suka Maju, Kecamatan Sayur Bayam',
    header3: 'Kabupaten Bandung - 12345',
    header4: 'Jl. Sukamaju Raya No. 1, Bandung Kode Pos: 12345',

    title: 'SURAT KETERANGAN DOMISILI',
    no_surat: 'Nomor: RT/RW/No/XX/YYYY',

    pengantar:
      'Yang bertanda tangan di bawah ini ketua RT. 08 RW. 02 Desa Suka Maju Kecamatan Sayur Bayam Kabupaten Bandung menerangkan bahwa:',

    ul_1: 'Syamil Wahyudi',
    ul_2: 'Laki-laki',
    ul_3: 'Bekasi, 1 Januari 2000',
    ul_4: '010101010101',
    ul_5: 'Pengusaha Mebel',
    ul_6: 'Islam',
    ul_7: 'Indonesia',
    ul_8: 'Jl Gajah Mundur, No. 8, Suka Maju',

    memberitahukan_1:
      'Adalah benar warga kami di lingkungan RT. 08 RW. 02 Perumahan Sumber Waras, Desa Suka Maju, Kecamatan Sayur Bayam, Kabupaten Bandung',

    memberitahukan_2:
      'Demikian Surat Keterangan ini dibuat, untuk dipergunakan sebagaimana mestinya',

    alamat_tanggal: `Jakarta, ${dayjs().locale('id').format('DD MMMM YYYY')}`,

    jabatan_penandatangan: 'Pemohon',
    nama_penandatangan: 'Syamil Wahyudi',
    jabatan_rt: 'Ketua RT. 08 RW. 02',
    nama_rt: 'Abdillah',
    mengetahui: 'Mengetahui',
    jabatan_rw: 'Ketua RW. 02',
    nama_rw: 'Syamiliyah',
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
                  placeholder="Rukun Tetangga 08 / 02 Perumahan Sumber Waras"
                  className="text-center text-[2.8rem] font-bold"
                />
                <FormInput
                  name="header2"
                  value={formData.header2}
                  onChange={handleChange}
                  placeholder="Desa Suka Maju, Kecamatan Sayur Bayam"
                  className="text-center text-[2.4rem]"
                />
                <FormInput
                  name="header3"
                  value={formData.header3}
                  onChange={handleChange}
                  placeholder="Kabupaten Bandung - 12345"
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
                placeholder="Yang bertanda tangan di bawah ini ketua RT. 08 RW. 02 Desa Suka Maju Kecamatan Sayur Bayam Kabupaten Bandung menerangkan bahwa:"
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
                      placeholder="Syamil Wahyudi"
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
                      placeholder="Bekasi, 1 Januari 2000"
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
                      placeholder="010101010101"
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
                      placeholder="Pengusaha Mebel"
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
                      placeholder="Jl Gajah Mundur, No. 8, Suka Maju"
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
                placeholder="Adalah benar warga kami di lingkungan RT. 08 RW. 02 Perumahan Sumber Waras, Desa Suka Maju, Kecamatan Sayur Bayam, Kabupaten Bandung."
              />
              <FormTextArea
                name="memberitahukan_2"
                value={formData.memberitahukan_2}
                onChange={handleChange}
                rows={isMobile ? 2 : 1}
                placeholder="Demikian Surat Keterangan ini dibuat, untuk dipergunakan sebagaimana mestinya"
              />
            </div>

            <div className="mt-[4rem] flex items-start justify-between gap-32">
              <div className="flex flex-col justify-center gap-80">
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
                    placeholder="Pemohon"
                    className="text-center"
                  />
                </div>
                <FormInput
                  name="nama_penandatangan"
                  value={formData.nama_penandatangan}
                  onChange={handleChange}
                  placeholder="Syamil Wahyudi"
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
                      placeholder="Ketua RT. 08 RW. 02"
                      className="text-center"
                    />
                  </div>
                  <FormInput
                    name="nama_rt"
                    value={formData.nama_rt}
                    onChange={handleChange}
                    placeholder="Abdillah"
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
                    placeholder="Ketua RW. 02"
                    className="text-center"
                  />
                </div>
                <FormInput
                  name="nama_rw"
                  value={formData.nama_rw}
                  onChange={handleChange}
                  placeholder="Syamiliyah"
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
