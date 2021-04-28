import { CSSProperties } from "react";
import { APP_COLORS } from "../../shared/styles";

export default {
    container: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 20,
        backgroundColor: APP_COLORS.lightTurquoise,
        justifyContent: "space-between",
        height: "15%",
        width: '100%',
    } as CSSProperties,
    headerText: {
        fontFamily: "Times New Roman",
        fontWeight: 'bold',
        color: APP_COLORS.gray,
        fontSize: 36,
    } as CSSProperties,
    headerActions: {
        marginTop: 8,
        flexDirection: 'row',
        display: 'flex'
    } as CSSProperties,
    searchButton: {
        backgroundColor: APP_COLORS.BUTTONS.green,
        borderTopRightRadius: 12,
        borderBottomRightRadius: 12,
        marginLeft: 0,
    } as CSSProperties,
    newOrderButton: {
        backgroundColor: APP_COLORS.BUTTONS.green,
        marginLeft: 8,
        height: 35,
        width: 200,
    } as CSSProperties,
    newOrderButtonInner: {
        display: 'flex',
        flexDirection: 'row'
    } as CSSProperties,
    newOrderText: {
        fontFamily: "Times New Roman",
        color: APP_COLORS.gray,
        fontSize: 14,
        marginLeft: 4
    } as CSSProperties
}