import { CSSProperties } from "react";
import { APP_COLORS } from "../../../styles";

export default {
    container: {
        padding: 24
    } as CSSProperties,
    innerContainer: {
        flex: 1,
        display: 'flex',
        backgroundColor: APP_COLORS.lightTurquoise,
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        padding: 24,
    } as CSSProperties,
    inputStyle: {
        flex: 1,
        minWidth: 250,
    } as CSSProperties,
    priceInput: {
        minWidth: 100,
    } as CSSProperties,
    inputContainer: {
        marginLeft: 16,
        marginTop: 8
    } as CSSProperties,
    filePickerContainer: {
        display: 'flex',
        alignItems: 'center',
        marginTop: 8,
        marginLeft: 24,
        marginRight: 12,
        padding: 16
    } as CSSProperties,
    image: {
        height: 80,
        width: 80,
        borderRadius: '50%'
    } as CSSProperties,
    buttons: {
        display: 'flex',
        justifyContent: 'space-between',
        marginRight: 24,
        marginLeft: 24,
        marginBottom: 24
    } as CSSProperties,
    cancelButton: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 100,
        backgroundColor: APP_COLORS.BUTTONS.grayButton,
        borderRadius: 12
    } as CSSProperties,
    finalizeButton: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 100,
        backgroundColor: APP_COLORS.BUTTONS.green,
        borderRadius: 12
    } as CSSProperties,
    cancelText: {
        color: APP_COLORS.gray
    } as CSSProperties,
    finalizeText: {
        color: APP_COLORS.gray
    } as CSSProperties
}