import axios from 'axios';
import React, {useState, useEffect } from 'react';
import HomeComponent from '../../Components/HomeComponent';
import Login from "../../Services/Login";
import Dashboard from "../../Services/Dashboard";
import { setUserSession, getToken, removeUserSession } from '../../Utils/Common';
import 
{
    BrowserRouter,
    Routes,
    Route,
    NavLink
} 
from "react-router-dom";
import './css/App.css';


  function App({ component: Component, ...rest }) 
  {
    const [authLoading, setAuthLoading] = useState(true);
    useEffect(() => {
      const token = getToken();
      if (!token) {
        return;
      }
      axios.get(`http://localhost:8080/verifyToken?token=${token}`).then(response => {
      setUserSession(response.data.token, response.data.user);
      setAuthLoading(false);
    }).catch(error => {
      removeUserSession();
      setAuthLoading(false);
    });
  }, []);
 
  if (authLoading && getToken()) {
    return <div className="content">Checking Authentication...</div>
  }
    return (
      <div className="App">
      <BrowserRouter>
        <div>
          <div className="header">
            <NavLink  exact  path="/">Home</NavLink>
            <NavLink  to="/login">Login</NavLink><small>(Access without token only)</small>
            <NavLink  to="/dashboard">Dashboard</NavLink><small>(Access with token only)</small>
          </div>
          <div className="content">
            <Routes>
              <Route exact path="/" element={<HomeComponent />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/dashboard" element={<Dashboard />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
    );
  }
  
export default App;
