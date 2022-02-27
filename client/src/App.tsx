import React, {useEffect, useState} from 'react';
import './App.css';
import AppRoutes from "./components/AppRoutes";
import {BrowserRouter} from "react-router-dom";
import {useActions} from "./store/hooks/useActions";
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar";
import lightColors from "./utils/lightThemeColors"
import darkColors from "./utils/darkThemeColors"
import {useTypedSelector} from "./store/hooks/useTypedSelector";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import Typography from '@mui/material/Typography'
import LogoutIcon from '@mui/icons-material/Logout';
import LightModeIcon from '@mui/icons-material/LightMode';
import {setLoadState} from "./store/actionCreators/userActionCreators";
import Box from '@mui/material/Box'

function App() {
    const {auth, setLoadState} = useActions()
    useEffect(() => {
        console.log('Set the state')
        setLoadState()
    }, [])
    const {theme} = useTypedSelector(state => state.theme)
    const colors = theme === 1 ? lightColors : darkColors
    const isLogin = useTypedSelector(state => state.user.isLogin)
    const {toggleTheme} = useActions()
    useEffect(() => {
        auth()
    }, [])
    const {logout} = useActions()
    const currentUser = useTypedSelector(state => state.user.login)
  return (
      <BrowserRouter>
          <AppBar position="static" sx={{
              background: colors.background,
              minWidth: '320px'
          }}>
              <Toolbar sx={{
                  background: colors.background,
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  height: '10vh'
              }}>
                  <Typography variant="h4" component="h1" sx={{
                      color: colors.primaryText,
                      marginLeft: '5vw'
                  }}>
                      My app

                  </Typography>
                  <div style={{
                      marginLeft: 'auto',
                      marginRight: '5vw',
                      display: 'flex',
                      flexDirection: 'row'
                  }}>
                      {
                          isLogin && <Typography variant="h6" component="h6" sx={{
                              marginRight: '3vw',
                          color: colors.primaryText,
                          fontWeight: '500'
                          }}>
                              {currentUser}
                          </Typography>
                      }
                      {isLogin && <LogoutIcon sx={{
                          marginLeft: 'auto',
                          cursor: 'pointer',
                          color: colors.primaryText,
                          marginRight: '3vw'
                      }} onClick={logout}/>}
                  {
                      theme === 1 ? <DarkModeIcon sx={{
                              cursor: 'pointer',
                              color: colors.primaryText
                          }} onClick={toggleTheme}
                          /> :
                          <LightModeIcon sx={{
                              cursor: 'pointer',
                              color: colors.primaryText
                          }} onClick={toggleTheme}
                          />
                  }
               </div>

              </Toolbar>
          </AppBar>
          <div className="App" style={{
              minHeight: '90vh',
              maxWidth: '100vw',
              backgroundColor: colors.background,
              minWidth: '320px'
          }}>
                  <AppRoutes />
              </div>
      </BrowserRouter>

  );
}

export default App;
