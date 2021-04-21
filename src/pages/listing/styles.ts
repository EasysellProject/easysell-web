import { CSSProperties } from "react";
import { APP_COLORS, WEB_STYLES } from "../../shared/styles";

export default {
    innerContainer: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column'
    } as CSSProperties,
    tableContainer: {
        display: 'flex',
        flex: 1,
        marginLeft: 24,
        marginRight: 24,
        marginTop: 40,
        paddingBottom: 12
    } as CSSProperties,
}