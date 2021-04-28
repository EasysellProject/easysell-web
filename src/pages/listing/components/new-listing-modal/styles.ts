import { CSSProperties } from "react";
import { APP_COLORS } from "../../../../shared/styles";

export default {
    container: {
        flex: 1,
        display: 'flex',
        padding: 36
    } as CSSProperties,
    innerContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 36
    } as CSSProperties,
    card: {
        padding: 2,
        marginLeft: 6,
        marginRight: 6,
        boxShadow: " 1px 1px 12px 0px gray",
    } as CSSProperties,
    img: {
        width: 150,
        height: 150
    } as CSSProperties,
    cardInner: {
        display: 'flex',
        flexDirection: 'column'
    } as CSSProperties,
    closeButton: {
        alignSelf: 'flex-start',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 100,
        backgroundColor: APP_COLORS.lightTurquoise,
        marginBottom: 12,
        borderRadius: 12
    } as CSSProperties,
    spinner: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    } as CSSProperties
}