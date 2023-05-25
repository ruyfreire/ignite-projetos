import { Html, Head, Main, NextScript } from 'next/document'

import { getCssText } from '../styles/theme'

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="shortcut icon" href="./icon.svg" type="image/x-icon" />

        <style
          id="stitches"
          dangerouslySetInnerHTML={{ __html: getCssText() }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
