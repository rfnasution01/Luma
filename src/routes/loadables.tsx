// Import the 'loadable' function from '@loadable/component' to dynamically load components
import LoadingFallbackPage from '@/pages/loadingPage'
import loadable from '@loadable/component'

// Dynamically import the MainLayout component from the 'layout' page
// This component will be loaded only when needed (e.g., when navigating to the page)
export const MainLayout = loadable(() => import('@/layout'))

// Dynamically import the HomePage component from the 'homepage' page
// This ensures the homepage is loaded only when the user visits it, improving initial load performance
export const HomePage = loadable(
  () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(import('@/pages/homepage'))
      }, 1000) // Delay 1 seconds before resolving the import
    })
  },
  {
    fallback: <LoadingFallbackPage />, // Show the fallback loading page during the delay
  },
)

export const SuratPage = loadable(() => import('@/pages/surat'))

export const SuratHomePage = loadable(
  () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(import('@/pages/surat/suratHomePage'))
      }, 1000) // Delay 1 seconds before resolving the import
    })
  },
  {
    fallback: <LoadingFallbackPage />, // Show the fallback loading page during the delay
  },
)

export const SuratIzinSakiSekolahtPage = loadable(
  () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(import('@/pages/surat/suratIzinSakitSekolah'))
      }, 1000) // Delay 1 seconds before resolving the import
    })
  },
  {
    fallback: <LoadingFallbackPage />, // Show the fallback loading page during the delay
  },
)

export const SuratIzinTidakMasukSekolahtPage = loadable(
  () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(import('@/pages/surat/suratIzinTidakMasukSekolah'))
      }, 1000) // Delay 1 seconds before resolving the import
    })
  },
  {
    fallback: <LoadingFallbackPage />, // Show the fallback loading page during the delay
  },
)

export const SuratIzinSakitKuliahPage = loadable(
  () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(import('@/pages/surat/suratIzinSakitKuliah'))
      }, 1000) // Delay 1 seconds before resolving the import
    })
  },
  {
    fallback: <LoadingFallbackPage />, // Show the fallback loading page during the delay
  },
)

export const SuratIzinSakitKerjaPage = loadable(
  () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(import('@/pages/surat/suratIzinSakitKerja'))
      }, 1000) // Delay 1 seconds before resolving the import
    })
  },
  {
    fallback: <LoadingFallbackPage />, // Show the fallback loading page during the delay
  },
)

export const SuratIzinTidakMasukKerjaPage = loadable(
  () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(import('@/pages/surat/suratIzinTidakMasukKerja'))
      }, 1000) // Delay 1 seconds before resolving the import
    })
  },
  {
    fallback: <LoadingFallbackPage />, // Show the fallback loading page during the delay
  },
)

export const SuratKeteranganDomisiliPerorangan = loadable(
  () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(import('@/pages/surat/skdPerorangan'))
      }, 1000) // Delay 1 seconds before resolving the import
    })
  },
  {
    fallback: <LoadingFallbackPage />, // Show the fallback loading page during the delay
  },
)

export const SuratKeteranganDomisiliPerusahaan = loadable(
  () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(import('@/pages/surat/skdPerusahaan'))
      }, 1000) // Delay 1 seconds before resolving the import
    })
  },
  {
    fallback: <LoadingFallbackPage />, // Show the fallback loading page during the delay
  },
)

export const SuratKeteranganDomisiliUsaha = loadable(
  () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(import('@/pages/surat/skdUsaha'))
      }, 1000) // Delay 1 seconds before resolving the import
    })
  },
  {
    fallback: <LoadingFallbackPage />, // Show the fallback loading page during the delay
  },
)

export const SuratKeteranganDomisiliPengantarRT = loadable(
  () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(import('@/pages/surat/skdPengantarRT'))
      }, 1000) // Delay 1 seconds before resolving the import
    })
  },
  {
    fallback: <LoadingFallbackPage />, // Show the fallback loading page during the delay
  },
)

export const SuratKeteranganTidakMampu = loadable(
  () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(import('@/pages/surat/suratKeteranganTidakMampu'))
      }, 1000) // Delay 1 seconds before resolving the import
    })
  },
  {
    fallback: <LoadingFallbackPage />, // Show the fallback loading page during the delay
  },
)

export const SuratLamaranKerja = loadable(
  () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(import('@/pages/surat/suratLamaranKerja'))
      }, 1000) // Delay 1 seconds before resolving the import
    })
  },
  {
    fallback: <LoadingFallbackPage />, // Show the fallback loading page during the delay
  },
)

export const SuratPengunduranDiri = loadable(
  () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(import('@/pages/surat/suratPengunduranDiri'))
      }, 1000) // Delay 1 seconds before resolving the import
    })
  },
  {
    fallback: <LoadingFallbackPage />, // Show the fallback loading page during the delay
  },
)

// Dynamically import the NotFoundPage component from the 'notFound' page
// This page will be used for displaying a 404 error when no matching route is found
export const NotFoundPage = loadable(() => import('@/pages/notFoundPage'))
export const ComingSoonPage = loadable(() => import('@/pages/comingSoonPage'))
export const ErrorPage = loadable(() => import('@/pages/errorPage'))
export const MaintenancePage = loadable(() => import('@/pages/maintenancePage'))
export const NoInternetPage = loadable(() => import('@/pages/noInternetPage'))
