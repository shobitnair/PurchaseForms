import React from 'react'
import Login from './Login/Login'
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
import Sp102 from './Forms/Sp102';
import NavBar from './NavBar';
import Forms from './Forms/Forms';



const App = () => {
  return (
    <div >
      <Provider store={store}>
        <Router>
          <NavBar/>
          <Routes>
            <Route exact path="/" element={<Login/>} />
            <Route exact path="/forms/sp101" element={<Sp101/>} />
            <Route exact path='/forms' element = {<Forms/>} />
            <Route exact path="/forms/sp102" element={<Sp102/>} />
          </Routes>
        </Router>
      </Provider>
    </div>
  )
}

export default App