import React, { useState, useEffect } from 'react'
import axios from 'axios'

function useHackerNewsApi() {
  const [data, setData] = useState({ hits: [] })
  const [url, setUrl] = useState(
    'https://hn.algolia.com/api/v1/search?query=redux'
  )
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    async function fetchData() {
      // 开启loading
      setIsLoading(true)
      const result = await axios(url)
      setData(result.data)
      // 关闭loading
      setIsLoading(false)
    }
    fetchData()
  }, [url])
  return [{ data, isLoading }, setUrl]
}

function FetchData() {
  const [query, setQuery] = useState('redux')
  const [{ data, isLoading }, doFetch] = useHackerNewsApi()
  return (
    <>
      <input
        type='text'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        onClick={() =>
          doFetch(`https://hn.algolia.com/api/v1/search?query=${query}`)
        }
      >
        Search
      </button>
      {isLoading ? (
        <div>loading...</div>
      ) : (
        <ul>
          {data.hits.map((item) => (
            <li key={item.objectID}>
              <a href={item.url}>{item.title}</a>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}

export default FetchData
