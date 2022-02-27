import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button"
import {useActions} from "../../store/hooks/useActions";
import Card from "@mui/material/Card"
import lightColors from "../../utils/lightThemeColors"
import darkColors from "../../utils/darkThemeColors"
import {useTypedSelector} from "../../store/hooks/useTypedSelector";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase"
import LoadingButton from '@mui/lab/LoadingButton';
import authPageStyles from "./authPageStyles"
import CircularProgress from "@mui/material/CircularProgress";


const AuthPage = () => {
    const {removeAuthError} = useActions()

    const [ login, setLogin ]= useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [isRegister, setIsRegister] = useState<boolean>(false)
    useEffect(() => {
        removeAuthError()
    }, [isRegister])
    const {register, login: userLogin} = useActions()
    const {theme} = useTypedSelector(state => state.theme)
    const colors = theme === 1 ? lightColors : darkColors
    const authError = useTypedSelector(state => state.errors.authError)

    const handleLoginChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLogin(event.target.value)
    }

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }

    const handleChange = () => {
        setIsRegister(!isRegister);
    }

    const isLoading = useTypedSelector(state => state.user.isLoading)

    const buttonHandler = () => {
        if (isRegister)
            register(login, password)
        else
            userLogin(login, password)
    }

    const registerMessage = 'Don\'t have an account? Sign up here'
    const loginMessage = 'Sign in to continue'

    const registerHint = ['Have an account? ', 'Sign in']
    const loginHint = ['Don\'t have an account? ', 'Sign up']

    const styles = authPageStyles(colors, !!authError, isLoading)

    return (
        <Box sx={styles.outerBox}>
            <Box sx={styles.innerBox}>
                <Card sx={styles.card}>

                    <Typography variant="h5"
                                component="h2"
                                sx={styles.header}>
                        {isRegister ? 'Register' : 'Login'}
                    </Typography>

                    <Typography variant="body1"
                                component="p"
                                sx={styles.subHeader}>
                        {isRegister ? registerMessage : loginMessage }
                    </Typography>

                    <InputBase
                        style={styles.loginInput}
                        value={login}
                        onChange={handleLoginChange}
                        placeholder={"Login"}/>

                    <InputBase style={styles.passwordInput}
                               type="password"
                               placeholder="Password"
                               value={password}
                               onChange={handlePasswordChange}
                               fullWidth/>

                    <Typography variant="body2"
                                component="p"
                                sx={styles.error}>{authError}</Typography>

                    <Box sx={styles.hintBox}>

                        <Typography variant="body2"
                                    component="p"
                                    sx={styles.hint}
                                    onClick={handleChange}>
                            {isRegister ? registerHint[0] : loginHint[0]}
                        </Typography>

                        <Typography variant="body2" component="p" sx={styles.toggle}
                                    onClick={handleChange}>
                            {isRegister ? registerHint[1] : loginHint[1]}
                        </Typography>

                    </Box>
                    <LoadingButton sx={styles.loadingButton}
                                   variant="outlined"
                                   onClick={buttonHandler}>
                        {isLoading ?  <CircularProgress sx={styles.circular}
                                                        size={24}/> : isRegister ? 'Register' : 'Login'}
                    </LoadingButton>
                </Card>
            </Box>
        </Box>
    );
};

export default AuthPage;