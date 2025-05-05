import { Toaster } from 'react-hot-toast'
import { useLoading } from '@/hooks/useLoading'
import { DialogLoading } from '@/components/feedback/dialogComponents'
import { Outlet } from 'react-router-dom'
import { ErrorBoundary } from '../pages/errorPage/errorBoundary'
import ErrorPage from '@/pages/errorPage'
import Header from './components/header'

export default function MainLayout() {
  const { isLoading, setIsLoading } = useLoading()

  return (
    <div className="scrollbar flex h-screen w-full flex-col gap-32 overflow-auto bg-white text-left font-jakarta text-[2rem] font-light leading-[1.3]">
      <Header />
      <ErrorBoundary fallback={<ErrorPage />}>
        <Outlet />
      </ErrorBoundary>
      <Toaster position="top-right" reverseOrder={true} />
      <DialogLoading isOpen={isLoading} setIsOpen={setIsLoading} />
    </div>
  )
}
