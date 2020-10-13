import React from 'react'

export const Price = ({ minimum_price, ...rest }) => {
  const currency = minimum_price.regular_price.currency || 'USD'

  const price = minimum_price.regular_price.value.toLocaleString('en-US', {
    style: 'currency',
    currency,
  })

  const discount = minimum_price.discount.amount_off
    ? minimum_price.discount.amount_off.toLocaleString('en-US', {
        style: 'currency',
        currency,
      })
    : null

  return (
    <span>
      {price} {discount && <span>({discount} OFF)</span>}
    </span>
  )
}
