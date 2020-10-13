import React, { useCallback, useState } from 'react'
import styles from './Home.module.css'
import { useDebounce } from 'use-debounce'
import Products from '~/components/Products'

export const Home = () => {
  const [searchQuery, setSearchQuery] = useState('')

  const [debouncedSearchQuery] = useDebounce(searchQuery, 500)

  const handleSearch = useCallback(
    (e) => {
      e.preventDefault()
      e.stopPropagation()

      setSearchQuery(searchQuery)
    },
    [searchQuery]
  )

  return (
    <div className={styles.home}>
      <form className={styles.search} onSubmit={handleSearch}>
        <input
          className={styles.searchInput}
          type="search"
          name="search"
          placeholder="Search..."
          onChange={(e) => setSearchQuery(e.currentTarget.value)}
        />
      </form>

      <Products search={debouncedSearchQuery} />
    </div>
  )
}
