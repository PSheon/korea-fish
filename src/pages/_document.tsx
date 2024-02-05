// ** React Import
import { Children } from 'react'

// ** Next Import
import Document, { Html, Head, Main, NextScript } from 'next/document'

// ** Emotion Imports
import createEmotionServer from '@emotion/server/create-instance'

// ** Utils Imports
import { createEmotionCache } from 'src/@core/utils/create-emotion-cache'

class CustomDocument extends Document {
  render() {
    return (
      <Html lang='en'>
        <Head>
          {/* Meta */}
          <meta name='title' content='Korea Fish' />
          <meta name='description' content='Do you like  Korea Fish' />
          <meta name='keywords' content='nft,eth,korea,fish,meme' />
          <meta name='robots' content='index, follow' />
          <meta httpEquiv='Content-Type' content='text/html; charset=utf-8' />
          <meta name='language' content='English' />
          <meta name='msapplication-TileColor' content='#da532c' />
          <meta name='theme-color' content='#ffffff' />

          {/* Link */}
          <link rel='preconnect' href='https://fonts.googleapis.com' />
          <link rel='preconnect' href='https://fonts.gstatic.com' />
          <link rel='stylesheet' href='https://fonts.googleapis.com/css2?family=Pixelify+Sans&display=swap' />
          <link rel='apple-touch-icon' sizes='180x180' href='/seo/apple-touch-icon.png' />
          <link rel='shortcut icon' href='/favicon.png' />
          <link rel='icon' type='image/png' sizes='32x32' href='/seo/favicon-32x32.png' />
          <link rel='icon' type='image/png' sizes='16x16' href='/seo/favicon-16x16.png' />
          <link rel='manifest' href='/site.webmanifest' />
          <link rel='mask-icon' href='/seo/safari-pinned-tab.svg' color='#5bbad5' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

CustomDocument.getInitialProps = async ctx => {
  const originalRenderPage = ctx.renderPage
  const cache = createEmotionCache()
  const { extractCriticalToChunks } = createEmotionServer(cache)

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: App => props =>
        (
          <App
            {...props} // @ts-ignore
            emotionCache={cache}
          />
        )
    })

  const initialProps = await Document.getInitialProps(ctx)
  const emotionStyles = extractCriticalToChunks(initialProps.html)
  const emotionStyleTags = emotionStyles.styles.map(style => {
    return (
      <style
        key={style.key}
        dangerouslySetInnerHTML={{ __html: style.css }}
        data-emotion={`${style.key} ${style.ids.join(' ')}`}
      />
    )
  })

  return {
    ...initialProps,
    styles: [...Children.toArray(initialProps.styles), ...emotionStyleTags]
  }
}

export default CustomDocument
