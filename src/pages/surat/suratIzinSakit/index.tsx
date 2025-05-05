import { useEffect, useState } from 'react'
import pdfMake from 'pdfmake/build/pdfmake'
import * as pdfFonts from 'pdfmake/build/vfs_fonts'
import DocumentActions from './components/documentAction'

pdfMake.vfs = pdfFonts.vfs

export default function SuratIzinSakitPage() {
  const [pdfUrl, setPdfUrl] = useState(null)
  const [debounceTimer, setDebounceTimer] = useState(null)

  const [formData, setFormData] = useState({
    title: 'SURAT IZIN SAKIT',
    kepada_1: 'Kepada Yth.',
    kepada_2: 'Bapak/Ibu Guru Wali Kelas',
    kepada_3: 'Di Tempat',
    dengan_hormat_1: 'Dengan hormat,',
    dengan_hormat_2: 'Saya yang bertanda tangan di bawah ini:',
    ul_1: `Nama: [Nama Siswa]`,
    ul_2: 'Kelas: [Kelas Siswa]',
    ul_3: 'Sekolah: [Sekolah Siswa]',
    memberitahukan_1: `Dengan ini memberitahukan bahwa saya tidak dapat mengikuti kegiatan belajar mengajar seperti biasa pada hari ini, [Hari, Tanggal], dikarenakan kondisi kesehatan yang kurang baik (sakit).`,
    memberitahukan_2: `Oleh karena itu, saya memohon izin kepada Bapak/Ibu Guru untuk dapat memakluminya.`,
    demikian:
      'Demikian surat ini saya sampaikan. Atas perhatian dan izin yang diberikan, saya ucapkan terima kasih.',
    hormat_saya_1: `Hormat saya,`,
    hormat_saya_2: `[Nama Siswa]`,
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const getDocDefinition = (data) => ({
    content: [
      {
        text: data.title,
        fontSize: 18,
        bold: true,
        alignment: 'center',
        margin: [0, 0, 0, 20],
      },
      {
        text: `${data?.kepada_1}\n${data?.kepada_2}\n${data?.kepada_3}`,
        margin: [0, 0, 0, 20],
      },
      {
        text: `${data?.dengan_hormat_1}\n\n${data?.dengan_hormat_2}`,
        margin: [0, 0, 0, 10],
      },
      {
        ul: [data?.ul_1, data?.ul_2, data?.ul_3],
        margin: [0, 0, 0, 10],
      },
      {
        text: `${data?.memberitahukan_1}\n\n${data?.memberitahukan_2}`,
        margin: [0, 0, 0, 20],
      },
      {
        text: data?.demikian,
        margin: [0, 0, 0, 30],
      },
      {
        columns: [
          {},
          {
            width: 'auto',
            alignment: 'right',
            text: `${data?.hormat_saya_1}\n\n\n\n\n${data?.hormat_saya_2}`,
          },
        ],
      },
    ],
  })

  // Generate PDF and create Blob URL for display
  useEffect(() => {
    // Clear timeout sebelumnya jika ada
    if (debounceTimer) {
      clearTimeout(debounceTimer)
    }

    // Set timeout baru untuk delay 5 detik
    const newTimer = setTimeout(() => {
      const pdfDoc = pdfMake.createPdf(getDocDefinition(formData))
      pdfDoc.getBlob((blob) => {
        const url = URL.createObjectURL(blob)
        setPdfUrl((prevUrl) => {
          if (prevUrl) URL.revokeObjectURL(prevUrl)
          return url
        })
      })
    }, 1000)

    // Simpan timeout id
    setDebounceTimer(newTimer)

    // Cleanup saat komponen unmount atau formData berubah
    return () => {
      clearTimeout(newTimer)
    }
  }, [formData])

  const handleDownload = () => {
    pdfMake
      .createPdf(getDocDefinition(formData))
      .download('surat-izin-sakit.pdf')
  }

  const handlePrint = () => {
    pdfMake.createPdf(getDocDefinition(formData)).print()
  }

  const handleOpen = () => {
    pdfMake.createPdf(getDocDefinition(formData)).open()
  }

  return (
    <div className="scrollbar flex h-full w-full gap-32 overflow-auto phones:flex-col">
      {/* --- Form Untuk Mengubah Data --- */}
      <div className="scrollbar flex h-full w-1/2 flex-col gap-32 overflow-auto phones:w-full">
        <p className="text-[2.8rem] font-medium">Surat Izin Sakit</p>
        <div className="scrollbar flex h-full flex-col gap-24 overflow-auto rounded-2xl border p-[2.4rem]">
          <div className="scrollbar-new flex min-h-[120rem] w-full flex-col gap-16 overflow-auto">
            <div className="mt-[4rem] flex items-center justify-center">
              <input
                type="text"
                name="title"
                placeholder="Judul Surat"
                value={formData.title}
                onChange={handleChange}
                className="border-0 border-b border-gray-400 bg-transparent py-4 text-center text-[2.4rem] font-bold focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div className="mt-[4rem] flex flex-col gap-4">
              <input
                type="text"
                name="kepada_1"
                placeholder="Kepada Yth."
                value={formData.kepada_1}
                onChange={handleChange}
                className="border-b border-gray-300 py-2 focus:border-blue-500 focus:outline-none"
              />
              <input
                type="text"
                name="kepada_2"
                placeholder="Bapak/Ibu Guru Wali Kelas"
                value={formData.kepada_2}
                onChange={handleChange}
                className="border-b border-gray-300 py-2 focus:border-blue-500 focus:outline-none"
              />
              <input
                type="text"
                name="kepada_3"
                placeholder="Di Tempat"
                value={formData.kepada_3}
                onChange={handleChange}
                className="border-b border-gray-300 py-2 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div className="mt-[4rem] flex flex-col gap-24">
              <input
                type="text"
                name="dengan_hormat_1"
                placeholder="Dengan hormat,"
                value={formData.dengan_hormat_1}
                onChange={handleChange}
                className="border-b border-gray-300 py-2 focus:border-blue-500 focus:outline-none"
              />
              <textarea
                name="dengan_hormat_2"
                placeholder="Saya yang bertanda tangan di bawah ini:"
                value={formData.dengan_hormat_2}
                onChange={handleChange}
                className="border-b border-gray-300 py-2 focus:border-blue-500 focus:outline-none"
                rows={2}
              />
            </div>

            <ul className="w-full list-disc pl-32">
              <li>
                <input
                  type="text"
                  name="ul_1"
                  placeholder="Nama: [Nama Siswa]"
                  value={formData.ul_1}
                  onChange={handleChange}
                  className="w-full border-b border-gray-300 py-2 focus:border-blue-500 focus:outline-none"
                />
              </li>
              <li>
                <input
                  type="text"
                  name="ul_2"
                  placeholder="Kelas: [Kelas Siswa]"
                  value={formData.ul_2}
                  onChange={handleChange}
                  className="w-full border-b border-gray-300 py-2 focus:border-blue-500 focus:outline-none"
                />
              </li>
              <li>
                <input
                  type="text"
                  name="ul_3"
                  placeholder="Sekolah: [Sekolah Siswa"
                  value={formData.ul_3}
                  onChange={handleChange}
                  className="w-full border-b border-gray-300 py-2 focus:border-blue-500 focus:outline-none"
                />
              </li>
            </ul>
            <div className="mt-[4rem] flex flex-col gap-24">
              <textarea
                name="memberitahukan_1"
                placeholder="Dengan ini memberitahukan bahwa saya tidak dapat mengikuti kegiatan belajar mengajar seperti biasa pada hari ini, [Hari, Tanggal], dikarenakan kondisi kesehatan yang kurang baik (sakit)."
                value={formData.memberitahukan_1}
                onChange={handleChange}
                className="border-b border-gray-300 py-2 focus:border-blue-500 focus:outline-none"
                rows={3}
              />
              <textarea
                name="memberitahukan_2"
                placeholder="Oleh karena itu, saya memohon izin kepada Bapak/Ibu Guru untuk dapat memakluminya."
                value={formData.memberitahukan_2}
                onChange={handleChange}
                className="border-b border-gray-300 py-2 focus:border-blue-500 focus:outline-none"
                rows={2}
              />
            </div>

            <textarea
              name="demikian"
              placeholder="Demikian surat ini saya sampaikan. Atas perhatian dan izin yang diberikan, saya ucapkan terima kasih."
              value={formData.demikian}
              onChange={handleChange}
              className="border-b border-gray-300 py-2 focus:border-blue-500 focus:outline-none"
              rows={2}
            />

            <div className="flexcol flex flex-col items-end justify-center gap-80">
              <input
                type="text"
                name="hormat_saya_1"
                placeholder="Hormat saya,"
                value={formData.dengan_hormat_1}
                onChange={handleChange}
                className="border-b border-gray-300 py-2 text-center focus:border-blue-500 focus:outline-none"
              />
              <input
                type="text"
                name="hormat_saya_2"
                placeholder="[Nama Siswa]"
                value={formData.hormat_saya_2}
                onChange={handleChange}
                className="border-b border-gray-300 py-2 text-center focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* --- Preview PDF --- */}
      <div className="scrollbar flex h-full w-1/2 flex-col gap-16 overflow-auto phones:w-full">
        <div className="flex items-center justify-between gap-32">
          <p className="text-[2.8rem] font-medium">Preview Dokumen</p>
          <DocumentActions
            onOpen={handleOpen}
            onPrint={handlePrint}
            onDownload={handleDownload}
          />
        </div>

        <div className="scrollbar h-full w-full flex-1 overflow-auto rounded-2xl border border-slate-300">
          {pdfUrl ? (
            <iframe
              src={pdfUrl}
              title="PDF Preview"
              className="h-full w-full"
              style={{ border: 'none' }}
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <p className="text-[2rem] text-slate-500">Loading PDF...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
