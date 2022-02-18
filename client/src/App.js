import React from 'react'
import Login from './Login/Login'
import {Provider} from 'react-redux'
import {store} from './Store/store'
import { 
  BrowserRouter as Router,
  Routes,
  Route,
  Link } from "react-router-dom";
import Sp101 from './Forms/Sp101';
import DBMS from './DBMS'

const App = () => {
  return (
    <div>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route exact path="/" element={<Login/>} />
            <Route exact path="/dbms" element={<DBMS/>} />
            <Route exact path="/sp101" element={<Sp101/>} />
          </Routes>
        </Router>
      </Provider>
    </div>
  )
}

export default App