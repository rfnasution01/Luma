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

export default function SuratKeteranganAktifSekolah() {
  const { isMobile } = useMobile()
  const [pdfUrl, setPdfUrl] = useState(null)
  const [debounceTimer, setDebounceTimer] = useState(null)

  const [formData, setFormData] = useState({
    logo: '',
    header1: 'Pemerintah Kabupaten Nirwana',
    header2: 'UPTD Pendidikan Kecamatan Suryalaya',
    header3: 'Sekolah Dasar Negeri 1 Cempaka',
    header4:
      'Jl. Merdeka No. 10, Desa Cempaka, Kec. Suryalaya, Kab. Nirwana 12345',

    title: 'SURAT KETERANGAN',
    no_surat: 'Nomor: 001/SDC/I/2025',

    pengantar_1: 'Yang bertanda tangan di bawah ini:',

    ul_1: 'Drs. Suryana',
    ul_2: '198706152005011003',
    ul_3: 'Pembina / IVa',
    ul_4: 'Kepala Sekolah',
    ul_5: 'SD Negeri 1 Cempaka, UPTD Kec. Suryalaya',

    pengantar_2: 'Dengan ini menerangkan bahwa:',

    ul_6: 'Dimas Pradipta',
    ul_7: 'Suryalaya, 5 Mei 2015',
    ul_8: 'Kelas 3',
    ul_9: '23014567',
    ul_10: 'Dewi Melati',
    ul_11: 'Raka Prasetya',

    penutup_1:
      'Benar-benar masih aktif belajar di Sekolah Dasar Negeri 1 Cempaka.',
    penutup_2: 'Surat ini dibuat untuk digunakan sebagaimana mestinya.',

    tanggal: `${dayjs().locale('id').format('DD MMMM YYYY')}`,
    jabatan: 'Kepala Sekolah,',

    nama: 'Drs. Suryana',
    nip: '198706152005011003',
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
      .download('sk-aktif-sekolah.pdf')
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
          Surat Keterangan Aktif Sekolah
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
                  placeholder="Pemerintah Kabupaten Nirwana"
                  className="text-center text-[2.8rem] font-bold"
                />
                <FormInput
                  name="header2"
                  value={formData.header2}
                  onChange={handleChange}
                  placeholder="UPTD Pendidikan Kecamatan Suryalaya"
                  className="text-center text-[2.4rem]"
                />
                <FormInput
                  name="header3"
                  value={formData.header3}
                  onChange={handleChange}
                  placeholder="Sekolah Dasar Negeri 1 Cempaka"
                  className="text-center text-[2.4rem]"
                />
                <FormInput
                  name="header4"
                  value={formData.header4}
                  onChange={handleChange}
                  placeholder="Jl. Merdeka No. 10, Desa Cempaka, Kec. Suryalaya, Kab. Nirwana 12345"
                  className="text-center"
                />
              </div>
            </div>

            <div className="mt-[4rem] flex flex-col items-center justify-center">
              <FormInput
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="SURAT KETERANGAN"
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
                placeholder="Yang bertanda tangan dibawah ini:"
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
                        placeholder="Drs. Suryana"
                        className="w-[60%]"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="pr-4 align-top">NIP</td>
                    <td>
                      :{' '}
                      <FormInput
                        name="ul_2"
                        value={formData.ul_2}
                        onChange={handleChange}
                        placeholder="198706152005011003"
                        className="w-[60%]"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="pr-4 align-top">Pangkat / Gol. Ruang</td>
                    <td>
                      :{' '}
                      <FormInput
                        name="ul_3"
                        value={formData.ul_3}
                        onChange={handleChange}
                        placeholder="Pembina / IVa"
                        className="w-[60%]"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="pr-4 align-top">Jabatan</td>
                    <td>
                      :{' '}
                      <FormInput
                        name="ul_4"
                        value={formData.ul_4}
                        onChange={handleChange}
                        placeholder="Kepala Sekolah"
                        className="w-[60%]"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="pr-4 align-top">Unit Kerja</td>
                    <td>
                      :{' '}
                      <FormInput
                        name="ul_5"
                        value={formData.ul_5}
                        onChange={handleChange}
                        placeholder="SD Negeri 1 Cempaka, UPTD Kec. Suryalaya"
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
                placeholder="menerangkan bahwa:"
              />
              <table className="w-full table-auto">
                <tbody>
                  <tr>
                    <td className="w-[40%] pr-4 align-top">Nama</td>
                    <td>
                      :{' '}
                      <FormInput
                        name="ul_6"
                        value={formData.ul_6}
                        onChange={handleChange}
                        placeholder="Dimas Pradipta"
                        className="w-[60%]"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="w-[40%] pr-4 align-top">
                      Tempat, Tanggal Lahir
                    </td>
                    <td>
                      :{' '}
                      <FormInput
                        name="ul_7"
                        value={formData.ul_7}
                        onChange={handleChange}
                        placeholder="Suryalaya, 5 Mei 2015"
                        className="w-[60%]"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="pr-4 align-top">Kelas</td>
                    <td>
                      :{' '}
                      <FormInput
                        name="ul_8"
                        value={formData.ul_8}
                        onChange={handleChange}
                        placeholder="Kelas 3"
                        className="w-[60%]"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="pr-4 align-top">NISN</td>
                    <td>
                      :{' '}
                      <FormInput
                        name="ul_9"
                        value={formData.ul_9}
                        onChange={handleChange}
                        placeholder="23014567"
                        className="w-[60%]"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="pr-4 align-top">Nama Ibu</td>
                    <td>
                      :{' '}
                      <FormInput
                        name="ul_10"
                        value={formData.ul_10}
                        onChange={handleChange}
                        placeholder="Dewi Melati"
                        className="w-[60%]"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="pr-4 align-top">Nama Ayah</td>
                    <td>
                      :{' '}
                      <FormInput
                        name="ul_11"
                        value={formData.ul_11}
                        onChange={handleChange}
                        placeholder="Raka Prasetya"
                        className="w-[60%]"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-[4rem] flex flex-col gap-12">
              <FormTextArea
                name="penutup_1"
                value={formData.penutup_1}
                onChange={handleChange}
                rows={isMobile ? 2 : 1}
                placeholder="Benar-benar masih aktif belajar di Sekolah Dasar Negeri 1 Cempaka."
              />
              <FormTextArea
                name="penutup_2"
                value={formData.penutup_2}
                onChange={handleChange}
                rows={isMobile ? 2 : 1}
                placeholder="Surat Keterangan ini dibuat agar digunakan seperlunya."
              />
            </div>

            <div className="mt-[4rem] flex flex-row items-start justify-end gap-32">
              <div className="flex flex-col justify-center gap-80">
                <div className="flex flex-col gap-12">
                  <FormInput
                    name="tanggal"
                    value={formData.tanggal}
                    onChange={handleChange}
                    placeholder={`${dayjs().locale('id').format('DD MMMM YYYY')}`}
                    className="text-center"
                  />
                  <FormInput
                    name="jabatan"
                    value={formData.jabatan}
                    onChange={handleChange}
                    placeholder="Kepala Sekolah,"
                    className="text-center"
                  />
                </div>
                <div className="flex flex-col gap-12">
                  <FormInput
                    name="nama"
                    value={formData.nama}
                    onChange={handleChange}
                    placeholder="Drs. Suryana"
                    className="text-center"
                  />
                  <FormInput
                    name="nip"
                    value={formData.nip}
                    onChange={handleChange}
                    placeholder="198706152005011003"
                    className="text-center"
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
