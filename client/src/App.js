import React from 'react'
import { 
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { initializeIcons } from '@fluentui/react';
import Sp101 from './Forms/Sp101';
import Sp102 from './Forms/Sp102';
import NavBar from './NavBar';
import Dashboard from './Login/Dashboard'
import { LoginProvider } from './Login/LoginContext';
import SubmittedForms from './Forms/SubmittedForms';
import { ChakraProvider } from '@chakra-ui/react'
import AdminForms from "./Admin/AdminForms";
import './Styles/main.css'
import Budget from "./Admin/Budget";
import Deny from './Admin/Deny';
import Profile from './Profile/Profile';
import Accept from './Admin/Accept'
import Activities from './Profile/Activities';
import Notifications from './Profile/Notifications';
import StatusSP101 from './Status/StatusSP101'
import Download from './Admin/Download';
initializeIcons();

const App = () => {
  return (
    <div className='mainApp'>
      <ChakraProvider>
        <LoginProvider>
          <Router>  
          <NavBar/>
            <Routes>
              <Route index element={<Dashboard/>}/>
              <Route exact path="/site/" element={<Dashboard/>} />

              <Route exact path="/site/forms/submitted" element={<SubmittedForms/>} />
              <Route exact path="/site/forms/submitted/response/:id" element={<Response/>} />
              
              <Route exact path="/site/forms/sp101" element={<Sp101/>} />

              <Route exact path="/site/forms/sp102" element={<Sp102/>} />
              <Route exact path="/site/forms/sp102/:id" element={<Sp102/>} />

              <Route exact path="/site/admin/forms" element={<AdminForms/>} />
              <Route exact path={"/site/admin/forms/budget/:id"} element={<Budget/>} />
              <Route exact path={"/site/admin/forms/deny/:id/:role"} element={<Deny/>} />
              <Route exact path={"/site/admin/forms/accept/:id/:role"} element={<Accept/>} />
              <Route exact path={"/site/admin/forms/download/:id"} element={<Download/>} />
              <Route exact path={"/site/profile/"} element={<Profile/>}/>
              <Route exact path={"/site/admin/activity"} element={<Activities/>} />
              <Route exact path={"/site/admin/notification"} element={<Notifications/>} />
              <Route exact path= {"site/forms/submitted/response/:id/status"} element = {<StatusSP101/>}/>

            </Routes>
          </Router>
        </LoginProvider>
      </ChakraProvider>
    </div>
  )
}

export default App