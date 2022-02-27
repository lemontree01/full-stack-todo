import React, {useState} from 'react';
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DoneIcon from '@mui/icons-material/Done';
import {useActions} from "../store/hooks/useActions";
import {saveTodo} from "../store/actionCreators/todosActionCreators";
import {useTypedSelector} from "../store/hooks/useTypedSelector";
import lightColors from "../utils/lightThemeColors";
import darkColors from "../utils/darkThemeColors";
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import Tooltip from '@mui/material/Tooltip';
import InputBase from "@mui/material/InputBase"
import SaveAsIcon from '@mui/icons-material/SaveAs';
import CircularProgress from "@mui/material/CircularProgress";
import useMediaQuery from '@mui/material/useMediaQuery';

const Todo:React.FC<{
    text: string,
    _id: string,
    isDone: boolean
}> = ({text, _id, isDone}) => {
    const [isModifying, setIsModifying] = useState<boolean>(false)
    const [modifiedText, setModifiedText] = useState<string>(text)
    const { saveTodo, deleteTodo, setIsDone } = useActions()
    const {theme} = useTypedSelector(state => state.theme)
    const colors = theme === 1 ? lightColors : darkColors
    const modifyHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setModifiedText(event.target.value)
    }
    const loadingTodos = useTypedSelector(state => state.todo.loadingTodos)

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

    const matches = useMediaQuery('(min-width:600px)');
    console.log(matches)
    if (loadingTodos.includes(_id)) {
        return (
            <Card sx={{
                maxWidth: 500,
                minHeight: 60,
                backgroundColor: colors.secondary,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: '320px'
            }}>
            <CircularProgress sx={{
                color: colors.primary,
                position: 'absolute',
                zIndex: 1
            }}/>
                <Typography variant='h6' component='p' sx={{
                    zIndex: 0,
                    color: colors.secondary,
                    margin: '5px',
                    fontWeight: '400',
                    textDecoration: isDone ? "line-through" : 'none',
                    wordWrap: 'break-word',
                    width: '75%',
                    marginLeft: '10px',
                    borderBottom: '1px solid ' + colors.secondary,
                    userSelect: 'none'
                }}>{text}</Typography>
            </Card>
        )
    }

    return (
        <Card sx={{
            width: matches ? 500 : '320px',
            minHeight: 60,
            backgroundColor: colors.secondary,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center'
        }}>
            {!isModifying ?  <Typography variant='h6' component='p' sx={{
                    color: isDone ? colors.secondaryText : colors.primaryText,
                    margin: '5px',
                    fontWeight: '400',
                    textDecoration: isDone ? "line-through" : 'none',
                    wordWrap: 'break-word',
                    maxWidth: matches ? '75%' : '60%',
                    marginLeft: '10px',
                    borderBottom: '1px solid ' + colors.secondary
                }}>{text}</Typography> :
                 <InputBase style={{
                    padding: '0px',
                    zIndex: 1,
                    width: '100%',
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
                            multiline
                             value={modifiedText}
                             onChange={modifyHandler}/>}
            <Typography variant="subtitle1" component="p" sx={{
                marginLeft: 'auto',
                display: 'flex',
                flexDirection: 'row'
            }}>
                {
                    !isModifying ? <Tooltip title="Change" placement="top">
                    <AutoFixHighIcon onClick={isModifyingHandler} sx={{
                        cursor: 'pointer',
                        color: colors.primary,
                        '&: hover': {
                            color: colors.secondaryText
                        },
                        margin: '5px'
                    }}/>
                </Tooltip>
                        :
                    <Tooltip title='Save changes' placement="top">
                    <SaveAsIcon onClick={isModifyingHandler} sx={{
                    cursor: 'pointer',
                    color: colors.primary,
                    '&: hover' : {
                    color: colors.secondaryText
                },
                    margin: '5px'
                }}/>
                    </Tooltip>}
                <Tooltip title="Delete" placement="top">
                <DeleteOutlineIcon onClick={onDelete} sx={{
                    cursor: 'pointer',
                    color: colors.primary,
                    '&: hover' : {
                        color: colors.secondaryText
                    },
                    margin: '5px'
                }}/>
                </Tooltip>
                {
                    isDone ?
                        <Tooltip title="Check as done" placement="top">
                        <RestartAltIcon onClick={onToggle} sx={{
                    cursor: 'pointer',
                    color: colors.primary,
                    '&: hover' : {
                    color: colors.secondaryText
                },
                    margin: '5px',
                            marginRight: '10px'
                        }}/></Tooltip> : <Tooltip title="Uncheck" placement="top"><DoneIcon onClick={onToggle} sx={{
                        cursor: 'pointer',
                        color: colors.primary,
                        '&: hover' : {
                            color: colors.secondaryText
                        },
                        margin: '5px',
                        marginRight: '10px'
                        }}/></Tooltip>
                }
            </Typography>
        </Card>
    );
};

export default Todo;