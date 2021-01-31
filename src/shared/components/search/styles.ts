import { APP_COLORS, WEB_STYLES } from '../../../shared/styles';
export default {
    main:{
        backgroundColor:"white", 
        ...WEB_STYLES.flexRow, 
        height:35, 
        borderTopLeftRadius:8, 
        borderBottomLeftRadius:8, 
        borderTopRightRadius:8, 
        borderBottomRightRadius:8 
    },
    button:{
        width:30,
        borderTopLeftRadius:8, 
        borderBottomLeftRadius:8, 
        border:"none", 
        backgroundColor:APP_COLORS.buttonColor, 
        outline:"none"
    },
    input:{
        minWidth:220, 
        borderTopRightRadius:8, 
        borderBottomRightRadius:8, 
        border:"none", 
        outline:"none"
    }
}