import {Colors} from "../../store/types/theme.types";

export default (colors: Colors, authError: boolean, isAddButtonLoading: boolean) => ({
    outerBox: {
        minHeight: '90vh',
        maxWidth: '100vw',
        backgroundColor: colors.background,
        minWidth: '320px'
    },
    innerBox: {
        height: '100%'
    },
    card: {
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
    },
    header: {
        alignSelf: 'flex-start',
        marginTop: '20px',
        fontWeight: '500'
    },
    subHeader: {
        alignSelf: 'flex-start',
        color: colors.secondaryText,
        fontWeight: '500'
    },
    loginInput: {
        zIndex: 1,
        width: '100%',
        backgroundColor: colors.secondary,
        borderBottom: authError ? `1px solid #D2042D` : `1px solid ${colors.secondaryText}`,
        color: colors.primaryText
    },
    passwordInput: {
        zIndex: 1,
        width: '100%',
        backgroundColor: colors.secondary,
        borderBottom: authError ? `1px solid #D2042D` : `1px solid ${colors.secondaryText}`,
        color: colors.primaryText
    },
    error: {
        color: '#D2042D',
        height: '1em'
    },
    hintBox: {
        display: 'flex',
        flexDirection: 'row',
        gap: '5px'
    },
    hint: {
        color: colors.secondaryText,
        fontWeight: '700',
    },
    toggle: {
        color: colors.primary,
        fontWeight: '700',
        cursor: 'pointer'
    },
    loadingButton: {
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
    },
    circular: {
        color: colors.primary,
        height: '10px'
    }
})