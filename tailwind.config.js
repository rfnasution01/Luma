/** @type {import('tailwindcss').Config} */
export default {
  // Mengaktifkan dark mode berdasarkan kelas yang diterapkan di HTML
  darkMode: ['class'],

  // Mendefinisikan direktori yang berisi file untuk pemindaian class Tailwind
  content: ['./src/**/*.{ts,tsx}'],

  theme: {
    // --- Sistem Border Radius ---
    borderRadius: {
      none: '0px',
      sm: '0.125rem',
      rounded: '0.25rem',
      md: '0.375rem',
      lg: '0.5rem',
      xl: '0.75rem',
      '2xl': '1rem',
      '3xl': '1.5rem',
      full: '9999px', // Membuat border radius menjadi bulat sempurna
      '2x': '2rem',
      '3x': '3rem',
      '4x': '4rem',
    },

    //? ----- SISTEM SPASI -----
    spacing: {
      0: '0',
      1: '0.1rem',
      2: '0.2rem',
      4: '0.4rem',
      8: '0.8rem',
      12: '1.2rem',
      16: '1.6rem',
      24: '2.4rem',
      32: '3.2rem',
      48: '4.8rem',
      64: '6.4rem',
      80: '8rem',
      96: '9.6rem',
      128: '12.8rem',
    },

    //? ----- SISTEM TIPOGRAFI -----
    fontSize: {
      10: '1rem',
      12: '1.2rem',
      14: '1.4rem',
      16: '1.6rem',
      18: '1.8rem',
      20: '2rem',
      24: '2.4rem',
      30: '3rem',
      36: '3.6rem',
      44: '4.4rem',
      52: '5.2rem',
      62: '6.2rem',
      74: '7.4rem',
      86: '8.6rem',
      98: '9.8rem',
    },
    lineHeight: {
      DEFAULT: '1', // Line height default
      medium: '1.2',
      paragraph: '1.5', // Line height untuk paragraf
    },
    letterSpacing: {
      DEFAULT: '0.1rem',
      0.1: '0.01rem',
      0.25: '0.025rem',
      0.5: '0.05rem',
      0.75: '0.075rem',
      1.25: '0.125rem',
      1.5: '0.15rem',
      6: '0.6rem',
    },

    // ! Menggunakan unit em untuk media queries agar lebih konsisten
    // ! 1rem = 1em = 16px pada kebanyakan browser
    screens: {
      phones: { max: '64em' }, // Mengatur ukuran layar untuk perangkat ponsel, maksimal 64em (1024px)
      desktop: { min: '64.01em' }, // Ukuran untuk desktop mulai dari 64.01em (1025px ke atas)
    },

    extend: {
      // Menambahkan font keluarga kustom
      fontFamily: {
        nunito: ['Nunito Sans', 'sans-serif'],
        roboto: ['Roboto Slab', 'serif'],
        'sf-pro': ['SF Pro Display', 'sans-serif'],
        helvetica: ['Helvetica', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        jakarta: ['Plus Jakarta Sans', 'sans-serif'],
      },

      // ? ----- SISTEM WARNA -----
      colors: {
        background: {
          DEFAULT: '#f5f5f5', // Warna latar belakang default putih
          secondary: '#F5F5DC', // Warna latar belakang sekunder (beige)
        },
        border: {
          DEFAULT: '#8C9196', // Warna border default abu-abu
          subdued: '#C9CCCF', // Warna border lebih terang
        },
        primary: {
          DEFAULT: '#E2E8F0 ', // Warna utama (terang abu-abu)
        },
        secondary: {
          DEFAULT: '#1F2937', // Warna sekunder (gelap)
        },
        accent: {
          DEFAULT: '#22D3EE', // Warna aksen biru cerah
        },
        light: {
          DEFAULT: '#F9FAFB', // Warna terang latar belakang
        },
        dark: {
          DEFAULT: '#0F172A', // Warna latar belakang gelap
        },
        placeholder: '#7A7597',
      },

      // ? ----- SISTEM SHADOW -----
      boxShadow: {
        disabled: '0px -0.9471396207809448px 0px 0px rgba(0, 0, 0, 0.08) inset', // Shadow untuk elemen yang tidak aktif
        'active-primary': '0 0 0 3px rgba(64, 0, 83, 0.5)', // Shadow untuk elemen aktif dengan warna primer
      },

      // ? ----- ANIMASI -----
      keyframes: {
        'accordion-down': {
          from: { height: 0 }, // Animasi untuk membuka accordion (dari tinggi 0)
          to: { height: 'var(--radix-accordion-content-height)' }, // Animasi untuk menampilkan konten accordion
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' }, // Animasi untuk menutup accordion (dari tinggi konten)
          to: { height: 0 }, // Animasi untuk menyembunyikan konten accordion
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' }, // Animasi marquee gerak horizontal
          '100%': { transform: 'translateX(-100%)' }, // Menyelesaikan gerakan marquee ke kiri
        },
        'marquee-up': {
          '0%': { transform: 'translateY(0%)' }, // Animasi marquee gerak vertikal
          '100%': { transform: 'translateY(-100%)' }, // Menyelesaikan gerakan marquee ke atas
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out', // Durasi dan timing untuk animasi membuka accordion
        'accordion-up': 'accordion-up 0.2s ease-out', // Durasi dan timing untuk animasi menutup accordion
        marquee: 'marquee 25s linear infinite', // Durasi untuk animasi marquee horizontal
        'marquee-up': 'marquee-up 15s linear infinite', // Durasi untuk animasi marquee vertikal
      },
    },
  },

  // Menambahkan plugin untuk animasi dengan Tailwind CSS
  plugins: ['tailwindcss-animate'],
}
