import { useNavigate } from 'react-router-dom'
import Navigation from './navigation'
import UserProfile from './userProfil'
import { usePathname } from '@/hooks/usePathname'
import { ChevronLeft } from 'lucide-react'

export default function Header() {
  const navigate = useNavigate()
  const { splittedPath } = usePathname()

  return (
    <div className="flex w-full items-center justify-between gap-32 border-b px-[16rem] py-16 shadow-sm phones:px-32">
      <div
        onClick={() => {
          if (splittedPath?.length >= 3) {
            navigate('/surat')
          } else {
            navigate('/')
          }
        }}
        className="group flex cursor-pointer items-center justify-center gap-12"
      >
        {splittedPath?.length >= 3 ? (
          <>
            <span className="border p-4 shadow-sm transition-shadow duration-300 group-hover:shadow-md">
              <ChevronLeft size={16} />
            </span>
            <p>Kembali</p>
          </>
        ) : (
          <>
            <img
              src="/favicon/logo.png"
              alt="Luma"
              className="h-[5rem]"
              loading="eager"
              onClick={() => navigate('/')}
            />
            <p className="text-sentra-secondary font-montserrat text-[2.2rem] font-bold uppercase tracking-[0.1em] drop-shadow-md">
              Luma
            </p>
          </>
        )}
      </div>
      <Navigation />
      <UserProfile />
    </div>
  )
}
