import React from 'react'
import { useRouter } from 'next/router'
import Category from '~/components/Category'
import { initializeApollo } from '~/lib/apollo-client'
import APP_QUERY from '~/components/App/App.graphql'
import CATEGORY_QUERY from '~/components/Category/Category.graphql'
import PRODUCTS_QUERY from '~/components/Products/Products.graphql'

const CategoryPage = () => {
  const router = useRouter()

  const { urlKey } = router.query

  return <Category filters={{ url_key: { eq: urlKey } }} />
}

export const getStaticPaths = async () => {
  const apolloClient = initializeApollo()

  const { data } = await apolloClient.query({
    query: APP_QUERY,
  })

  const paths = data.categoryList[0].children.map((category) => ({
    params: {
      urlKey: category.url_key,
    },
  }))

  return {
    paths,
    fallback: true,
  }
}

export const getStaticProps = async ({ params }) => {
  const apolloClient = initializeApollo()

  const urlKey = params?.urlKey

  await apolloClient.query({
    query: APP_QUERY,
  })

  const { data } = await apolloClient.query({
    query: CATEGORY_QUERY,
    variables: { filters: { url_key: { eq: urlKey } } },
  })

  const categoryId = data.categoryList[0]?.id

  await apolloClient.query({
    query: PRODUCTS_QUERY,
    variables: { filters: { category_id: { eq: categoryId } } },
  })

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
    revalidate: 1,
  }
}

export default CategoryPage
