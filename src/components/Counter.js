import React, { useState, useEffect } from 'react'

function Counter() {
  const [count, setCount] = useState(0)
  const [color, setColor] = useState('#fff')
  useEffect(() => {
    console.log(1)
    document.title = `You clicked ${count} times`
  }, [count])
  return (
    <div className='counter' style={{ background: color }}>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click Me</button>
      <button onClick={() => setColor('cyan')}>Change background</button>
    </div>
  )
}

export default Counter
