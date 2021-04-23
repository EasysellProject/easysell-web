import React from "react"
import styles from './styles';
import SimpleText from "../../shared/components/text/simple-text";
import {BiLira} from 'react-icons/bi'
import {FiPercent} from "react-icons/fi"
import {RiTShirtLine} from "react-icons/ri"
import UserService from "../../shared/services/user-service";
import {useEffect, useState} from "react"
import { CircularProgress } from '@material-ui/core';

interface dashboardHeaderProps{
    sales_amount:number,
    total_profit:number,
    avg_sale_price:number,
    profit_margin:number,
    avg_product_price:number
}

function DashboardHeader(props:dashboardHeaderProps): JSX.Element {
    const {sales_amount, total_profit, avg_sale_price, profit_margin, avg_product_price} = props
    const date = new Date();
    const [username, setUsername] = useState("");
    const [loaded, setLoaded] = useState<boolean>(false);
    useEffect(()=>{
        setTimeout(()=>{setUsername(UserService.currentUser.firstname)
        setLoaded(true)}, 1000)
    },[])
    return(
        loaded ? (<div style={styles.dashboardHeader}>
            <div style={styles.firstLayer}>
                <div style={styles.welcomeLayer}>
                    <SimpleText textID={"welcome"}
                        additionalStyle={styles.headerText}/>
                    <SimpleText textID={ UserService.currentUser.firstname}
                        additionalStyle={styles.nameText}/>
                </div>
                <div>                
                    <SimpleText textID={date.toLocaleDateString("en-US", {weekday:"long", year:"numeric", month:"long", day:"numeric"})}
                        additionalStyle={styles.dateText}/>
                </div>
            </div>
            <div style={styles.numbersLayer}>
                <div style={styles.infoLayer}>
                    <div style={styles.infoLayerTextArea}>
                        <SimpleText
                        additionalStyle={styles.infoLayerText}
                        textID={"sales-amount"}/>
                        <div style={{display:"flex", flexDirection:"row"}}>
                        <BiLira size={15} color="green" style={{marginTop:3}}/>
                        <SimpleText
                        additionalStyle={styles.infoLayerTextNumber}
                        textID={sales_amount.toString()}/>
                        </div>
                    </div>
                    <div style={styles.infoLayerSymbolLira}>
                        <BiLira/>
                    </div>
                </div>
                <div style={styles.infoLayer}>
                <div style={styles.infoLayerTextArea}>
                        <SimpleText
                        additionalStyle={styles.infoLayerText}
                        textID={"gross-profit"}/>
                        <div style={{display:"flex", flexDirection:"row"}}>
                            <BiLira size={15} color="green" style={{marginTop:3}}/>
                            <SimpleText
                            additionalStyle={styles.infoLayerTextNumber}
                            textID={total_profit.toString()}/>
                        </div>
                    </div>
                    <div style={styles.infoLayerSymbolPercent}>
                        <FiPercent/>
                    </div>
                </div>
                 <div style={styles.infoLayer}>
                 <div style={styles.infoLayerTextArea}>
                        <SimpleText
                        additionalStyle={styles.infoLayerText}
                        textID={"avg-sale-price"}/>
                        <div style={{display:"flex", flexDirection:"row"}}>
                            <BiLira size={15} color="green" style={{marginTop:3}}/>
                            <SimpleText
                            additionalStyle={styles.infoLayerTextNumber}
                            textID={avg_sale_price.toString()}/>
                        </div>
                    </div>
                </div>
                <div style={styles.infoLayer}>
                <div style={styles.infoLayerTextArea}>
                        <SimpleText
                        additionalStyle={styles.infoLayerText}
                        textID={"profit-margin"}/>
                        <div style={{display:"flex", flexDirection:"row"}}>
                        <FiPercent size={15} color="green" style={{marginTop:3}}/>
                        <SimpleText
                        additionalStyle={styles.infoLayerTextNumber}
                        textID={profit_margin.toString()}/>
                        </div>
                    </div>
                    <div style={styles.infoLayerSymbolMargin}>
                        <RiTShirtLine/>
                    </div>
                </div>
                <div style={styles.infoLayer}>
                <div style={styles.infoLayerTextArea}>
                        <SimpleText
                        additionalStyle={styles.infoLayerText}
                        textID={"avg-product-price"}/>
                        <div style={{display:"flex", flexDirection:"row"}}>
                        <BiLira size={15} color="green" style={{marginTop:3}}/>
                        <SimpleText
                        additionalStyle={styles.infoLayerTextNumber}
                        textID={avg_product_price.toString()}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>):(<div style={styles.spinnerContainer}>
            <CircularProgress style={styles.spinner}/>
        </div>))
}

export default DashboardHeader;