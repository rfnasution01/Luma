import { ReactNode } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'

export function Seo({
  children,
  title,
  date,
  namaAplikasi,
  deskripsi,
  logo,
  website,
}: {
  children: ReactNode
  title?: string
  date?: string
  namaAplikasi: string
  deskripsi: string
  logo: string
  website: string
}) {
  return (
    <HelmetProvider>
      {children}
      <Helmet>
        <title>{title ? `${title} | ${namaAplikasi}` : namaAplikasi}</title>
        <meta name="robots" content="follow, index" />
        <meta content={deskripsi} name="description" />
        <meta property="og:url" content={website} />
        <link rel="canonical" href={website} />
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={website} />
        <meta property="og:description" content={deskripsi} />
        <meta property="og:title" content={title ?? namaAplikasi} />
        <meta name="image" property="og:image" content={logo} />
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title ?? namaAplikasi} />
        <meta name="twitter:description" content={deskripsi} />
        <meta name="twitter:image" content={logo} />
        {date && (
          <>
            <meta property="article:published_time" content={date} />
            <meta
              name="publish_date"
              property="og:publish_date"
              content={date}
            />
          </>
        )}

        {/* Favicons */}
        {favicons.map((linkProps) => (
          <link key={linkProps.href} {...linkProps} />
        ))}
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta
          name="msapplication-config"
          content="/favicon/browserconfig.xml"
        />
        <meta name="theme-color" content="#ffffff" />
      </Helmet>
    </HelmetProvider>
  )
}

const favicons: Array<React.ComponentPropsWithoutRef<'link'>> = [
  {
    rel: 'apple-touch-icon',
    sizes: '180x180',
    href: '/favicon/apple-touch-icon.png',
  },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '32x32',
    href: '/favicon/favicon-32x32.png',
  },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '16x16',
    href: '/favicon/favicon-16x16.png',
  },
  { rel: 'manifest', href: '/favicon/site.webmanifest' },
  { rel: 'shortcut icon', href: '/favicon/favicon.ico' },
]
