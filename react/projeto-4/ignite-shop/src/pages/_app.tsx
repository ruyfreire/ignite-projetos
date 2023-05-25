import type { AppProps } from 'next/app'
import { Roboto } from 'next/font/google'
import Image from 'next/image'

import { globalStyles } from '../styles/global'
import { Container } from '@/components/styles/AppContainer'
import { Header } from '@/components/styles/AppHeader'
import Logo from '../assets/logo.svg'

globalStyles()

const roboto = Roboto({ weight: ['400', '700'], subsets: ['latin'] })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container className={roboto.className}>
      <Header>
        <Image src={Logo} alt="" />
      </Header>

      <Component {...pageProps} />
    </Container>
  )
}
