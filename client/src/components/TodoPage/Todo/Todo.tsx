import React, {useState} from 'react';
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DoneIcon from '@mui/icons-material/Done';
import {useActions} from "../../../store/hooks/useActions";
import {saveTodo} from "../../../store/actionCreators/todosActionCreators";
import {useTypedSelector} from "../../../store/hooks/useTypedSelector";
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import Tooltip from '@mui/material/Tooltip';
import InputBase from "@mui/material/InputBase"
import SaveAsIcon from '@mui/icons-material/SaveAs';
import CircularProgress from "@mui/material/CircularProgress";
import useMediaQuery from '@mui/material/useMediaQuery';
import todoStyles from "./todoStyles"

interface TodoProps {
    text: string,
    _id: string,
    isDone: boolean
}

const Todo:React.FC<TodoProps> = ({text, _id, isDone}) => {
    const [isModifying, setIsModifying] = useState<boolean>(false)
    const [modifiedText, setModifiedText] = useState<string>(text)

    const { saveTodo, deleteTodo, setIsDone } = useActions()
    const {colors} = useTypedSelector(state => state.theme)
    const loadingTodos = useTypedSelector(state => state.todo.loadingTodos)

    const matches = useMediaQuery('(min-width:600px)')

    const styles = todoStyles(colors, matches, isDone)

    const modifyHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setModifiedText(event.target.value)
    }

    const isModifyingHandler = () => {
        setIsModifying(!isModifying)
        saveTodo(_id, modifiedText)
    }

    const onDelete = () => {
        deleteTodo(_id)
    }

    const onToggle = () => {
        setIsDone(!isDone,_id)
    }

    if (loadingTodos.includes(_id))
        return (
            <Card sx={styles.loadingCard}>
                <CircularProgress sx={styles.circular}/>
                <Typography variant='h6' component='p' sx={styles.innerText}>{text}</Typography>
            </Card>)
    else
        return (
        <Card sx={styles.todoCard}>
            {!isModifying ?
                <Typography variant='h6'
                            component='p'
                            sx={styles.todoText}>{text}</Typography>
                :
                <InputBase sx={styles.todoInput}
                           multiline
                           value={modifiedText}
                           onChange={modifyHandler}/>}

                <Typography variant="subtitle1"
                            component="p"
                            sx={styles.icons}>
                {!isModifying ?
                    <Tooltip title="Change"
                             placement="top">
                        <AutoFixHighIcon onClick={isModifyingHandler}
                                         sx={styles.iconStyle}/>
                    </Tooltip>
                        :
                    <Tooltip title='Save changes'
                             placement="top">
                        <SaveAsIcon onClick={isModifyingHandler}
                                    sx={styles.iconStyle}/>
                    </Tooltip>}
                <Tooltip title="Delete"
                         placement="top">
                    <DeleteOutlineIcon onClick={onDelete}
                                       sx={styles.iconStyle}/>
                </Tooltip>
                    {isDone ?
                        <Tooltip title="Check as done"
                                 placement="top">
                            <RestartAltIcon onClick={onToggle} sx={{
                             ...styles.iconStyle,
                                marginRight: '10px'
                            }}/>
                        </Tooltip>
                        :
                        <Tooltip title="Uncheck"
                                 placement="top">
                            <DoneIcon onClick={onToggle}
                                      sx={{...styles.iconStyle,
                                          marginRight: '10px'
                            }}/>
                        </Tooltip>}
            </Typography>
        </Card>
    );
};

export default Todo;