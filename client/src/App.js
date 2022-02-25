import React from 'react'
import {Provider} from 'react-redux'
import {store} from './Store/store'
import { 
  BrowserRouter as Router,
  Routes,
  Route,} from "react-router-dom";
import {
  useNavigate
} from "react-router";
import Sp101 from './Forms/Sp101';
import Sp102 from './Forms/Sp102';
import NavBar from './NavBar';
import Forms from './Forms/Forms';
import Dashboard from './Login/Dashboard'

import { LoginProvider } from './Login/LoginContext';
import SubmittedForms from './Forms/SubmittedForms';

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
            <Route exact path="/forms/sp102" element={<Sp102/>} />
            <Route exact path="/forms/submitted" element={<SubmittedForms/>} />
          </Routes>
        </Router>
      </Provider>
      </LoginProvider>
    </div>
  )
}

export default App