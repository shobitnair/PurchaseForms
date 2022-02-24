import React from 'react'
import {Provider} from 'react-redux'
import {store} from './Store/store'
import { 
  BrowserRouter as Router,
  Routes,
  Route,
  Link } from "react-router-dom";
import {
  useNavigate
} from "react-router";
import Sp101 from './Forms/Sp101';
import NavBar from './NavBar';
import Forms from './Forms/Forms';
import Dashboard from './Login/Dashboard'

import { LoginProvider } from './Login/LoginContext';

const App = () => {
  return (
    <div >
      <LoginProvider>
      <Provider store={store}>
        <Router>
        <NavBar/>
          <Routes>
            <Route exact path="/" element={<Dashboard/>} />
            <Route exact path="/forms/sp101" element={<Sp101/>} />
            <Route exact path='/forms' element = {<Forms/>} />
          </Routes>
        </Router>
      </Provider>
      </LoginProvider>
    </div>
  )
}

export default App