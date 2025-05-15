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

    header1: 'PEMERINTAH KABUPATEN SINDARMA',
    header2: 'KECAMATAN TIRTAJAYA',
    header3: 'DESA MEKARWANGI',
    header4: 'Alamat: Jl. Cendana No. 123, Mekarwangi, Tirtajaya 54321',

    title: 'SURAT KETERANGAN BELUM MENIKAH',
    no_surat: 'Nomor: 470/123/DS-MKW/2025',

    pengantar1: 'Yang bertanda tangan di bawah ini :',

    ul_1: 'H. Rahmat Suryana',
    ul_2: 'Kepala Desa Mekarwangi',

    pengantar2: 'Dengan ini menerangkan bahwa :',

    ul_3: 'Dimas Aryaputra',
    ul_4: 'Laki-laki',
    ul_5: 'Mekarwangi, 10 Februari 1998',
    ul_6: 'Islam',
    ul_7: 'Wiraswasta',
    ul_8: '3210123456780001',
    ul_9: 'Jl. Kenanga No. 45, RT 02/RW 04, Desa Mekarwangi',

    pengantar3:
      'Menurut pendataan kami di desa dan berdasarkan pernyataan yang bersangkutan, bahwa :',

    ul_10: 'Bapak Wira Atmaja',
    ul_11: 'Laki-laki',
    ul_12: 'Tirtajaya, 15 Maret 1972',
    ul_13: 'Orang Tua',

    memberitahukan_1:
      'yang bersangkutan belum pernah menikah dan masih berstatus lajang.',
    memberitahukan_2:
      'Surat keterangan ini diberikan sebagai kelengkapan persyaratan administrasi sesuai permintaan yang bersangkutan.',
    memberitahukan_3:
      'Demikian surat keterangan ini dibuat agar dapat dipergunakan sebagaimana mestinya.',

    alamat_tanggal: `Tirtajaya, ${dayjs().locale('id').format('DD MMMM YYYY')}`,

    jabatan_penandatangan: 'Kepala Desa Mekarwangi',
    nama_penandatangan: 'H. Rahmat Suryana',
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
                  placeholder="PEMERINTAH KABUPATEN SINDARMA"
                  className="text-center text-[2.8rem] font-bold"
                />
                <FormInput
                  name="header2"
                  value={formData.header2}
                  onChange={handleChange}
                  placeholder="KECAMATAN TIRTAJAYA"
                  className="text-center text-[2.4rem]"
                />
                <FormInput
                  name="header3"
                  value={formData.header3}
                  onChange={handleChange}
                  placeholder="DESA MEKARWANGI"
                  className="text-center text-[2.4rem]"
                />
                <FormInput
                  name="header4"
                  value={formData.header4}
                  onChange={handleChange}
                  placeholder="Alamat: Jl. Cendana No. 123, Mekarwangi, Tirtajaya 54321"
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
                rows={isMobile ? 2 : 1}
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
                        placeholder="H. Rahmat Suryana"
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
                        placeholder="Kepala Desa Mekarwangi"
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
                rows={isMobile ? 2 : 1}
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
                        placeholder="Dimas Aryaputra"
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
                        placeholder="Mekarwangi, 10 Februari 1998"
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
                        placeholder="Wiraswasta"
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
                        placeholder="3210123456780001"
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
                        placeholder="Jl. Kenanga No. 45, RT 02/RW 04, Desa Mekarwangi"
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
                rows={isMobile ? 2 : 1}
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
                        placeholder="Bapak Wira Atmaja"
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
                        placeholder="Tirtajaya, 15 Maret 1972"
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
                        placeholder="Orang Tua"
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
                placeholder="yang bersangkutan belum pernah menikah dan masih berstatus lajang."
              />
              <FormTextArea
                name="memberitahukan_2"
                value={formData.memberitahukan_2}
                onChange={handleChange}
                rows={isMobile ? 3 : 2}
                placeholder="Surat keterangan ini diberikan sebagai kelengkapan persyaratan administrasi sesuai permintaan yang bersangkutan."
              />
              <FormTextArea
                name="memberitahukan_3"
                value={formData.memberitahukan_3}
                onChange={handleChange}
                placeholder="Demikian surat keterangan ini dibuat agar dapat dipergunakan sebagaimana mestinya."
                rows={isMobile ? 2 : 1}
              />
            </div>

            <div className="mt-[4rem] flex flex-col items-end justify-center gap-80">
              <div className="flex w-1/3 flex-col gap-80 phones:w-2/5">
                <div className="flex flex-col gap-12">
                  <FormInput
                    name="alamat_tanggal"
                    value={formData.alamat_tanggal}
                    onChange={handleChange}
                    placeholder={`Tirtajaya, ${dayjs().locale('id').format('DD MMMM YYYY')}`}
                    className="text-center"
                  />
                  <FormInput
                    name="jabatan_penandatangan"
                    value={formData.jabatan_penandatangan}
                    onChange={handleChange}
                    placeholder="Kepala Desa Mekarwangi"
                    className="text-center"
                  />
                </div>
                <FormInput
                  name="nama_penandatangan"
                  value={formData.nama_penandatangan}
                  onChange={handleChange}
                  placeholder="H. Rahmat Suryana"
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
