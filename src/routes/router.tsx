// Import the necessary modules from 'react-router-dom' for setting up routes
import { createBrowserRouter } from 'react-router-dom'
// Import dynamically loaded components (HomePage, MainLayout, NotFoundPage) using loadable
import {
  HomePage,
  MainLayout,
  NotFoundPage,
  SuratHomePage,
  SuratIzinSakiSekolahtPage,
  SuratIzinSakitKerjaPage,
  SuratIzinSakitKuliahPage,
  SuratIzinTidakMasukSekolahtPage,
  SuratKeteranganDomisiliPengantarRT,
  SuratKeteranganDomisiliPerorangan,
  SuratKeteranganDomisiliPerusahaan,
  SuratKeteranganDomisiliUsaha,
  SuratKeteranganTidakMampu,
  SuratLamaranKerja,
  SuratPage,
  SuratPengunduranDiri,
} from './loadables'

// Create a router configuration using 'createBrowserRouter' to define application routes
export const router = createBrowserRouter([
  {
    // Define the root path '/' for the application
    // The MainLayout component is the main wrapper for the layout of the app
    path: '/',
    element: <MainLayout />,

    // Define the child routes inside the MainLayout, in this case, the homepage
    children: [
      {
        // Define the child route for the home page
        // It loads the HomePage component when the root path is accessed
        path: '',
        element: <HomePage />,
      },
      {
        path: 'surat',
        element: <SuratPage />,
        children: [
          {
            path: '',
            element: <SuratHomePage />,
          },
          {
            path: 'surat-izin-sakit-sekolah',
            element: <SuratIzinSakiSekolahtPage />,
          },
          {
            path: 'surat-izin-tidak-masuk-sekolah',
            element: <SuratIzinTidakMasukSekolahtPage />,
          },
          {
            path: 'surat-izin-sakit-kuliah',
            element: <SuratIzinSakitKuliahPage />,
          },
          {
            path: 'surat-izin-sakit-kerja',
            element: <SuratIzinSakitKerjaPage />,
          },
          {
            path: 'surat-keterangan-domisili-perorangan',
            element: <SuratKeteranganDomisiliPerorangan />,
          },
          {
            path: 'surat-keterangan-domisili-perusahaan',
            element: <SuratKeteranganDomisiliPerusahaan />,
          },
          {
            path: 'surat-keterangan-domisili-usaha',
            element: <SuratKeteranganDomisiliUsaha />,
          },
          {
            path: 'surat-keterangan-domisili-pengantar-rt',
            element: <SuratKeteranganDomisiliPengantarRT />,
          },
          {
            path: 'surat-keterangan-tidak-mampu-sktm',
            element: <SuratKeteranganTidakMampu />,
          },
          {
            path: 'surat-lamaran-kerja',
            element: <SuratLamaranKerja />,
          },
          {
            path: 'surat-pengunduran-diri-resign',
            element: <SuratPengunduranDiri />,
          },
          {
            // Define a wildcard '*' route that will match any path that doesn't exist
            // This route is used to display the NotFoundPage for undefined routes
            path: '*',
            element: <NotFoundPage />,
          },
        ],
      },
      {
        // Define a wildcard '*' route that will match any path that doesn't exist
        // This route is used to display the NotFoundPage for undefined routes
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
  {
    // Define a wildcard '*' route that will match any path that doesn't exist
    // This route is used to display the NotFoundPage for undefined routes
    path: '*',
    element: <NotFoundPage />,
  },
])
