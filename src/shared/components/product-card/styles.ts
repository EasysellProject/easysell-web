import { CSSProperties } from "react";
import { APP_COLORS } from "../../styles";

export default {
    card: {
        display: 'flex',
        position: 'relative',
        padding: 0,
        height: 36,
        width: "100%",
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: APP_COLORS.textGreen,
        boxShadow: "0.25px 0.25px 0 0px gray",
        alignItems: "center",
        borderRadius: 12,
        marginBottom: 12,
    } as CSSProperties,
    indexContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        width: 48,
        height: '100%',
        backgroundColor: APP_COLORS.BUTTONS.grayButton,
    },
    infoContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    } as CSSProperties,
    image: {
        width: 24,
        height: 24,
    },
    text: {
        flex: 1,
        fontSize: 18,
        textAlign: 'center',
        color: APP_COLORS.borderGray,
    } as CSSProperties,
    textHigherFlex: {
        flex: 1,
        textAlign: 'center',
        fontSize: 18,
        color: APP_COLORS.borderGray,
    } as CSSProperties,
    indexText: {
        color: APP_COLORS.borderGray,
        fontSize: 18,
    },
};
