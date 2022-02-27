import React, {useState} from 'react';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import {useActions} from "../store/hooks/useActions";
import LoadingButton from "@mui/lab/LoadingButton";
import {useTypedSelector} from "../store/hooks/useTypedSelector";
import lightColors from "../utils/lightThemeColors";
import darkColors from "../utils/darkThemeColors";
import CircularProgress from '@mui/material/CircularProgress';
import Card from "@mui/material/Card";
import InputBase from "@mui/material/InputBase";
import AddIcon from '@mui/icons-material/Add';
import Tooltip from "@mui/material/Tooltip";
import useMediaQuery from "@mui/material/useMediaQuery";

const AddTodo = () => {
    const { addTodo } = useActions()
    const [newTodoText, setNewTodoText] = useState<string>("")
    const {theme} = useTypedSelector(state => state.theme)
    const colors = theme === 1 ? lightColors : darkColors
    const [isValidTodo, setIsValidTodo] = useState<boolean>(true)
    const addTodoHandler = async () => {
        console.log('clicked')
        if(!isValidTodo) {
            console.log('not a valid todo')
            return
        }
        await addTodo(newTodoText)
        setIsAddingMode(!isAddingMode)
        setNewTodoText('')
    }

    const isAddButtonLoading = useTypedSelector(state => state.todo.isAddButtonLoading)
    const todoInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewTodoText(event.target.value)
        if(event.target.value.length !== 0 && event.target.value.length < 500) {
            setIsValidTodo(true)
        } else {
            setIsValidTodo(false)
        }
    }
    const [isAddingMode, setIsAddingMode ] = useState<boolean>(false)
    const clickHandler = () => {
        setIsAddingMode(!isAddingMode)
    }
    const matches = useMediaQuery('(min-width:600px)')

    if(!isAddingMode) {
        return (
            <Card sx={{
                width: matches ? 500 : '320px',
                minHeight: 60,
                backgroundColor: colors.secondary,
                display: 'flex',
                flexDirection: 'row'
            }}>
                <Tooltip title='Add new' placement="top">
                    <AddIcon sx={{
                        margin: '20px auto',
                        color: colors.primary,
                        cursor: 'pointer',
                        '&: hover': {
                            color: colors.secondaryText
                        }
                    }}
                             onClick={clickHandler}
                    />
                </Tooltip>
            </Card>
        )
    } else
    return (
        <>
            <Card sx={{
                width: matches ? 500 : '320px',
                minHeight: 60,
                backgroundColor: colors.secondary,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center'
            }}>
                <InputBase style={{
                    padding: '0px',
                    zIndex: 1,
                    width: '96%',
                    backgroundColor: colors.secondary,
                    color: colors.primaryText,
                    minHeight: 35,
                    fontSize: '1.25rem',
                    lineHeight: '1.6',
                    margin: '5px',
                    marginLeft: '10px',
                    letterSpacing :'0.0075em',
                    borderBottom: '1px solid ' + colors.primary,
                }} id="todo-input"
                           placeholder="Type your todo here..."
                           multiline
                           value={newTodoText}
                           onChange={todoInputHandler}/>
            </Card>

            <Button variant="outlined" sx={{
                marginBottom: '20px',
                alignSelf: 'center',
                border: `1px solid ${colors.primary}`,
                color: colors.primary,
                width: '100px',
                '&:hover': {
                    backgroundColor: !isAddButtonLoading ? colors.primary : colors.background,
                    color: colors.secondary,
                    borderColor: colors.primary
                }
            }} onClick={addTodoHandler}>{isAddButtonLoading ? <CircularProgress
            sx={{
                color: colors.primary,
                height: '10px'
            }}
            size={24}
            /> : 'Add'}</Button>

        </>
    );
};

export default AddTodo;