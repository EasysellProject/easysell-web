import { CSSProperties } from "react";
import { APP_COLORS } from "../../styles";

export default {
    container: {
        paddingTop: 32,
        alignItems: 'center',
        width: '100%',
        // height: '100%',
        backgroundColor: APP_COLORS.sidebarGreen,
        overflow: 'auto',
        flex: 9
    } as CSSProperties,
    row: {
        alignItems: 'center',
        width: '90%',
        marginRight: '-10%',
        borderTopLeftRadius: 12,
        borderBottomLeftRadius: 12,
        marginTop: 18,
        paddingLeft: 18,
        paddingTop: 8,
        paddingBottom: 8,
    },
    rowTitle: {
        fontSize: 24,
        marginLeft: 12,
        paddingRight: 8,
        color: 'white',
    },
    content: {
        marginTop: 54
    },
    mainBlock: {
        backgroundColor: '#F7F8FC',
        padding: 30
    },
    logoutButton: {
        // position: 'absolute',
        // bottom: 0,
        // flex: 1,
        alignSelf: 'flex-end',
        width: '100%',
        paddingTop: 16,
        paddingBottom: 16,
        fontWeight: 'bold',
        backgroundColor: APP_COLORS.BUTTONS.green,
        textTransform: 'none'
    } as CSSProperties,
    logoutButtonText: {
        color: APP_COLORS.gray,
        fontFamily: "Times New Roman",
        fontSize: 18
    }
}