import { useEffect, useState } from 'react'
import { ErrorPage, MaintenancePage, NoInternetPage } from '@/routes/loadables'
import { Outlet } from 'react-router-dom'
import { ErrorBoundary } from './errorBoundary'
import { Toaster } from 'react-hot-toast'
import { useLoading } from '@/hooks/useLoading'
import { DialogLoading } from '@/components/feedback/dialogComponents'

const baseMaintenance = import.meta.env.VITE_BASE_MAINTENANCE

export default function MainLayout() {
  const [isOffline, setIsOffline] = useState(!navigator.onLine)
  const isMaintenance = baseMaintenance === 'YES'

  useEffect(() => {
    const handleOnline = () => setIsOffline(false)
    const handleOffline = () => setIsOffline(true)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  const { isLoading, setIsLoading } = useLoading()

  return (
    <div className="scrollbar font-jakarta h-screen w-full overflow-auto text-left text-[2rem] font-light leading-[1.6]">
      {isOffline ? (
        <NoInternetPage />
      ) : isMaintenance ? (
        <MaintenancePage />
      ) : (
        <ErrorBoundary fallback={<ErrorPage />}>
          <Outlet />
        </ErrorBoundary>
      )}

      <Toaster position="top-right" reverseOrder={true} />

      <DialogLoading isOpen={isLoading} setIsOpen={setIsLoading} />
    </div>
  )
}
