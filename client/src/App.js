import React from 'react'
import {Provider} from 'react-redux'
import {store} from './Store/store'
import { 
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Sp101 from './Forms/Sp101';
import Sp102 from './Forms/Sp102';
import NavBar from './NavBar';
import Dashboard from './Login/Dashboard'
import { LoginProvider } from './Login/LoginContext';
import SubmittedForms from './Forms/SubmittedForms';
import { ChakraProvider } from '@chakra-ui/react'
import AdminForms from "./Admin/AdminForms";

const App = () => {
  return (
    <div style={{fontFamily:'Droid Sans Mono'}}>
      <ChakraProvider>
        <LoginProvider>
        <Provider store={store}>
          <Router>  
          <NavBar/>
            <Routes>
              <Route exact path="/site/" element={<Dashboard/>} />
              <Route exact path="/site/forms/sp101" element={<Sp101/>} />
              <Route exact path="/site/forms/sp102" element={<Sp102/>} />
              <Route exact path="/site/forms/submitted" element={<SubmittedForms/>} />
              <Route exact path={"/site/admin/forms"} element={<AdminForms/>} />
             </Routes>
          </Router>
        </Provider>
        </LoginProvider>
      </ChakraProvider>
    </div>
  )
}

export default App