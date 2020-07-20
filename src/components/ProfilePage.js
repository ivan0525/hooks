import React, {
  useState,
  useRef,
  useEffect,
  useReducer,
  useCallback,
} from 'react'

function ProfilePageFunction(props) {
  const showMessage = () => {
    alert(`Followed ${props.user}`)
  }
  const handleClick = () => {
    setTimeout(showMessage, 3000)
  }
  return <button onClick={() => handleClick()}>Follow</button>
}

class ProfilePageClass extends React.Component {
  render() {
    const props = this.props
    const showMessage = () => {
      alert(`Followed ${props.user}`)
    }
    const handleClick = () => {
      setTimeout(showMessage, 3000)
    }

    return <button onClick={handleClick}>Follow</button>
  }
}

function MessageThread() {
  const [message, setMessage] = useState('')
  // 保持追踪最新的值
  const lastMessage = useRef('')
  // effect在DOM渲染更新完成之后运行
  useEffect(() => {
    console.log(message)
    lastMessage.current = message
  })
  const showMessage = () => {
    alert(`You said: ${lastMessage.current}`)
  }
  const handleSendClick = () => {
    setTimeout(showMessage, 3000)
  }
  // const handleMessageChange = (e) => {
  //   setMessage(e.target.value);
  //   lastMessage.current = e.target.value;
  // };
  return (
    <>
      <input value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={() => handleSendClick()}>Send</button>
    </>
  )
}

function useInterval(callback, delay) {
  const savedCallback = useRef()
  // 记住最新的callback
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // 设置interval
  useEffect(() => {
    function tick() {
      savedCallback.current()
    }
    if (delay !== null) {
      const id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}

function Counter() {
  const [count, setCount] = useState(0)
  const [delay, setDelay] = useState(1000)
  const [isRunning, setIsRunning] = useState(true)
  useInterval(
    () => {
      setCount(count + 1)
    },
    isRunning ? delay : null
  )
  return (
    <>
      <p>count is: {count}</p>
      <input value={delay} onChange={(e) => setDelay(e.target.value)} />
      <input
        type='checkbox'
        checked={isRunning}
        onChange={(e) => setIsRunning(e.target.checked)}
      />
    </>
  )
}

function AutoCounter() {
  const [count, dispatch] = useReducer((state, action) => {
    if (action.type === 'inc') {
      return state + 1
    }
  }, 0)

  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: 'inc' })
    }, 1000)
    return () => clearInterval(id)
  }, [])
  return <p>Count is: {count}</p>
}

const useRefState = (initialState) => {
  const [state, setState] = useState(initialState)
  const stateRef = useRef(state)
  useEffect(() => {
    stateRef.current = state
  }, [state])
  return [state, stateRef, setState]
}

function ShowCounter() {
  // const [count, setCount] = useState(0);
  const [state, stateRef, setState] = useRefState(0)
  const handleButtonClick = useCallback(() => {
    setState(state + 1)
  }, [setState, state])
  // const lastCount = useRef(count);
  // useEffect(() => {
  //   lastCount.current = count;
  // }, [count]);
  const handleAlertButtonClick = useCallback(() => {
    setTimeout(() => alert(stateRef.current), 3000)
  }, [stateRef])
  return (
    <>
      <button onClick={() => handleButtonClick()}>Add count</button>
      <button onClick={() => handleAlertButtonClick()}>alert</button>
      <p>{state}</p>
    </>
  )
}

const optionEnum = [
  { value: 'Dan', text: 'Dan' },
  { value: 'Sophie', text: 'Sophie' },
  { value: 'Sunil', text: 'Sunil' },
]

class ProfilePage extends React.Component {
  state = {
    user: 'Dan',
  }
  render() {
    return (
      <>
        <label>
          <b>Choose profile to view:</b>
          <select
            value={this.state.user}
            onChange={(e) => this.setState({ user: e.target.value })}
          >
            {optionEnum.map((item) => (
              <option value={item.value} key={item.value}>
                {item.text}
              </option>
            ))}
          </select>
        </label>
        <h1>Welecome to {this.state.user}'s profile </h1>
        <p>
          <ProfilePageFunction user={this.state.user} />
          <b>(function)</b>
        </p>
        <p>
          <ProfilePageClass user={this.state.user} />
          <b>(class)</b>
        </p>
        <p>
          <MessageThread />
        </p>
        <Counter />
        <AutoCounter />
        <ShowCounter />
      </>
    )
  }
}

export default ProfilePage
