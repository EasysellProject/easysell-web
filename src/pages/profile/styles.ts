import { CSSProperties } from "react";
import { APP_COLORS, WEB_STYLES } from "../../shared/styles";

export default {
    container: {
        ...WEB_STYLES.flexColum,
        ...WEB_STYLES.flexWrap,
        flex: 1
    } as CSSProperties,
    headerContainer: {
        padding: 20,
        display: "flex",
        backgroundColor: APP_COLORS.lightTurquoise,
        ...WEB_STYLES.flexRow,
        ...WEB_STYLES.flexWrap,
        justifyContent: "left",
        height: "10%",
        alignItems: "center"
    } as CSSProperties,
    innerContainer: {
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
    } as CSSProperties,
    inputContainer: {
        display: "flex",
        flexDirection: 'row',
        alignItems: "center",
        marginTop: 16
    } as CSSProperties,
    button: {
        backgroundColor: APP_COLORS.lightGreen,
        margin: 10,
        justifyContent: 'center',
        borderRadius: 8,
        minWidth: "100"
    } as CSSProperties,
    buttonText: {
        fontSize: 12,
        color: APP_COLORS.gray
    },
    buttonIcon: {
        marginLeft: 4
    },
    buttonsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    } as CSSProperties,
}