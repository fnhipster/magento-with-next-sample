import React from 'react'
import Error from 'next/error'
import { gql } from '@apollo/client'
import { initializeApollo } from '~/lib/apollo-client'

import APP_QUERY from '~/components/App/App.graphql'
import PRODUCTS_QUERY from '~/components/Products/Products.graphql'

import Category from '~/components/Category'
import CATEGORY_QUERY from '~/components/Category/Category.graphql'

import Product from '~/components/Product'
import PRODUCT_QUERY from '~/components/Product/Product.graphql'

const CONTENT_TYPE = {
  CMS_PAGE: 'CMS_PAGE',
  CATEGORY: 'CATEGORY',
  PRODUCT: 'PRODUCT',
  NOT_FOUND: '404',
}

const URLResolver = ({ type, urlKey }) => {
  if (type === CONTENT_TYPE.CMS_PAGE) {
    return <div>🥴 "CMS_PAGE" is not implemented in this sample.</div>
  }

  if (type === CONTENT_TYPE.CATEGORY) {
    return <Category filters={{ url_key: { eq: urlKey } }} />
  }

  if (type === CONTENT_TYPE.PRODUCT) {
    return <Product filters={{ url_key: { eq: urlKey } }} />
  }

  return <Error statusCode={500} />
}

URLResolver.getInitialProps = async ({ req, res, query, asPath }) => {
  res?.setHeader('cache-control', 's-maxage=1, stale-while-revalidate')

  const apolloClient = initializeApollo()

  const pathname = query?.pathname.join('/')

  const urlKey = query?.pathname?.pop().split('.')?.shift() || ''

  /** If a type has been provided then return the props and render the Component ... */
  if (query.type) {
    return { type: query.type, urlKey }
  }

  /** ... if not, let's resolver the URL ...  */
  const { data } = await apolloClient.query({
    query: gql`
      query UrlResolver($url: String!) {
        urlResolver(url: $url) {
          id
          type
        }
      }
    `,
    variables: {
      url: pathname,
    },
  })

  /** ... if not found, return 404 ... */
  if (!data?.urlResolver) {
    if (res) res.statusCode = 404
    return { type: '404', pathname }
  }

  const { type, id } = data.urlResolver

  /** ... if the request is done by the server, then let's load the data in cache of SSR goodness ... */
  if (req) {
    await apolloClient.query({ query: APP_QUERY }) // Preload App Data

    switch (type) {
      case CONTENT_TYPE.CMS_PAGE:
        // Not implemented...
        break
      case CONTENT_TYPE.CATEGORY:
        const { data } = await apolloClient.query({
          query: CATEGORY_QUERY,
          variables: { filters: { url_key: { eq: urlKey } } },
        })

        /** If the category is set to show products, then load those products as well */
        if (/PRODUCTS/.test(data.categoryList[0].display_mode)) {
          await apolloClient.query({
            query: PRODUCTS_QUERY,
            variables: { filters: { category_id: { eq: id } } },
          })
        }
        break
      case CONTENT_TYPE.PRODUCT:
        await apolloClient.query({
          query: PRODUCT_QUERY,
          variables: { filters: { url_key: { eq: urlKey } } },
        })
        break
      default:
        break
    }
  }

  /** Return Props */
  return {
    type,
    urlKey,
    initialApolloState: apolloClient.cache.extract(), // load cached data from queries above into the initial state of the app
  }
}

export default URLResolver
