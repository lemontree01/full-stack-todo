import {Colors} from "../../store/types/theme.types";

export default (colors: Colors) => ({
    outerBox: {
        minHeight: '90vh',
        maxWidth: '100vw',
        backgroundColor: colors.background,
        minWidth: '320px'
    },
    loadingBox: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2
    },
    CircularProgress: {
        color: colors.primaryText
    },
    todoBox: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        minHeight: '90vh',
        width: '100vw',
        overflow: 'visible'
    }
})