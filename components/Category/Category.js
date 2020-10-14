import React from 'react'
import styles from './Category.module.css'
import { useQuery } from '@apollo/client'
import CATEGORY_QUERY from './Category.graphql'
import Products from '~/components/Products'
import Link from 'next/link'
import Head from 'next/head'

export const Category = ({ filters }) => {
  const { loading, data, error } = useQuery(CATEGORY_QUERY, {
    variables: { filters },
  })

  if (error) {
    console.error(error)
    return <div>💩 There was an error.</div>
  }

  if (loading && !data) return <div>⌚️ Loading...</div>

  const category = data.categoryList[0]

  const categoryUrlSuffix = data.storeConfig.category_url_suffix ?? ''

  const backUrl =
    category.breadcrumbs &&
    category.breadcrumbs[0]?.category_url_path + categoryUrlSuffix

  return (
    <React.Fragment>
      <Head>
        <title>{category.name}</title>
      </Head>

      <div className={styles.category}>
        <header className={styles.header}>
          {backUrl && (
            <Link key={backUrl} href={backUrl}>
              <a className={styles.backLink}>⬅</a>
            </Link>
          )}

          <h2>{category.name}</h2>
        </header>

        {/* Show Products only if the Category is set for it */}
        {/PRODUCTS/.test(category.display_mode) && (
          <React.Fragment>
            {category.children?.length > 0 && (
              <nav className={styles.categoriesListWrapper}>
                <ul className={styles.categoriesList}>
                  {category.children.map((category) => (
                    <li key={category.id}>
                      <Link
                        href={{
                          pathname: '_url-resolver',
                          query: {
                            pathname: `/${
                              category.url_key + categoryUrlSuffix
                            }`,
                            type: 'CATEGORY',
                          },
                        }}
                        as={`/${category.url_path + categoryUrlSuffix}`}
                      >
                        <a>{category.name}</a>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            )}

            <Products filters={{ category_id: { eq: category.id } }} />
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  )
}
