import { CSSProperties } from "react";
import { APP_COLORS } from "../../shared/styles";

export default {
    container: {
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
    } as CSSProperties,
    tableContainer: {
        display: 'flex',
        flex: 1,
        marginLeft: 24,
        marginRight: 24,
        marginTop: 40,
        paddingBottom: 12
    }
}