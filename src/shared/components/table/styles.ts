import { CSSProperties } from "react";
import { APP_COLORS } from "../../styles";

export default {
    headerContainer: {
        display: 'flex',
        width: '100%',
        alignSelf: 'flex-start',
        flexDirection: 'row',
    } as CSSProperties,
    headerText: {
        flex: 1,
        textAlign: 'center',
        color: APP_COLORS.textGreen,
        fontWeight: 'bold'
    } as CSSProperties,
}