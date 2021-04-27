import { CSSProperties } from "react";
import { APP_COLORS, WEB_STYLES } from "../../../../shared/styles";

export default {
    headerText: {
        fontFamily: "Times New Roman",
        fontWeight: 'bold',
        color: APP_COLORS.gray,
        fontSize: 36,
    } as CSSProperties,
    innerContainer: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column'
    } as CSSProperties,
    listing_count_text: {
        color: APP_COLORS.gray,
        fontSize: 14
    } as CSSProperties,
    listing: {
        ...WEB_STYLES.flexRow,
    } as CSSProperties,
    header: {
        padding: 20,
        backgroundColor: APP_COLORS.lightTurquoise,
        ...WEB_STYLES.flexRow,
        justifyContent: "space-between",
        height: "15%",
        width: '100%',
        ...WEB_STYLES.flexWrap
    } as CSSProperties,
    search_area: {
        ...WEB_STYLES.flexRow,
    } as CSSProperties,
    searchButton: {
        backgroundColor: APP_COLORS.BUTTONS.green,
        borderTopRightRadius: 12,
        borderBottomRightRadius: 12,
        marginLeft: 0,
    } as CSSProperties,
    create_new_button_style: {
        backgroundColor: APP_COLORS.BUTTONS.green,
        marginLeft: 8,
        height: 35,
        width: 100,
    } as CSSProperties,
    create_new_button_inner_style: {
        ...WEB_STYLES.flexRow,
    } as CSSProperties,
    createNewText: {
        fontFamily: "Times New Roman",
        color: APP_COLORS.gray,
        fontSize: 12,
        marginLeft: 4
    } as CSSProperties,
    filter_text: {
        fontFamily: "Arial",
        color: "black",
        fontSize: 14
    } as CSSProperties,
    drop_down_style: {
        width: 150,
        height: 50,
        backgroundColor: "white",
        marginLeft: 8,
    } as CSSProperties,
}