import { CSSProperties } from "react";
export default {
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
        borderRadius: 12
    } as CSSProperties,
    image: {
        width: '20%',
        height: '20%'
    },
    text: {
        marginTop: 12,
        fontSize: 16
    } as CSSProperties
}