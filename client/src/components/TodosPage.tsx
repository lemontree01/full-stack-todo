import React, {useEffect} from 'react';
import Box from "@mui/material/Box";
import Card from "@mui/material/Card"
import Typography from "@mui/material/Typography"
import CircularProgress from '@mui/material/CircularProgress';

import {useActions} from "../store/hooks/useActions";
import {useTypedSelector} from "../store/hooks/useTypedSelector";
import Todo from "./Todo";
import AddTodo from "./AddTodo";
import lightColors from "../utils/lightThemeColors";
import darkColors from "../utils/darkThemeColors";

const TodosPage = () => {
    const {fetchTodos} = useActions()
    const todos = useTypedSelector(state => state.todo.todos)
    useEffect(() => {
        fetchTodos()
    }, [])
    const {theme} = useTypedSelector(state => state.theme)
    const colors = theme === 1 ? lightColors : darkColors

    const {logout} = useActions()
    const isLoading = useTypedSelector(state => state.todo.isLoading)

    if(isLoading) {
        return (
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2
            }}>
                <CircularProgress sx={{
                    color: colors.primaryText
                }}/>
            </Box>

        )
    }

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
            minHeight: '90vh',
            width: '100vw',
            overflow: 'visible'
        }}>
            {todos.length ? todos.map(todo =>
                <Todo key={todo._id} text={todo.name} _id={todo._id} isDone={todo.isDone}/>
            ) :
                <></>
            }
            <AddTodo />
        </Box>
    );
};

export default TodosPage;