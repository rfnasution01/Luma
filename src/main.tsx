// Mengimpor ReactDOM untuk merender aplikasi React ke dalam DOM
import ReactDOM from 'react-dom/client'

// Mengimpor file CSS global aplikasi
import './index.css'

// Mengimpor Provider dari react-redux untuk menghubungkan aplikasi dengan Redux store
import { Provider } from 'react-redux'

// Mengimpor store yang telah dibuat pada folder store
import { store } from './store/store'

// Mengimpor router untuk menangani navigasi aplikasi
import { router } from './routes/router'

// Mengimpor RouterProvider untuk menyediakan router pada aplikasi menggunakan react-router-dom
import { RouterProvider } from 'react-router-dom'

// Menggunakan ReactDOM untuk merender aplikasi ke dalam elemen dengan id 'root' di DOM
ReactDOM.createRoot(document.getElementById('root')!).render(
  // Menyediakan store ke seluruh aplikasi menggunakan Provider dari react-redux
  <Provider store={store}>
    {/* Menyediakan router ke seluruh aplikasi dengan RouterProvider */}
    <RouterProvider router={router} />
  </Provider>,
)
