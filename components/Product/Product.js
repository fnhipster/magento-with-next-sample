import React, { useCallback } from 'react'
import styles from './Product.module.css'
import { useQuery, useMutation, gql } from '@apollo/client'
import { resolveImage } from '~/lib/resolve-image'
import PRODUCT_QUERY from './Product.graphql'
import Price from '~/components/Price'
import Button from '~/components/Button'
import Head from 'next/head'

export const Product = ({ filters }) => {
  const { loading, data } = useQuery(PRODUCT_QUERY, { variables: { filters } })

  const product = data?.products.items[0]

  if (loading && !data) return <div>⌚️ Loading...</div>

  return (
    <React.Fragment>
      <Head>
        <title>{product.name}</title>
      </Head>

      <div className={styles.product}>
        <div className={styles.gallery}>
          {product.media_gallery
            .filter((media) => media.type === 'ProductImage')
            .map((image, index) => (
              <img
                key={index}
                src={
                  resolveImage(image.url) + '?width=1000&height=1240&webp=auto'
                }
                width={1000}
                height={1240}
                alt={image.label}
                loading={index === 0 ? 'eager' : 'lazy'}
              />
            ))}
        </div>
        <div className={styles.content}>
          <div className={styles.detailsWrapper}>
            <div className={styles.details}>
              <h2>{product.name}</h2>

              <div className={styles.sku}>SKU. {product.sku}</div>

              <Price {...product.price_range} />

              <div className={styles.buttonWrapper}>
                <Button disabled>Add to Cart</Button>
              </div>

              {product.description?.html && (
                <div
                  className={styles.description}
                  dangerouslySetInnerHTML={{ __html: product.description.html }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
