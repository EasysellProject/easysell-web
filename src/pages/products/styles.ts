import { CSSProperties } from "react";
import { APP_COLORS } from "../../shared/styles";

export default {
    container: {
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        overflow: 'auto',
    } as CSSProperties,
    tableContainer: {
        display: 'flex',
        flex: 1,
        marginLeft: 24,
        marginRight: 24,
        marginTop: 40,
        paddingBottom: 12
    },
    spinnerContainer: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    } as CSSProperties,
    spinner: {
        color: APP_COLORS.ligthBlue
    }
}