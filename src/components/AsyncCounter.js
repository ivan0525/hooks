import React, { useState, useEffect, useRef } from "react";

const AsyncCounter = () => {
  const [count, setCount] = useState(0);
  const latestCount = useRef(count);
  useEffect(() => {
    // Set the mutable latest value
    latestCount.current = count;
    setTimeout(() => {
      console.log(`You clicked ${latestCount.current} times`);
    }, 3000);
  });
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
};

export default AsyncCounter;
