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
    logo: '',

    header1: 'KEMENTERIAN KEUANGAN REPUBLIK INDONESIA',
    header2: 'DIREKTORAT JENDERAL PERBENDAHARAAN',
    header3: 'KANTOR PELAYANAN PERBENDAHARAAN NEGARA SIBOLGA',
    header4:
      'Jl. Dr. FL. Tobing No. 5, Sibolga, Sumatera Utara, Kode Pos 22522',

    title: 'SURAT PERNYATAAN KESANGGUPAN',

    pengantar1: 'Yang bertanda tangan dibawah :',

    ul_1: 'Syamil Wahyudi',
    ul_2: 'Bekasi, 1 Januari 2000',
    ul_3: 'Manajer Keuangan',

    pengantar2: 'Menyatakan dengan sesungguhnya bahwa:',
    li_1: 'Sanggup untuk menyelesaikan 100% pekerjaan sebagaimana tertuang dalam surat perjanjian kerja Nomor 012/SPK/PPK-2024 tanggal 12 Januari 2024 dengan nilai kontrak sebesar : Rp250.000.000 (Dua Ratus Lima Puluh Juta Rupiah) selambat-lambatnya pada tanggal 30 Juni 2024.',

    li_2: 'Apabila ternyata sampai batas waktu yang telah ditentukan wanprestasi/tidak dapat menyelesaikan pekerjaan atau PPK tidak menyampaikan BAPP paling lambat 10 (sepuluh) hari kerja setelah berakhirnya masa kontrak, maka Jaminan/Garansi Bank kami yang diterbitkan oleh Bank Mandiri Nomor 123/GAR/001/2024 Tanggal 10 Januari 2024 sebesar Rp25.000.000 (Dua Puluh Lima Juta Rupiah) dapat dicairkan oleh Kepala KPPN Sibolga sebesar nilai pekerjaan yang dinyatakan wanprestasi/pekerjaan tidak dapat diselesaikan untuk disetor ke Kas Negara.',

    li_3: 'Surat Pernyataan Kesanggupan ini dibuat dalam rangka pengajuan pembayaran atas pekerjaan tersebut pada angka 1 yang belum 100% selesai pada saat surat pernyataan kesanggupan ini dibuat.',

    memberitahukan_1:
      'Demikian pernyataan ini kami buat dengan sebenar-benarnya.',

    mengetahui: 'Mengetahui',
    pejabat: 'Pejabat Pembuat Komitmen ',
    nama_pejabat: 'Abdillah',
    nip: '123123123123',

    tanggal_ttd: `Jakarta, ${dayjs().locale('id').format('DD MMMM YYYY')}`,
    rekanan: 'Rekanan',
    nama_rekanan: 'Syamiliyah',
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
          Surat Keterangan Domisili Pengantar RT
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
                  placeholder="KEMENTERIAN KEUANGAN REPUBLIK INDONESIA"
                  className="text-center text-[2.8rem] font-bold"
                />
                <FormInput
                  name="header2"
                  value={formData.header2}
                  onChange={handleChange}
                  placeholder="DIREKTORAT JENDERAL PERBENDAHARAAN"
                  className="text-center text-[2.4rem]"
                />
                <FormInput
                  name="header3"
                  value={formData.header3}
                  onChange={handleChange}
                  placeholder="KANTOR PELAYANAN PERBENDAHARAAN NEGARA SIBOLGA"
                  className="text-center text-[2.4rem]"
                />
                <FormInput
                  name="header4"
                  value={formData.header4}
                  onChange={handleChange}
                  placeholder="Jl. Dr. FL. Tobing No. 5, Sibolga, Sumatera Utara, Kode Pos 22522"
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
            </div>

            <div className="mt-[4rem] flex flex-col gap-4">
              <FormTextArea
                name="pengantar1"
                value={formData.pengantar1}
                onChange={handleChange}
                rows={isMobile ? 2 : 1}
                placeholder="Yang bertanda tangan dibawah :"
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
                    Alamat
                  </td>
                  <td>
                    :{' '}
                    <FormInput
                      name="ul_2"
                      value={formData.ul_2}
                      onChange={handleChange}
                      placeholder="Bekasi, 1 Januari 2000"
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
                      name="ul_3"
                      className="w-[80%] phones:w-[60%]"
                      value={formData.ul_3}
                      onChange={handleChange}
                      placeholder="Manajer Keuangan"
                    />
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="mt-[4rem] flex flex-col gap-24">
              <FormTextArea
                name="pengantar2"
                value={formData.pengantar2}
                onChange={handleChange}
                rows={isMobile ? 2 : 1}
                placeholder="Menyatakan dengan sesungguhnya bahwa:"
              />
              <ul className="list-disc pl-24">
                <li>
                  <FormTextArea
                    name="li_1"
                    value={formData.li_1}
                    className="w-full align-top"
                    onChange={handleChange}
                    rows={isMobile ? 6 : 3}
                    placeholder="Sanggup untuk menyelesaikan 100% pekerjaan sebagaimana tertuang dalam surat perjanjian kerja Nomor 012/SPK/PPK-2024 tanggal 12 Januari 2024 dengan nilai kontrak sebesar : Rp250.000.000 (Dua Ratus Lima Puluh Juta Rupiah) selambat-lambatnya pada tanggal 30 Juni 2024."
                  />
                </li>
                <li>
                  <FormTextArea
                    name="li_2"
                    value={formData.li_2}
                    className="w-full align-top"
                    onChange={handleChange}
                    rows={isMobile ? 12 : 6}
                    placeholder="Apabila ternyata sampai batas waktu yang telah ditentukan wanprestasi/tidak dapat menyelesaikan pekerjaan atau PPK tidak menyampaikan BAPP paling lambat 10 (sepuluh) hari kerja setelah berakhirnya masa kontrak, maka Jaminan/Garansi Bank kami yang diterbitkan oleh Bank Mandiri Nomor 123/GAR/001/2024 Tanggal 10 Januari 2024 sebesar Rp25.000.000 (Dua Puluh Lima Juta Rupiah) dapat dicairkan oleh Kepala KPPN Sibolga sebesar nilai pekerjaan yang dinyatakan wanprestasi/pekerjaan tidak dapat diselesaikan untuk disetor ke Kas Negara."
                  />
                </li>
                <li>
                  <FormTextArea
                    name="li_3"
                    value={formData.li_3}
                    className="w-full align-top"
                    onChange={handleChange}
                    rows={isMobile ? 6 : 3}
                    placeholder="Surat Pernyataan Kesanggupan ini dibuat dalam rangka pengajuan pembayaran atas pekerjaan tersebut pada angka 1 yang belum 100% selesai pada saat surat pernyataan kesanggupan ini dibuat."
                  />
                </li>
              </ul>
            </div>

            <div className="mt-[4rem] flex flex-col gap-24">
              <FormTextArea
                name="memberitahukan_1"
                value={formData.memberitahukan_1}
                onChange={handleChange}
                rows={isMobile ? 2 : 1}
                placeholder="Demikian pernyataan ini kami buat dengan sebenar-benarnya."
              />
            </div>

            <div className="mt-[4rem] flex items-start justify-between gap-32">
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
                    name="pejabat"
                    value={formData.pejabat}
                    onChange={handleChange}
                    placeholder="Pejabat Pembuat Komitmen "
                    className="text-center"
                  />
                </div>
                <div className="flex flex-col gap-12">
                  <FormInput
                    name="nama_pejabat"
                    value={formData.nama_pejabat}
                    onChange={handleChange}
                    placeholder="Abdillah"
                    className="text-center"
                  />
                  <FormInput
                    name="nip"
                    value={formData.nip}
                    onChange={handleChange}
                    placeholder="123123123123"
                    className="text-center"
                  />
                </div>
              </div>
              <div className="flex flex-col justify-center gap-80">
                <div className="flex flex-col justify-center gap-80">
                  <div className="flex flex-col gap-12">
                    <FormInput
                      name="tanggal_ttd"
                      value={formData.tanggal_ttd}
                      onChange={handleChange}
                      placeholder={`Jakarta, ${dayjs().locale('id').format('DD MMMM YYYY')}`}
                      className="text-center"
                    />
                    <FormInput
                      name="rekanan"
                      value={formData.rekanan}
                      onChange={handleChange}
                      placeholder="Rekanan"
                      className="text-center"
                    />
                  </div>
                  <FormInput
                    name="nama_rekanan"
                    value={formData.nama_rekanan}
                    onChange={handleChange}
                    placeholder="Abdillah"
                    className="Syamiliyah"
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
