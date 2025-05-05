import { AlertCircle, Download, Printer } from 'lucide-react'

export default function DocumentActions({ onOpen, onPrint, onDownload }) {
  return (
    <div className="flex items-center gap-16">
      <button
        type="button"
        onClick={onOpen}
        className="flex items-center gap-12 rounded-2xl border border-slate-700 px-16 py-8 font-poppins text-[1.8rem] text-slate-700 hover:bg-slate-500 hover:text-slate-50"
      >
        <AlertCircle size={12} />
        <p>Open</p>
      </button>
      <button
        type="button"
        onClick={onPrint}
        className="flex items-center gap-12 rounded-2xl border border-slate-700 px-16 py-8 font-poppins text-[1.8rem] text-slate-700 hover:bg-slate-500 hover:text-slate-50"
      >
        <Printer size={12} />
        <p>Print</p>
      </button>
      <button
        type="button"
        onClick={onDownload}
        className="flex items-center gap-12 rounded-2xl border border-slate-700 px-16 py-8 font-poppins text-[1.8rem] text-slate-700 hover:bg-slate-500 hover:text-slate-50"
      >
        <Download size={12} />
        <p>Download</p>
      </button>
    </div>
  )
}
