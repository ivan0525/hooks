import React from 'react'
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom'
import './App.css'
import Counter from './components/Counter'
import FetchData from './components/FetchData'
import FetchArticle from './components/FetchArticle'
import AsyncCounter from './components/AsyncCounter'
import AutoCounter from './components/AutoCounter'
import Parent from './components/Parent'
import ProfilePage from './components/ProfilePage'

import UseState from './components/UseState'
function App() {
  return (
    <BrowserRouter>
      <ul>
        <li>
          <Link to='/counter'>Counter</Link>
        </li>
        <li>
          <Link to='/fetchData'>FetchData</Link>
        </li>
        <li>
          <Link to='/fetchArtical'>FetchArticle</Link>
        </li>
        <li>
          <Link to='/asyncCounter'>AsyncCounter</Link>
        </li>
        <li>
          <Link to='/autoCounter'>AutoCounter</Link>
        </li>
        <li>
          <Link to='/parent'>Parent</Link>
        </li>
        <li>
          <Link to='/profilePage'>ProfilePage</Link>
        </li>
        <li>
          <Link to='/UseState'>UseState</Link>
        </li>
      </ul>
      <Switch>
        <Route path='/counter' component={Counter} />
        <Route path='/fetchData' component={FetchData} />
        <Route path='/fetchArtical' component={FetchArticle} />
        <Route path='/asyncCounter' component={AsyncCounter} />
        <Route path='/autoCounter' component={AutoCounter} />
        <Route path='/parent' component={Parent} />
        <Route path='/profilePage' component={ProfilePage} />
        <Route path='/UseState' component={UseState}></Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App
