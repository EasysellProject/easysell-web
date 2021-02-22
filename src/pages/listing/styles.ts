import { wrap } from "underscore";
import { APP_COLORS, APP_STYLES, WEB_STYLES } from "../../shared/styles";

export default {
    headerText: {
        fontFamily: "Times New Roman",
        fontWeight: 'bold',
        color: APP_COLORS.gray,
        fontSize: 36,
    } as React.CSSProperties,
    listing_count_text: {
        color: APP_COLORS.gray,
        fontSize: 14
    } as React.CSSProperties,
    listing: {
        ...WEB_STYLES.flexRow,
    } as React.CSSProperties,
    header: {
        padding: 20,
        backgroundColor: APP_COLORS.lightTurquoise,
        ...WEB_STYLES.flexRow,
        justifyContent: "space-between",
        height: "15%",
        flex: 1,
        ...WEB_STYLES.flexWrap
    } as React.CSSProperties,
    search_area: {
        ...WEB_STYLES.flexRow,
    } as React.CSSProperties,
    searchButton: {
        backgroundColor: APP_COLORS.BUTTONS.green,
        borderTopRightRadius: 12,
        borderBottomRightRadius: 12,
        marginLeft: 8,
    } as React.CSSProperties,
    create_new_button_style: {
        backgroundColor: APP_COLORS.BUTTONS.green,
        marginLeft: 8,
        height: 35,
        width: 100,
    } as React.CSSProperties,
    create_new_button_inner_style: {
        ...WEB_STYLES.flexRow,
    } as React.CSSProperties,
    createNewText: {
        fontFamily: "Times New Roman",
        color: APP_COLORS.gray,
        fontSize: 12,
        marginLeft: 4
    } as React.CSSProperties,
    filter_text: {
        fontFamily: "Arial",
        color: "black",
        fontSize: 14
    } as React.CSSProperties,
    drop_down_style: {
        width: 150,
        height: 50,
        backgroundColor: "white",
        marginLeft: 8,
    } as React.CSSProperties
}