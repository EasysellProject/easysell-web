import { CSSProperties } from "react";
import { APP_COLORS } from "../../styles";

export default {
    container: {
        marginTop: 8,
        position: 'relative',
    } as CSSProperties,
    innerContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        overflow: 'hidden',
        backgroundColor: 'white',
        marginTop: 8,
        borderWidth: 1,
        // borderRadius: 8,
        paddingLeft: 8,
        paddingTop: 6,
        paddingBottom: 6,
        borderStyle: 'solid',
        borderColor: APP_COLORS.lightGray,
        minWidth: 250,
        maxWidth: 480
    } as CSSProperties,
    pickerLabel: {
        fontWeight: 'bold'
    } as CSSProperties,
    selectedItem: {
        color: APP_COLORS.gray,
        fontSize: 16
    } as CSSProperties,
    openedPicker: {
        display: 'flex',
        width: '99%',
        flexDirection: 'column',
        position: 'absolute',
        marginTop: -3,
        marginLeft: 1,
        backgroundColor: 'white',
        overflowY: 'scroll',
        maxHeight: 108,
        paddingTop: 12,
        paddingBottom: 12,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: APP_COLORS.lightGray
    } as CSSProperties,
    pickerItem: {
        display: 'flex',
        flex: 1,
        paddingLeft: 12,
        paddingRight: 12,
        marginBottom: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
    } as CSSProperties,
    pickerItemText: {
        fontSize: 16,
        color: APP_COLORS.BUTTONS.darkGray
    } as CSSProperties
}