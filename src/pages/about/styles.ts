import { CSSProperties } from "react";
import { APP_COLORS, WEB_STYLES } from "../../shared/styles";

export default {
    body: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        overflow: 'auto'
    } as CSSProperties,
    posterContainer: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        marginLeft: 24,
        marginRight: 0,
        marginTop: 20,
        paddingBottom: 12
    } as CSSProperties,
    header: {
        padding: 20,
        backgroundColor: APP_COLORS.lightTurquoise,
        ...WEB_STYLES.flexRow,
        justifyContent: "space-between",
        height: "15%",
        width: '100%',
        ...WEB_STYLES.flexWrap
    } as CSSProperties,
    headerText: {
        fontFamily: "Times New Roman",
        fontWeight: 'bold',
        color: APP_COLORS.gray,
        fontSize: 36,
    } as CSSProperties,
    multiChannelText: {
        maxWidth: '100%',
        color: APP_COLORS.textGreen,
        fontSize: 28,
    },
    manageText: {
        fontSize: 18,
        maxWidth: '100%',
    }
}