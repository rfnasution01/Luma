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
        resolve(import('@/pages/surat/skTidakMampu'))
      }, 1000) // Delay 1 seconds before resolving the import
    })
  },
  {
    fallback: <LoadingFallbackPage />, // Show the fallback loading page during the delay
  },
)

export const SuratBelumMenikah = loadable(
  () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(import('@/pages/surat/skBelumMenikah'))
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

export const SPSanggupMembayarUtang = loadable(
  () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(import('@/pages/surat/spSanggupMembayarUtang'))
      }, 1000) // Delay 1 seconds before resolving the import
    })
  },
  {
    fallback: <LoadingFallbackPage />, // Show the fallback loading page during the delay
  },
)

export const SPSanggupMembayarUtangDenganJaminan = loadable(
  () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(import('@/pages/surat/spSanggupMembayarUtangDenganJaminan'))
      }, 1000) // Delay 1 seconds before resolving the import
    })
  },
  {
    fallback: <LoadingFallbackPage />, // Show the fallback loading page during the delay
  },
)

export const SPSanggupMembayarAngsuran = loadable(
  () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(import('@/pages/surat/spSanggupMembayarAngsuran'))
      }, 1000) // Delay 1 seconds before resolving the import
    })
  },
  {
    fallback: <LoadingFallbackPage />, // Show the fallback loading page during the delay
  },
)

export const SpSanggupMembayarGantiRugi = loadable(
  () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(import('@/pages/surat/spSanggupMembayarGantiRugi'))
      }, 1000) // Delay 1 seconds before resolving the import
    })
  },
  {
    fallback: <LoadingFallbackPage />, // Show the fallback loading page during the delay
  },
)

export const SpSanggupMembayarPajak = loadable(
  () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(import('@/pages/surat/spSanggupMembayarPajak'))
      }, 1000) // Delay 1 seconds before resolving the import
    })
  },
  {
    fallback: <LoadingFallbackPage />, // Show the fallback loading page during the delay
  },
)

export const SpKesanggupan = loadable(
  () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(import('@/pages/surat/spKesanggupan'))
      }, 1000) // Delay 1 seconds before resolving the import
    })
  },
  {
    fallback: <LoadingFallbackPage />, // Show the fallback loading page during the delay
  },
)

export const SKKehilangan = loadable(
  () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(import('@/pages/surat/skKehilangan'))
      }, 1000) // Delay 1 seconds before resolving the import
    })
  },
  {
    fallback: <LoadingFallbackPage />, // Show the fallback loading page during the delay
  },
)

export const SKAktifSekolah = loadable(
  () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(import('@/pages/surat/skAktifSekolah'))
      }, 1000) // Delay 1 seconds before resolving the import
    })
  },
  {
    fallback: <LoadingFallbackPage />, // Show the fallback loading page during the delay
  },
)

export const SKAktifKuliah = loadable(
  () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(import('@/pages/surat/skAktifKuliah'))
      }, 1000) // Delay 1 seconds before resolving the import
    })
  },
  {
    fallback: <LoadingFallbackPage />, // Show the fallback loading page during the delay
  },
)

export const SkTidakBeasiswaGanda = loadable(
  () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(import('@/pages/surat/skTidakBeasiswaGanda'))
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
