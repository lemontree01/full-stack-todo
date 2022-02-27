import {Colors} from "../../../store/types/theme.types";

export default (colors: Colors, matches: boolean, isDone: boolean) => ({
    loadingCard: {
        width: matches ? 500 : '320px',
        minHeight: 60,
        backgroundColor: colors.secondary,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    circular: {
        color: colors.primary,
        position: 'absolute',
        zIndex: 1
    },
    innerText: {
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
    },
    todoCard: {
        width: matches ? 500 : '320px',
        minHeight: 60,
        backgroundColor: colors.secondary,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    todoText: {
        color: isDone ? colors.secondaryText : colors.primaryText,
        margin: '5px',
        fontWeight: '400',
        textDecoration: isDone ? "line-through" : 'none',
        wordWrap: 'break-word',
        maxWidth: matches ? '75%' : '60%',
        marginLeft: '10px',
        borderBottom: '1px solid ' + colors.secondary
    },
    todoInput: {
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
    },
    icons: {
        marginLeft: 'auto',
        display: 'flex',
        flexDirection: 'row'
    },
    iconStyle: {
        cursor: 'pointer',
        color: colors.primary,
        '&: hover': {
            color: colors.secondaryText
        },
        margin: '5px'
    }
})