import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom'

import store from './store'

import AddListPage from 'Pages/AddListPage'
import DoneRemovedPage from 'Pages/DoneRemovedPage'

export default function App() {
  return <Provider store={store}>
    <h1>Todo Application</h1>

    <BrowserRouter>
      <ul>
        <li>
          <Link to="/" >Home</Link>
        </li>
        <li>
          <Link to="/done-and-removed" >Done and Removed</Link>
        </li>
      </ul>

      <Switch>
        <Route exact path="/">
          <AddListPage />
        </Route>
        <Route path="/done-and-removed">
          <DoneRemovedPage />
        </Route>
      </Switch>
    </BrowserRouter>
  </Provider>
}
