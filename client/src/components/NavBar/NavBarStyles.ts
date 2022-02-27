import {Colors} from "../../store/types/theme.types";

export default (colors:Colors) => ({
    AppBar: {
        background: colors.background,
        minWidth: '320px',
        position: 'static'
    },
    ToolBar: {
        background: colors.background,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        height: '10vh'
    },
    logo: {
        color: colors.primaryText,
        marginLeft: '5vw'
    },
    rightSide: {
        marginLeft: 'auto',
        marginRight: '5vw',
        display: 'flex',
        flexDirection: 'row'
    },
    user: {
        marginRight: '3vw',
        color: colors.primaryText,
        fontWeight: '500'
    },
    logout: {
        marginLeft: 'auto',
        cursor: 'pointer',
        color: colors.primaryText,
        marginRight: '3vw'
    },
    darkMode: {
        cursor: 'pointer',
        color: colors.primaryText
    },
    lightMode: {
        cursor: 'pointer',
        color: colors.primaryText
    }

})