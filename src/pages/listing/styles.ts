import { wrap } from "underscore";
import { APP_COLORS, APP_STYLES, WEB_STYLES } from "../../shared/styles";

export default{
    headerText:{
        fontFamily:"Times New Roman",
        color: APP_COLORS.gray,  
        fontSize:36,
    },
    listing_count_text:{
        color: APP_COLORS.gray,
        fontSize:11
    },
    listing:{
        ...WEB_STYLES.flexRow,
    },
    header:{
        padding:20,
        backgroundColor:APP_COLORS.lightGreen,
        ...WEB_STYLES.flexRow,
        justifyContent:"space-around",
        height:"15%",
        width: "85%",
        ...WEB_STYLES.flexWrap
    },
    search_area:{
        ...WEB_STYLES.flexRow,
    },
    search_button_style:{
        backgroundColor:APP_COLORS.grayButton,
        height:"65%",
        marginTop:8.5
    },
    create_new_button_style:{
        backgroundColor:APP_COLORS.grayButton,
        marginTop:10,
        height:35,
        width:100,
    },
    create_new_button_inner_style:{
        ...WEB_STYLES.flexRow,
    },
    create_new_button_inner_button_style:{
        color:APP_COLORS.gray,
        fontFamily:"Times New Roman",
        fontSize:12,
        marginLeft:4
    },
    filter_text:{
        fontFamily:"Arial",
        color:"black",
        fontSize:14
    },
    drop_down_style:{
        width:150, 
        height:50,
        backgroundColor:"white"
    }
}