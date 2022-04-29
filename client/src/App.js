import React from 'react'
import {Provider} from 'react-redux'
import {store} from './Store/store'
import { 
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { initializeIcons } from '@fluentui/react';
import Sp101 from './Forms/Sp101';
import Sp102 from './Forms/Sp102';
import Sp101Draft from './Drafts/sp101Draft';
import NavBar from './NavBar';
import Dashboard from './Login/Dashboard'
import { LoginProvider } from './Login/LoginContext';
import SubmittedForms from './Forms/SubmittedForms';
import { ChakraProvider } from '@chakra-ui/react'
import AdminForms from "./Admin/AdminForms";
import Response from './Forms/Response';
import './Styles/main.css'
import Budget from "./Admin/Budget";
import Drafts from './Drafts/Drafts';
import Deny from './Admin/Deny';
import { Upload } from './Forms/upload';
import Profile from './Profile/Profile';
initializeIcons();

const App = () => {
  return (
    <div className='mainApp'>
      <ChakraProvider>
        <LoginProvider>
        <Provider store={store}>
          <Router>  
          <NavBar/>
            <Routes>
              <Route index element={<Dashboard/>}/>
              <Route exact path="/site/" element={<Dashboard/>} />

              <Route exact path="/site/drafts" element={<Drafts/>} />
              <Route exact path="/site/forms/submitted" element={<SubmittedForms/>} />
              <Route exact path="/site/forms/submitted/response/:id" element={<Response/>} />
              
              <Route exact path="/site/forms/sp101" element={<Sp101/>} />
              <Route exact path="/site/forms/sp101/:type/:id" element={<Sp101Draft/>} />

              <Route exact path="/site/forms/sp102" element={<Sp102/>} />

              <Route exact path="/site/admin/forms" element={<AdminForms/>} />
              <Route exact path={"/site/admin/forms/budget/:id"} element={<Budget/>} />
              <Route exact path={"/site/admin/forms/deny/:id"} element={<Deny/>} />
              <Route exact path={"/upload"} element={<Upload/>} />
              <Route exact path={"/site/profile/"} element={<Profile/>}/>
            </Routes>
          </Router>
        </Provider>
        </LoginProvider>
      </ChakraProvider>
    </div>
  )
}

export default App