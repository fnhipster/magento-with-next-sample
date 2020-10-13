if (!process.browser) {
  const { URL } = require('url')
  global.URL = URL
}

export const resolveImage = (url) => {
  if (!url) return undefined

  const { pathname } = new URL(url)

  if (pathname) {
    return `/store${pathname}`
  } else {
    return url
  }
}
