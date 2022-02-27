import React from 'react';
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import LogoutIcon from "@mui/icons-material/Logout";
import Box from "@mui/material/Box"
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import {useTypedSelector} from "../../store/hooks/useTypedSelector";
import {useActions} from "../../store/hooks/useActions";
import {toggleTheme} from "../../store/actionCreators/themeActionCreators";
import NavBarStyles from "./NavBarStyles";


const NavBar = () => {
    const { colors, theme } = useTypedSelector(state => state.theme)
    const { isLogin, login } = useTypedSelector(state => state.user)
    const { toggleTheme, logout } = useActions()
    const styles = NavBarStyles(colors)

    return (
        <AppBar sx={styles.AppBar}>
            <Toolbar sx={styles.ToolBar}>
                <Typography variant="h4"
                            component="h1"
                            sx={styles.logo}>My app
                </Typography>
                <Box sx={styles.rightSide}>
                    {isLogin &&
                        <>
                            <Typography variant="h6"
                                        component="h6"
                                        sx={styles.user}>{login}
                            </Typography>
                            <LogoutIcon sx={styles.logout} onClick={logout}
                            />
                        </>}
                    {theme === 1 ?
                        <DarkModeIcon sx={styles.darkMode}
                                      onClick={toggleTheme}
                        />
                        :
                        <LightModeIcon sx={styles.lightMode}
                                       onClick={toggleTheme}
                        />}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;