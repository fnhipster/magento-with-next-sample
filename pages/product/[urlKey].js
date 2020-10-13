import React from 'react'
import { useRouter } from 'next/router'
import Product from '~/components/Product'
import { initializeApollo } from '~/lib/apollo-client'
import APP_QUERY from '~/components/App/App.graphql'
import PRODUCT_QUERY from '~/components/Product/Product.graphql'

const ProductPage = () => {
  const router = useRouter()

  const { urlKey } = router.query

  return <Product urlKey={urlKey} />
}

export const getServerSideProps = async ({ params }) => {
  const apolloClient = initializeApollo()

  const urlKey = params?.urlKey

  await apolloClient.query({
    query: APP_QUERY,
  })

  await apolloClient.query({
    query: PRODUCT_QUERY,
    variables: { urlKey },
  })

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  }
}

export default ProductPage
