import { CSSProperties } from "react";
import { APP_COLORS, WEB_STYLES } from "../../shared/styles";

export default {
    innerContainer: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        overflow: 'auto'
    } as CSSProperties,
    dataContainer: {
        display: 'flex',
        flex: 1,
        marginLeft: 24,
        marginRight: 24,
        marginTop: 40,
        paddingBottom: 12
    } as CSSProperties,
    spinner: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    } as CSSProperties,
    fullscreenSpinner: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.25)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    } as CSSProperties
}