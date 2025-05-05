import { useNavigate } from 'react-router-dom'
import Navigation from './navigation'
import UserProfile from './userProfil'

export default function Header() {
  const navigate = useNavigate()

  return (
    <div className="flex w-full justify-between gap-32 border-b px-[16rem] py-16 shadow-sm phones:px-32">
      <img
        src="/logo.png"
        alt="Luma"
        className="h-[6rem]"
        loading="eager"
        onClick={() => navigate('/')}
      />
      <Navigation />
      <UserProfile />
    </div>
  )
}
