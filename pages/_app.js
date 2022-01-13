import '../styles/globals.css'
import ContentstackLivePreview from '@contentstack/live-preview-utils'

ContentstackLivePreview.init({enable: true,ssr: true, debug: true, stackDetails: {
  apiKey: process.env.api_key
}});

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
