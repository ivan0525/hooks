import React, {FC, useEffect, useState} from 'react'

interface IGoods {
  id: string
  name: string
}

const useGoods = (initialGoods: IGoods[]) => {
  const [goods, setGoods] = useState(initialGoods)
  useEffect(() => {
    getGoods()
  })
  const getGoods = () => {
    setTimeout(() => {
      setGoods([
        {id: '1', name: '奥利奥'},
        {id: '2', name: '奥尔良烤翅'},
        {id: '3', name: '鳕鱼堡'},
        {id: '4', name: '嫩牛五方'}
      ])
    }, 2000)
  }
  const addGoods = (newGoods: IGoods) => {
    setGoods([
      ...goods,
      newGoods
    ])
  }
  const deleteGoods = () => {
    //  delete  /goods?id=xxx
  }
  const editGoods = () => {
    // put /goods?id=xxx
  }
  return {
    goods,
    getGoods,
    addGoods,
    deleteGoods,
    editGoods
  }
}

const LearnCustomizeHook: FC = () => {
  const {goods} = useGoods([])
  return <div>
    <h4>useGoods hooks</h4>
    {
      goods.length > 0 ?
        goods.map((item) =>
          <div key={item.id}>id: {item.id}, name: {item.name}</div>
        ) : <div>加载中</div>
    }
  </div>
}

export default LearnCustomizeHook