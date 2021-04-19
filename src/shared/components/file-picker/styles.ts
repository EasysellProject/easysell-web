import { CSSProperties } from "react";
import { APP_COLORS } from "../../styles";

export default {
    container: {
        flex: 1,
        display: 'flex',
        minHeight: 144,
        alignItems: 'center',
        // padding: 16
        // backgroundColor: APP_COLORS.lightTurquoise,
        // borderWidth: 1,
        // borderColor: APP_COLORS.backgroundGray,
        // borderStyle: 'solid',
        // borderRadius: 8,
    } as CSSProperties,
    header: {
        fontSize: 16,
        fontWeight: 'bold',
        color: APP_COLORS.darkGreen
    } as CSSProperties,
    innerContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    } as CSSProperties,
    chooseFileButton: {
        backgroundColor: APP_COLORS.BUTTONS.chooseFile,
        paddingRight: 48,
        borderRadius: 10
    } as CSSProperties,
    chooseFileText: {
        color: 'black'
    } as CSSProperties,
}