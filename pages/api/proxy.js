import { createProxyMiddleware } from 'http-proxy-middleware'
import { URL } from 'url'
import { runMiddleware } from '~/lib/express-middleware'

const magentoProxyApi = async (req, res) => {
  const target = new URL(process.env.MAGENTO_URL).href

  await runMiddleware(
    req,
    res,
    createProxyMiddleware({
      target,
      changeOrigin: true,
      secure: false,
      logLevel: 'error',
      pathRewrite: {
        '^/store': '/', // remove path
      },
    })
  )
}

export default magentoProxyApi
