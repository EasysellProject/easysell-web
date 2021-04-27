import React, { useEffect, useState } from "react"
import { CircularProgress } from '@material-ui/core';
import SimpleText from "../../shared/components/text/simple-text";
import { BiLira } from 'react-icons/bi'
import { FiPercent } from "react-icons/fi"
import { RiTShirtLine } from "react-icons/ri"
import UserService from "../../shared/services/user-service";
import styles from './styles';
import firebase from '../../shared/utils/firebase'
import AuthService from "../../shared/services/auth-service";
import ProductService from "../../shared/services/product-service"

interface dashboardHeaderProps {
    sales_amount: number,
    total_profit: number,
    avg_sale_price: number,
    profit_margin: number,
}

function DashboardHeader(props: dashboardHeaderProps): JSX.Element {
    const { sales_amount, total_profit, avg_sale_price, profit_margin } = props
    const date = new Date();
    const [username, setUsername] = useState("");
    const [loaded, setLoaded] = useState<boolean>(false);
    const [avg_product_price, setAvgProductPrice] = useState<string>("")

    useEffect(() => {

        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                AuthService.getUserData().then(curr => {
                    UserService.currentUser = curr
                    ProductService.getProducts().then(products=>{
                        if(products.length > 0){
                            var sum:number = 0
                            var count:number = 0
                            products.map(product =>{sum = sum + Number(product.price)*Number(product.stock)
                                                    count = count + Number(product.stock)})
                            var result:string = (sum/count).toFixed()

                            setAvgProductPrice(result)
                        }
                        else{
                            setAvgProductPrice("")
                        }
                        setLoaded(true);
                    })
                }).catch(err => {
                    console.log(err.message)
                })
            }
        });
    }, [])
    return (
        loaded ? (
            <div style={styles.dashboardHeader}>
                <div style={styles.firstLayer}>
                    <div style={styles.welcomeLayer}>
                        <SimpleText textID="welcome"
                            additionalStyle={styles.headerText} />
                        <SimpleText textID={UserService.currentUser.firstname}
                            additionalStyle={styles.nameText} />
                    </div>
                    <div>
                        <SimpleText textID={date.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
                            additionalStyle={styles.dateText} />
                    </div>
                </div>
                <div style={styles.numbersLayer}>
                    <div style={styles.infoLayer}>
                        <div style={styles.infoLayerTextArea}>
                            <SimpleText
                                additionalStyle={styles.infoLayerText}
                                textID={"sales-amount"} />
                            <div style={{ display: "flex", flexDirection: "row" }}>
                                <BiLira size={15} color="green" style={{ marginTop: 3 }} />
                                <SimpleText
                                    additionalStyle={styles.infoLayerTextNumber}
                                    textID={sales_amount.toString()} />
                            </div>
                        </div>
                        <div style={styles.infoLayerSymbolLira}>
                            <BiLira />
                        </div>
                    </div>
                    <div style={styles.infoLayer}>
                        <div style={styles.infoLayerTextArea}>
                            <SimpleText
                                additionalStyle={styles.infoLayerText}
                                textID={"gross-profit"} />
                            <div style={{ display: "flex", flexDirection: "row" }}>
                                <BiLira size={15} color="green" style={{ marginTop: 3 }} />
                                <SimpleText
                                    additionalStyle={styles.infoLayerTextNumber}
                                    textID={total_profit.toString()} />
                            </div>
                        </div>
                        <div style={styles.infoLayerSymbolPercent}>
                            <FiPercent />
                        </div>
                    </div>
                    <div style={styles.infoLayer}>
                        <div style={styles.infoLayerTextArea}>
                            <SimpleText
                                additionalStyle={styles.infoLayerText}
                                textID={"avg-sale-price"} />
                            <div style={{ display: "flex", flexDirection: "row" }}>
                                <BiLira size={15} color="green" style={{ marginTop: 3 }} />
                                <SimpleText
                                    additionalStyle={styles.infoLayerTextNumber}
                                    textID={avg_sale_price.toString()} />
                            </div>
                        </div>
                    </div>
                    <div style={styles.infoLayer}>
                        <div style={styles.infoLayerTextArea}>
                            <SimpleText
                                additionalStyle={styles.infoLayerText}
                                textID={"profit-margin"} />
                            <div style={{ display: "flex", flexDirection: "row" }}>
                                <FiPercent size={15} color="green" style={{ marginTop: 3 }} />
                                <SimpleText
                                    additionalStyle={styles.infoLayerTextNumber}
                                    textID={profit_margin.toString()} />
                            </div>
                        </div>
                        <div style={styles.infoLayerSymbolMargin}>
                            <RiTShirtLine />
                        </div>
                    </div>
                    <div style={styles.infoLayer}>
                        <div style={styles.infoLayerTextArea}>
                            <SimpleText
                                additionalStyle={styles.infoLayerText}
                                textID={"avg-product-price"} />
                            <div style={{ display: "flex", flexDirection: "row" }}>
                                <BiLira size={15} color="green" style={{ marginTop: 3 }} />
                                <SimpleText
                                    additionalStyle={styles.infoLayerTextNumber}
                                    textID={avg_product_price.toString()} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ) :
            (
                <div style={styles.spinnerContainer}>
                    <CircularProgress style={styles.spinner} />
                </div>
            )
    )
}

export default DashboardHeader;