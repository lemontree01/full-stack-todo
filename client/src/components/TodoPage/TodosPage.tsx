import React, {useEffect} from 'react';
import Box from "@mui/material/Box";
import CircularProgress from '@mui/material/CircularProgress';
import {useActions} from "../../store/hooks/useActions";
import {useTypedSelector} from "../../store/hooks/useTypedSelector";
import Todo from "./Todo/Todo";
import AddTodo from "./AddTodo/AddTodo";
import todoPageStyles from "./todoPageStyles"


const TodosPage = () => {
    const {fetchTodos} = useActions()
    const todos = useTypedSelector(state => state.todo.todos)
    const {colors} = useTypedSelector(state => state.theme)
    const isLoading = useTypedSelector(state => state.todo.isLoading)
    const styles = todoPageStyles(colors)

    useEffect(() => {
        fetchTodos()
    }, [])

    return (
        <Box sx={styles.outerBox}>
            {isLoading ?
                    <Box sx={styles.loadingBox}>
                        <CircularProgress sx={styles.CircularProgress}/>
                    </Box>
                :
                    <Box sx={styles.todoBox}>
                        {todos.length !== 0 && todos.map(todo =>
                                <Todo key={todo._id}
                                      text={todo.name}
                                      _id={todo._id}
                                      isDone={todo.isDone}/>)}
                        <AddTodo />
                    </Box>}
        </Box>
    )
};

export default TodosPage;