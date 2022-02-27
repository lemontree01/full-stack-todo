import {Colors} from "../../../store/types/theme.types";

export default (
    colors: Colors,
    matches: boolean,
    isAddButtonLoading: boolean,
    isValidTodo: boolean) => ({
    card: {
        width: matches ? 500 : '320px',
        minHeight: 60,
        backgroundColor: colors.secondary,
        display: 'flex',
        flexDirection: 'row'
    },
    addIcon: {
        margin: '20px auto',
        color: colors.primary,
        cursor: 'pointer',
        '&: hover': {
            color: colors.secondaryText
        }
    },
    addCard: {
        width: matches ? 500 : '320px',
        minHeight: 60,
        backgroundColor: colors.secondary,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    todoInput: {
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
        borderBottom: isValidTodo ? `2px solid ${colors.primary}` : '2px solid #D2042D',
    },
    button: {
        marginBottom: '20px',
        alignSelf: 'center',
        border: `1px solid ${colors.primary}`,
        color: colors.primary,
        width: '100px',
        '&:hover': {
            backgroundColor: colors.secondary,
            color: colors.secondary,
            borderColor: colors.primary
        }
    },
    circular: {
        color: colors.primary,
        height: '10px'
    },
    error: {
        color: '#D2042D'
    }
})