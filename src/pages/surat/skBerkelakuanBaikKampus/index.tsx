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

export default function SuratKeteranganBerkelakuanBaikKampus() {
  const { isMobile } = useMobile()
  const [pdfUrl, setPdfUrl] = useState(null)
  const [debounceTimer, setDebounceTimer] = useState(null)

  const [formData, setFormData] = useState({
    logo: '',
    header1: 'Departemen Pendidikan Nasional',
    header2: 'Universitas Riau Pekanbaru',
    header3: 'Fakultas Keguruan dan Ilmu Pendidikan',
    header4:
      'Alamat: Kampus Bina Widya Simpang Baru - Pekanbaru Telp. (0761) 63267 Fax. (0761) 65804',

    title:
      'SURAT KETERANGAN BERKELAKUAN BAIK DAN TIDAK PERNAH MELANGGAR TATA TERTIB KAMPUS',
    no_surat: 'Nomor: RT/RW/No/XX/YYYY',

    pengantar_1:
      'Dekan Fakultas Keguruan dan Ilmu Pendidikan Universitas Riau Pekanbaru dengan ini menerangkan bahwa:',

    ul_1: 'Syamil Wahyudi',
    ul_2: 'Bandung, 12 Januari 1995',
    ul_3: '0123456789',
    ul_4: 'Nama Jurusan',
    ul_5: 'Nama Program Studi',
    ul_6: 'Nama Program',
    ul_7: 'Alamat',

    penutup_1:
      'Adalah sepengetahuan kami belum pernah melanggar tata tertib kampus dan bekelakuan baik. Surat keterangan ini diberikan untuk keperluan Persyaratan Beasiswa PPA',
    penutup_2:
      'Demikianlah Surat Keterangan ini kami buat dengan sesungguhnya untuk dapat dipergunakan sebagaimana mestinya.',

    dikeluarkan: 'Dikeluarkan di: Pekanbaru',
    tanggal: `Pada Tanggal: ${dayjs().locale('id').format('DD MMMM YYYY')}`,
    dekan: 'An. Dekan',
    jabatan: 'Pembantu Dekan III',

    nama: 'Abdillah',
    nip: '0123456789',
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
      .download('sk-berkelakuan-baik-kampus.pdf')
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
          SURAT KETERANGAN BERKELAKUAN BAIK DAN TIDAK PERNAH MELANGGAR TATA
          TERTIB KAMPUS
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
                  placeholder="SURAT KETERANGAN BERKELAKUAN BAIK DAN TIDAK PERNAH MELANGGAR TATA TERTIB KAMPUS"
                  className="text-center text-[2.8rem] font-bold"
                />
                <FormInput
                  name="header2"
                  value={formData.header2}
                  onChange={handleChange}
                  placeholder="Universitas Riau Pekanbaru"
                  className="text-center text-[2.4rem]"
                />
                <FormInput
                  name="header3"
                  value={formData.header3}
                  onChange={handleChange}
                  placeholder="Fakultas Keguruan dan Ilmu Pendidikan"
                  className="text-center text-[2.4rem]"
                />
                <FormInput
                  name="header4"
                  value={formData.header4}
                  onChange={handleChange}
                  placeholder="Alamat: Kampus Bina Widya Simpang Baru - Pekanbaru Telp. (0761) 63267 Fax. (0761) 65804"
                  className="text-center"
                />
              </div>
            </div>

            <div className="mt-[4rem] flex flex-col items-center justify-center">
              <FormTextArea
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="SURAT KETERANGAN BERKELAKUAN BAIK DAN TIDAK PERNAH MELANGGAR TATA TERTIB KAMPUS"
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
                placeholder="Dekan Fakultas Keguruan dan Ilmu Pendidikan Universitas Riau Pekanbaru dengan ini menerangkan bahwa:"
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
                        placeholder="Syamil Wahyudi"
                        className="w-[60%]"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="pr-4 align-top">Tempat/Tgl. Lahir</td>
                    <td>
                      :{' '}
                      <FormInput
                        name="ul_2"
                        value={formData.ul_2}
                        onChange={handleChange}
                        placeholder="Bandung, 12 Januari 1995"
                        className="w-[60%]"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="pr-4 align-top">NIM</td>
                    <td>
                      :{' '}
                      <FormInput
                        name="ul_3"
                        value={formData.ul_3}
                        onChange={handleChange}
                        placeholder="0123456789"
                        className="w-[60%]"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="pr-4 align-top">Jurusan</td>
                    <td>
                      :{' '}
                      <FormInput
                        name="ul_4"
                        value={formData.ul_4}
                        onChange={handleChange}
                        placeholder="Nama Jurusan"
                        className="w-[60%]"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="pr-4 align-top">Program Studi</td>
                    <td>
                      :{' '}
                      <FormInput
                        name="ul_5"
                        value={formData.ul_5}
                        onChange={handleChange}
                        placeholder="Nama Program Studi"
                        className="w-[60%]"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="pr-4 align-top">Program</td>
                    <td>
                      :{' '}
                      <FormInput
                        name="ul_6"
                        value={formData.ul_6}
                        onChange={handleChange}
                        placeholder="Nama Program"
                        className="w-[60%]"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="pr-4 align-top">Alamat</td>
                    <td>
                      :{' '}
                      <FormInput
                        name="ul_7"
                        value={formData.ul_7}
                        onChange={handleChange}
                        placeholder="Alamat"
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
                rows={isMobile ? 4 : 2}
                placeholder="Adalah sepengetahuan kami belum pernah melanggar tata tertib kampus dan bekelakuan baik. Surat keterangan ini diberikan untuk keperluan Persyaratan Beasiswa PPA"
              />
              <FormTextArea
                name="penutup_2"
                value={formData.penutup_2}
                onChange={handleChange}
                rows={isMobile ? 4 : 2}
                placeholder="Demikianlah Surat Keterangan ini kami buat dengan sesungguhnya untuk dapat dipergunakan sebagaimana mestinya."
              />
            </div>

            <div className="mt-[4rem] flex flex-row items-start justify-end gap-32">
              <div className="flex flex-col justify-center gap-80">
                <div className="flex flex-col gap-12">
                  <FormInput
                    name="dikeluarkan"
                    value={formData.dikeluarkan}
                    onChange={handleChange}
                    placeholder={`Dikeluarkan di: Pekanbaru`}
                  />
                  <FormInput
                    name="tanggal"
                    value={formData.tanggal}
                    onChange={handleChange}
                    placeholder={`Pada tanggal: ${dayjs().locale('id').format('DD MMMM YYYY')}`}
                  />
                  <FormInput
                    name="dekan"
                    value={formData.dekan}
                    onChange={handleChange}
                    placeholder="An. Dekan"
                  />
                  <FormInput
                    name="jabatan"
                    value={formData.jabatan}
                    onChange={handleChange}
                    placeholder="Pembantu Dekan III"
                  />
                </div>
                <div className="flex flex-col gap-12">
                  <FormInput
                    name="nama"
                    value={formData.nama}
                    onChange={handleChange}
                    placeholder="Abdillah"
                    className="text-center"
                  />
                  <FormInput
                    name="nip"
                    value={formData.nip}
                    onChange={handleChange}
                    placeholder="0123456789"
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
