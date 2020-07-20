import React, { FC, useEffect, useRef, useState } from 'react'

const LearnUseRef: FC = () => {
  const [x, setX] = useState(0)
  const y = useRef(0)
  useEffect(() => {
    y.current += 1
  }, [])

  const changeX = () => setX(x + 1)
  const changeY = () => y.current + 1
  return (
    <div>
      <h1>useRef</h1>
      <button onClick={changeX}>x + 1</button>
      <button onClick={changeY}>y + 1</button>
      <div>x 的值 {x}</div>
      <div>y 的值 {y.current}</div>
    </div>
  )
}

export default LearnUseRef
