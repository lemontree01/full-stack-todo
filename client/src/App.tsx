import React, {useEffect, useState} from 'react';
import './App.css';
import AppRoutes from "./components/AppRoutes/AppRoutes";
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
import NavBar from "./components/NavBar/NavBar";

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
            <NavBar />

          <AppRoutes />
      </BrowserRouter>

  );
}

export default App;
