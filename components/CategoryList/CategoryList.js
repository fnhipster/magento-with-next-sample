import React from 'react'
import styles from './CategoryList.module.css'
import Link from 'next/link'

export const CategoryList = ({ items = [] }) => {
  return (
    <nav className={styles.categoriesListWrapper}>
      <ul className={styles.categoriesList}>
        {items.map((category) => (
          <li key={category.id}>
            <Link href={`/category/${category.url_key}`}>
              <a>{category.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
