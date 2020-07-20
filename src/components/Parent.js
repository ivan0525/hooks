import React, { useCallback, useState, useEffect } from 'react'
import Axios from 'axios'

const Parent = () => {
  const [query, setQuery] = useState('react')
  const fetchData = useCallback(() => {
    const url = 'https://hn.algolia.com/api/v1/search?query=' + query
    return Axios(url)
  }, [query])
  return (
    <>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      <Child fetchData={fetchData} />
    </>
  )
}

const Child = ({ fetchData }) => {
  const [data, setData] = useState({ hits: [] })
  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetchData()
        setData(result.data)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [fetchData])
  console.log(data)
  return (
    <ul>
      {data.hits.map((item) => (
        <li key={item.objectID}>
          <a href={item.url}>{item.title}</a>
        </li>
      ))}
    </ul>
  )
}

export default Parent
