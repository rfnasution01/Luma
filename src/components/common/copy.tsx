import { Check, Copy } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'

export function CopyTeks({ idx, kode }: { idx: string; kode: string }) {
  const [copiedIdx, setCopiedIdx] = useState<string | null>(null)

  const handleCopy = (text: string, idx: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedIdx(idx)
      toast.success('Kode lisensi berhasil disalin!') // Opsional
      setTimeout(() => setCopiedIdx(null), 2000) // Reset ikon setelah 2 detik
    })
  }

  return (
    <div className="flex items-center gap-12 text-[1.8rem] text-portal-tertiary">
      <p className="italic">{kode}</p>
      <button
        onClick={() => handleCopy(kode, idx)}
        className="hover:cursor-pointer"
      >
        {copiedIdx === idx ? (
          <Check size={12} className="text-green-500" />
        ) : (
          <Copy size={12} />
        )}
      </button>
    </div>
  )
}
