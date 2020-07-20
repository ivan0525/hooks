import React, {FC, useState, createContext, useContext, useMemo, useRef, useCallback} from 'react'
import LearnUseRef from "./LearnUseRef";
import LearnCustomizeHook from "./LearnCustomizeHook";

interface ITheme {
  success: string
}

const initTheme: ITheme = {
  success: '绿色'
}

const Context = createContext<ITheme | null>(null)

const UseState: FC = () => {
  const [x, setX] = useState(0)
  const [y, setY] = useState(100)
  const [obj, setObj] = useState({name: '张三', age: 18})
  const [one, setOne] = useState(() => {
    console.log('只会执行一次')
    return {time: 1}
  })

  const [theme, setTheme] = useState(initTheme)


  const onClickX = () => setX(x + 1)
  const onClickY = () => setY((prev) => prev + 100)
  // obj.age = 100 // 无法触发更新
  const onClickObj = () => setObj(
    {
      ...obj,
      age: ++obj.age
    }
  )

  const onOneClick = () => setOne({
    ...one,
    time: Date.now()
  })
  const onThemeChange = (e: any) => setTheme({
    ...theme,
    success: e.target.value
  })

  // 通过useMemo缓存函数，只在对应的依赖发生改变的时，该函数才会更新
  // const onMemoClick = useMemo(() => {
  //   return () => console.log("点击了")
  // },[one])

  const onMemoClick = useCallback(() => {
    console.log("点击了")
  }, [one])

  return (
    <Context.Provider value={theme}>
      <h4>useState</h4>
      <button onClick={onClickX}>x + 1</button>
      <p>值：{x}</p>
      <button onClick={onClickY}>y + 100</button>
      <p>值：{y}</p>
      <button onClick={onClickObj}>改变对象的属性</button>
      <p>name: {obj.name}, age: {obj.age}</p>
      <button onClick={onOneClick}>get Now</button>
      <p>{one.time}</p>
      <select onChange={onThemeChange} value={theme.success}>
        <option value="红色">红色</option>
        <option value="绿色">绿色</option>
        <option value="黄色">黄色</option>
        <option value="蓝色">蓝色</option>
      </select>
      <Child/>
      <Animal from="animal" handleClick={onMemoClick}/>
      <MemoAnimal from="memoAnimal" handleClick={onMemoClick}/>
      <LearnUseRef/>
      <LearnCustomizeHook/>
    </Context.Provider>
  )
}

const Child: FC = () => {
  const theme = useContext(Context)
  return <div>
    儿子得到的值：{theme!.success}
    <GrandChild/>
  </div>
}

const GrandChild: FC = () => {
  const theme = useContext(Context)
  return <div>
    孙子得到的值：{theme?.success}
  </div>
}

const Animal: FC<any> = (props) => {
  console.log(props.from + '你是真的🐶')
  return <div onClick={props.handleClick}>
    这是一只狗
  </div>
}

const MemoAnimal = React.memo(Animal)

export default UseState
