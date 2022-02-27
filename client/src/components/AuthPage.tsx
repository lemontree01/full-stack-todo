import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button"
import {useActions} from "../store/hooks/useActions";
import Card from "@mui/material/Card"
import lightColors from "../utils/lightThemeColors"
import darkColors from "../utils/darkThemeColors"
import {useTypedSelector} from "../store/hooks/useTypedSelector";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase"
import LoadingButton from '@mui/lab/LoadingButton';

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

    return (
        <Box sx={{
            height: '100%'
        }}>
        <Card sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: 2,
            color: colors.primaryText,
            width: '20vw',
            margin: '0 auto',
            minWidth: '320px',
            backgroundColor: colors.secondary,
            padding: '20px'
        }}>
            <Typography variant="h5" component="h2" sx={{
                alignSelf: 'flex-start',
                marginTop: '20px',
                fontWeight: '500'
            }}>
                {isRegister ? 'Register' : 'Login'}
            </Typography>
            <Typography variant="body1" component="p" sx={{
                alignSelf: 'flex-start',
                color: colors.secondaryText,
                fontWeight: '500'
            }}>
                {isRegister ? registerMessage : loginMessage }
            </Typography>
            <InputBase
                style={{
                    zIndex: 1,
                    width: '100%',
                    backgroundColor: colors.secondary,
                    borderBottom: authError ? `1px solid #D2042D` : `1px solid ${colors.secondaryText}`,
                    color: colors.primaryText
                }}
                id="auth-login" value={login} onChange={handleLoginChange}
                placeholder={"Login"}
            />
            <InputBase style={{
                zIndex: 1,
                width: '100%',
                backgroundColor: colors.secondary,
                borderBottom: authError ? `1px solid #D2042D` : `1px solid ${colors.secondaryText}`,
                color: colors.primaryText
            }}
                type="password" id="auth-password" placeholder="Password"  value={password}
                onChange={handlePasswordChange}
                fullWidth
            />
            <Typography variant="body2" component="p" sx={{
                color: '#D2042D',
                height: '1em'
            }}>
                {authError}
            </Typography>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                gap: '5px'
            }}>
                <Typography variant="body2" component="p" sx={{
                    color: colors.secondaryText,
                    fontWeight: '700',
                }}
                onClick={handleChange}
                >
                    {isRegister ? registerHint[0] : loginHint[0]}
                </Typography>
                <Typography variant="body2" component="p" sx={{
                    color: colors.primary,
                    fontWeight: '700',
                    cursor: 'pointer'
                }}
                            onClick={handleChange}
                >
                    {isRegister ? registerHint[1] : loginHint[1]}
                </Typography>
            </div>
            <LoadingButton loading={isLoading} sx={{
                marginBottom: '20px',
                alignSelf: 'center',
                border: `1px solid ${colors.primary}`,
                color: colors.primary,
                width: '100px',
                '&:hover': {
                    backgroundColor: colors.primary,
                    color: colors.secondary,
                    borderColor: colors.primary
                },
                '&:disabled': {
                    marginBottom: '20px',
                    alignSelf: 'center',
                    border: `1px solid ${colors.primary}`,
                    color: colors.secondary,
                    width: '100px'
                }
            }} variant="outlined" onClick={buttonHandler}>{isRegister ? 'Register' : 'Login'}</LoadingButton>
        </Card>

        </Box>
    );
};

export default AuthPage;