import { AlignJustify } from 'lucide-react'

export default function UserProfile() {
  return (
    <div className="flex items-center gap-16 rounded-3xl border px-24 py-12 shadow-sm transition-shadow duration-300 hover:cursor-pointer hover:shadow-md">
      <AlignJustify size={14} />
      <div className="h-[3.6rem] w-[3.6rem] rounded-full bg-slate-300" />
    </div>
  )
}
