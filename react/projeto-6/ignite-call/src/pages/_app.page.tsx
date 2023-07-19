import '@/lib/dayjs'
import { queryClient } from '@/lib/react-query'
import { globalStyles } from '@/styles/globals'
import { QueryClientProvider } from '@tanstack/react-query'
import { SessionProvider } from 'next-auth/react'
import { DefaultSeo } from 'next-seo'
import type { AppProps } from 'next/app'

globalStyles()

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>
        <DefaultSeo
          titleTemplate="%s | Ignite Call Ruy Freire"
          openGraph={{
            type: 'website',
            locale: 'pt_BR',
            siteName: 'Ignite Call Ruy Freire',
          }}
        />

        <Component {...pageProps} />
      </SessionProvider>
    </QueryClientProvider>
  )
}
