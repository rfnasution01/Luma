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

export default function SuratKeteranganDomisiliPerusahaan() {
  const { isMobile } = useMobile()
  const [pdfUrl, setPdfUrl] = useState(null)
  const [debounceTimer, setDebounceTimer] = useState(null)

  const [formData, setFormData] = useState({
    logo: '',
    header1: 'Pemerintah Kabupaten Sejahtera',
    header2: 'Kecamatan Daun Hijau',
    header3: 'Kepala Desa Harapan Baru',
    header4: 'Jl. Harapan Raya No. 88, Kota Sejahtera, Kode Pos 67890',

    title: 'SURAT KETERANGAN DOMISILI PERUSAHAAN',
    no_surat: 'Nomor: 003/DPU/XX/YYYY',

    pengantar_1:
      'Kepala Desa Harapan Baru Kecamatan Daun Hijau Kabupaten Sejahtera dengan ini menerangkan bahwa:',

    ul_1: 'Raka Prasetyo',
    ul_2: 'Kota Sejahtera, 14 Februari 1990',
    ul_3: 'Laki-laki',
    ul_4: 'Islam / Indonesia',
    ul_5: '2C11',
    ul_6: 'Jl. Teratai No. 99, RT 03 RW 05, Kel. Harapan Baru, Kec. Sejahtera, Kota Sejahtera',

    pengantar_2:
      'Bahwa benar yang bersangkutan membuka atau memiliki usaha sebagaimana keterangan berikut:',

    ul_7: 'PT Angin Segar Nusantara',
    ul_8: 'Usaha Kedai Kopi',
    ul_9: 'Jl. Melodi Pagi No. 7, Kota Lestari',
    ul_10: 'Milik Pribadi',
    ul_11: 'Jasa Kuliner',
    ul_12: `${dayjs().locale('id').format('DD MMMM YYYY')}`,
    ul_13: 'Ardiansyah, S.H., M.Kn.',
    ul_14: '01. Tanggal 5 Maret 2030',
    ul_15: '42 Orang',
    ul_16: 'Raka',

    penutup:
      'Demikian surat keterangan domisili perusahaan ini dibuat untuk dipergunakan sebagaimana mestinya dan berlaku sampai tanggal "29 Februari 2045".',

    ttd_ybs: 'Tanda tangan Pemohon',

    alamat_tanggal: `Kota Sejahtera, ${dayjs().locale('id').format('DD MMMM YYYY')}`,

    jabatan_penandatangan: 'Kepala Desa Harapan Baru',
    nama_penandatangan: 'Hendra Wijaya',
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
      .download('skd-perusahaan.pdf')
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
          Surat Keterangan Domisili Perusahaan
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
                  placeholder="Pemerintah Kabupaten Sejahtera"
                  className="text-center text-[2.8rem] font-bold"
                />
                <FormInput
                  name="header2"
                  value={formData.header2}
                  onChange={handleChange}
                  placeholder="Kecamatan Daun Hijau"
                  className="text-center text-[2.4rem]"
                />
                <FormInput
                  name="header3"
                  value={formData.header3}
                  onChange={handleChange}
                  placeholder="Kepala Desa Harapan Baru"
                  className="text-center text-[2.4rem]"
                />
                <FormInput
                  name="header4"
                  value={formData.header4}
                  onChange={handleChange}
                  placeholder="Jl. Harapan Raya No. 88, Kota Sejahtera, Kode Pos 67890"
                  className="text-center"
                />
              </div>
            </div>

            <div className="mt-[4rem] flex flex-col items-center justify-center">
              <FormInput
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="SURAT KETERANGAN DOMISILI PERUSAHAAN"
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
                placeholder="Kepala Desa Harapan Baru Kecamatan Daun Hijau Kabupaten Sejahtera dengan ini menerangkan bahwa:"
              />
              <table className="w-full table-auto">
                <tbody>
                  <tr>
                    <td className="w-[40%] pr-4 align-top">Nama</td>
                    <td>
                      :{' '}
                      <FormInput
                        name="ul_1"
                        value={formData.ul_1}
                        onChange={handleChange}
                        placeholder="Raka Prasetyo"
                        className="w-[60%]"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="pr-4 align-top">Tempat, Tanggal Lahir</td>
                    <td>
                      :{' '}
                      <FormInput
                        name="ul_2"
                        value={formData.ul_2}
                        onChange={handleChange}
                        placeholder="Kota Sejahtera, 14 Februari 1990"
                        className="w-[60%]"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="pr-4 align-top">Jenis Kelamin</td>
                    <td>
                      :{' '}
                      <FormInput
                        name="ul_3"
                        value={formData.ul_3}
                        onChange={handleChange}
                        placeholder="Laki-laki"
                        className="w-[60%]"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="pr-4 align-top">Agama / Bangsa</td>
                    <td>
                      :{' '}
                      <FormInput
                        name="ul_4"
                        value={formData.ul_4}
                        onChange={handleChange}
                        placeholder="Islam / Indonesia"
                        className="w-[60%]"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="pr-4 align-top">KTP</td>
                    <td>
                      :{' '}
                      <FormInput
                        name="ul_5"
                        value={formData.ul_5}
                        onChange={handleChange}
                        placeholder="2C11"
                        className="w-[60%]"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="pr-4 align-top">Alamat</td>
                    <td>
                      :{' '}
                      <FormInput
                        name="ul_6"
                        value={formData.ul_6}
                        onChange={handleChange}
                        placeholder="Jl. Teratai No. 99, RT 03 RW 05, Kel. Harapan Baru, Kec. Sejahtera, Kota Sejahtera"
                        className="w-[60%]"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-[4rem] flex flex-col gap-24">
              <FormTextArea
                name="pengantar_2"
                value={formData.pengantar_2}
                onChange={handleChange}
                rows={isMobile ? 2 : 1}
                placeholder="Bahwa benar yang bersangkutan membuka atau memiliki usaha sebagaimana keterangan berikut:"
              />
              <table className="w-full table-auto">
                <tbody>
                  <tr>
                    <td className="w-[40%] pr-4 align-top">Nama Perusahaan</td>
                    <td>
                      :{' '}
                      <FormInput
                        name="ul_7"
                        value={formData.ul_7}
                        onChange={handleChange}
                        placeholder="PT Angin Segar Nusantara"
                        className="w-[60%]"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="pr-4 align-top">
                      Jenis Usaha / Klasifikasi
                    </td>
                    <td>
                      :{' '}
                      <FormInput
                        name="ul_8"
                        value={formData.ul_8}
                        onChange={handleChange}
                        placeholder="Usaha Kedai Kopi"
                        className="w-[60%]"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="pr-4 align-top">Alamat Perusahaan</td>
                    <td>
                      :{' '}
                      <FormInput
                        name="ul_9"
                        value={formData.ul_9}
                        onChange={handleChange}
                        placeholder="Jl. Melodi Pagi No. 7, Kota Lestari"
                        className="w-[60%]"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="pr-4 align-top">Status Bangunan</td>
                    <td>
                      :{' '}
                      <FormInput
                        name="ul_10"
                        value={formData.ul_10}
                        onChange={handleChange}
                        placeholder="Milik Pribadi"
                        className="w-[60%]"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="pr-4 align-top">Peruntukan Bangunan</td>
                    <td>
                      :{' '}
                      <FormInput
                        name="ul_11"
                        value={formData.ul_11}
                        onChange={handleChange}
                        placeholder="Jasa Kuliner"
                        className="w-[60%]"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="pr-4 align-top">No & Tgl. IPB</td>
                    <td>
                      :{' '}
                      <FormInput
                        name="ul_12"
                        value={formData.ul_12}
                        onChange={handleChange}
                        placeholder="123/IPB/2025 - 14 Mei 2025"
                        className="w-[60%]"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="pr-4 align-top">
                      Notaris Akta Pendirian Bangunan
                    </td>
                    <td>
                      :{' '}
                      <FormInput
                        name="ul_13"
                        value={formData.ul_13}
                        onChange={handleChange}
                        placeholder="Ardiansyah, S.H., M.Kn."
                        className="w-[60%]"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="pr-4 align-top">
                      Nomor Akta Pendirian Bangunan
                    </td>
                    <td>
                      :{' '}
                      <FormInput
                        name="ul_14"
                        value={formData.ul_14}
                        onChange={handleChange}
                        placeholder="01. Tanggal 5 Maret 2030"
                        className="w-[60%]"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="pr-4 align-top">Jumlah Karyawan</td>
                    <td>
                      :{' '}
                      <FormInput
                        name="ul_15"
                        value={formData.ul_15}
                        onChange={handleChange}
                        placeholder="42 Orang"
                        className="w-[60%]"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="pr-4 align-top">
                      Penanggung Jawab / Pimpinan Perusahaan
                    </td>
                    <td>
                      :{' '}
                      <FormInput
                        name="ul_16"
                        value={formData.ul_16}
                        onChange={handleChange}
                        placeholder="Raka"
                        className="w-[60%]"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-[4rem] flex flex-col gap-24">
              <FormTextArea
                name="penutup"
                value={formData.penutup}
                onChange={handleChange}
                rows={isMobile ? 3 : 2}
                placeholder='Demikian surat keterangan domisili perusahaan ini dibuat untuk dipergunakan sebagaimana mestinya dan berlaku sampai tanggal "29 Februari 2045".'
              />
            </div>

            <div className="mt-[4rem] flex w-full flex-row items-start justify-between gap-32">
              <div className="flex w-1/3 flex-col justify-center gap-80 phones:w-2/5">
                <div className="flex flex-col gap-12">
                  <FormInput
                    name="ttd_ybs"
                    value={formData.ttd_ybs}
                    onChange={handleChange}
                    placeholder="Tanda tangan Pemohon"
                    className="text-center"
                  />
                </div>
              </div>
              <div className="flex w-1/3 flex-col justify-center gap-80 phones:w-2/5">
                <div className="flex flex-col gap-12">
                  <FormInput
                    name="alamat_tanggal"
                    value={formData.alamat_tanggal}
                    onChange={handleChange}
                    placeholder={`Kota Sejahtera, ${dayjs().locale('id').format('DD MMMM YYYY')}`}
                    className="text-center"
                  />
                  <FormInput
                    name="jabatan_penandatangan"
                    value={formData.jabatan_penandatangan}
                    onChange={handleChange}
                    placeholder="Kepala Desa Harapan Baru"
                    className="text-center"
                  />
                </div>
                <FormInput
                  name="nama_penandatangan"
                  value={formData.nama_penandatangan}
                  onChange={handleChange}
                  placeholder="Hendra Wijaya"
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
