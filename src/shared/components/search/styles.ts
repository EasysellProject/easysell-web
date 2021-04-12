import { APP_COLORS, WEB_STYLES } from '../../../shared/styles';
export default {
    main: {
        backgroundColor: "white",
        ...WEB_STYLES.flexRow,
        height: 35,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10
    },
    button: {
        width: 30,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        border: "none",
        backgroundColor: APP_COLORS.BUTTONS.grayButton,
        outline: "none"
    },
    input: {
        minWidth: 220,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        border: "none",
        outline: "none"
    }
}