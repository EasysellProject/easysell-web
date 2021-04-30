import { CSSProperties } from "react";
import { APP_COLORS } from "../../shared/styles";

export default {
    container: {

    },
    buttonText: {
        color: "white"
    },
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
    } as CSSProperties
}