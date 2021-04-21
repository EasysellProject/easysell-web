import { CSSProperties } from "react";
import { APP_COLORS, WEB_STYLES } from '../../shared/styles';

export default {
    container: {
        backgroundColor:APP_COLORS.lightTurquoise,
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
    } as CSSProperties,
    dashboardHeader:{
        width:"100%",
        height:"30%",
        display:"flex",
        flexDirection:"column",
        justifyContent:"space-between",
        alignItems:"center",
    } as CSSProperties,
    firstLayer:{
        width:"100%",
        height:"10%",
        display:"flex",
        flexDirection:"column",
        justifyContent:"flex-start",
        alignSelf:"flex-start",
        padding:10
    } as CSSProperties,
    numbersLayer:{
        width:"100%",
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-evenly",
        alignSelf:"center",
        padding:20
    } as CSSProperties,
    infoLayer:{
        width:200,
        minHeight:60,
        ...WEB_STYLES.flexWrap,
        height:"100%",
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"flex-start",
        backgroundColor:"white",
        padding:20,
        borderRadius:8
    } as CSSProperties,
    infoLayerTextArea:{
        height:"100%",
        display:"flex",
        flexDirection:"column",
        justifyContent:"flex-start",
        alignItems:"flex-start",
        paddingRight:8
    } as CSSProperties,
    infoLayerText:{
        fontFamily: "Helvetica",
        color: APP_COLORS.gray,
        fontSize: 15,
        marginLeft:5
    } as CSSProperties,
    infoLayerTextNumber:{
        fontFamily: "Helvetica",
        color: APP_COLORS.gray,
        fontWeight:"bold",
        fontSize: 15,
        marginLeft:5
    } as CSSProperties,
    infoLayerSymbolLira:{
        backgroundColor:"lightblue",
        padding:8,
        borderRadius:5
    } as CSSProperties,
    infoLayerSymbolPercent:{
        backgroundColor:"orange",
        padding:8,
        borderRadius:5
    } as CSSProperties,
    infoLayerSymbolMargin:{
        backgroundColor:APP_COLORS.lightGreen,
        padding:8,
        borderRadius:5
    } as CSSProperties,
    welcomeLayer:{
        width:"100%",
        display:"flex",
        flexDirection:"row",
        justifyContent:"flex-start",
        alignSelf:"flex-start"
    } as CSSProperties,
    headerText: {
        fontFamily: "Helvetica",
        color: APP_COLORS.gray,
        fontSize: 30,
        paddingLeft:20
    } as CSSProperties,
    dateText: {
        fontFamily: "Helvetica",
        color: APP_COLORS.gray,
        fontSize: 20,
        paddingLeft:20
    } as CSSProperties,
    nameText: {
        fontFamily: "Helvetica",
        fontWeight: 'bold',
        color: APP_COLORS.gray,
        fontSize: 30,
        paddingLeft:10
    } as CSSProperties,
    
}