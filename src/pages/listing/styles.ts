import { APP_COLORS, APP_STYLES, WEB_STYLES } from "../../shared/styles";

export default{
    headerText:{
        fontFamily:"Times New Roman",
        color: "black",  
        fontSize:36,
    },
    listing_count_text:{
        color:"black",
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
    },
    search_area:{
        ...WEB_STYLES.flexRow,
    },
    search_button_style:{
        backgroundColor:APP_COLORS.textGreen,
        height:"65%",
        marginTop:8.5
    },
    create_new_button_style:{
        backgroundColor:APP_COLORS.textGreen,
        height:"60%",
        marginTop:10
    },
    create_new_button_inner_style:{
        ...WEB_STYLES.flexRow,
    },
    create_new_button_inner_button_style:{
        color:"black",
        fontFamily:"Times New Roman",
        fontSize:12,
    },
    filter_text:{
        fontFamily:"Arial",
        color:"black",
        fontSize:14
    }
}