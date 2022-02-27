import React, {useState} from 'react';
import Button from "@mui/material/Button";
import {useActions} from "../../../store/hooks/useActions";
import {useTypedSelector} from "../../../store/hooks/useTypedSelector";
import CircularProgress from '@mui/material/CircularProgress';
import Card from "@mui/material/Card";
import InputBase from "@mui/material/InputBase";
import AddIcon from '@mui/icons-material/Add';
import Tooltip from "@mui/material/Tooltip";
import useMediaQuery from "@mui/material/useMediaQuery";
import addTodoStyle from "./addTodoStyle"
import Typography from "@mui/material/Typography";

const AddTodo = () => {
    const { addTodo } = useActions()
    const [newTodoText, setNewTodoText] = useState<string>("")
    const {colors} = useTypedSelector(state => state.theme)
    const [isValidTodo, setIsValidTodo] = useState<boolean>(true)
    const addTodoHandler = async () => {
        if(newTodoText.length === 0 || newTodoText.length > 500) {
            setIsValidTodo(false)
            return
        }
        await addTodo(newTodoText)
        setIsAddingMode(!isAddingMode)
        setNewTodoText('')
        setIsValidTodo(true)
    }

    const isAddButtonLoading = useTypedSelector(state => state.todo.isAddButtonLoading)
    const todoInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewTodoText(event.target.value)
        if(event.target.value.length !== 0 && event.target.value.length < 500) {
            setIsValidTodo(true)
        }
    }
    const [isAddingMode, setIsAddingMode ] = useState<boolean>(false)
    const clickHandler = () => {
        setIsAddingMode(!isAddingMode)
    }
    const matches = useMediaQuery('(min-width:600px)')
    const styles = addTodoStyle(colors, matches, isAddButtonLoading, isValidTodo)
    if(!isAddingMode) {
        return (
            <Card sx={styles.card}>
                <Tooltip title='Add new'
                         placement="top">
                    <AddIcon sx={styles.addIcon}
                             onClick={clickHandler}/>
                </Tooltip>
            </Card>
        )
    } else
    return (
        <>
            <Card sx={styles.addCard}>
                <InputBase style={styles.todoInput}
                           placeholder={"Type your todo here..."}
                           multiline
                           value={newTodoText}
                           onChange={todoInputHandler}/>
            </Card>
            {!isValidTodo && <Typography variant="body1" sx={styles.error}>
                {newTodoText.length === 0 ? 'Todo cannot be empty' : 'Todo should be less than 500 symbols'}
            </Typography>}
            <Button variant="outlined" sx={styles.button}
                    onClick={addTodoHandler}>
                {isAddButtonLoading
                ?
                <CircularProgress sx={styles.circular}
                                  size={24}/>
                :
                'Add'}
            </Button>
        </>
    );
};

export default AddTodo;