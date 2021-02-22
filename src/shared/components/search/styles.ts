import { APP_COLORS, WEB_STYLES } from '../../../shared/styles';
export default {
    main: {
        backgroundColor: "white",
        ...WEB_STYLES.flexRow,
        height: 36,
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8
    },
    button: {
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
        backgroundColor: APP_COLORS.BUTTONS.grayButton,
    },
    input: {
        minWidth: 220,
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
        border: "none",
        outline: "none"
    }
}