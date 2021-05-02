import React, { useEffect, useState } from "react";
import { HiMenu } from "react-icons/hi";
import { APP_COLORS, APP_STYLES, WEB_STYLES } from "../../shared/styles";
import { Helper } from "../../shared/libs/helper";
import DashboardLayout from "../../shared/components/dashboard-layout";
import SimpleText from '../../shared/components/text/simple-text';
import styles from './styles';
import logo from "../../assets/images/logo.png";
import comp from "../../assets/images/about-comp.png";
import HeaderText from "../../shared/components/text/header-text";

interface AboutProps {

}

function About(props: AboutProps): JSX.Element {
    const [windowDimensions, setWindowDimensions] = useState(Helper.getWindowDimensions());

    function handleResize() {
        setWindowDimensions(Helper.getWindowDimensions());
    }

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    function isMobile(): boolean {
        return windowDimensions.width < 768;
    }

    function isTablet(): boolean {
        return windowDimensions.width < 1024;
    }

    return (
        <DashboardLayout route='About'>
            
                { isMobile() ? (
                    <div  style={styles.body}>
                        <div style={styles.header}>
                            <div style={{ ...WEB_STYLES.flexRow, flex: 1, alignItems: 'baseline' }}>
                            <SimpleText
                                    additionalStyle={styles.headerText}
                                    textID={"About"}
                                />   
                            </div>
                        </div>
                        <img
                                    src={logo}
                                    alt="logo"
                                    style={{
                                        width: 200,
                                        paddingTop:  10,
                                        paddingLeft: 15,
                                    }}
                                />
                        <div
                            style={{
                                ...WEB_STYLES.flexColum,
                                paddingTop:  10,
                                paddingLeft: 15,
                                //alignItems: "center",
                            }}>
                        <HeaderText capitalized additionalStyle={{ ...styles.multiChannelText, textAlign: 'left' }} textID='MULTI CHANNEL RETAIL PLATFORM' />
                        <SimpleText additionalStyle={styles.manageText} textID='manage-sales' />
                        </div>
                        <div
                            style={{
                                    ...WEB_STYLES.flexColum,
                                    paddingTop:  10,
                                    paddingLeft: 15,
                                    //alignItems: "center",
                            }}>
                            <SimpleText additionalStyle={styles.abstractText} textID='abstract0' />
                        </div>
                        <div
                            style={{
                                ...WEB_STYLES.flexColum,
                                paddingTop:  5,
                                paddingLeft: 15,                                
                                //alignItems: "center",
                            }}>
                            <SimpleText additionalStyle={styles.abstractText} textID='abstract1' />
                        </div>
                    </div>
                ):(
                    <div  style={styles.body}> 
                        <div style={styles.header}>
                        <div style={{ ...WEB_STYLES.flexRow, flex: 1, alignItems: 'baseline' }}>
                        <SimpleText
                                additionalStyle={styles.headerText}
                                textID={"About"}
                            />
                        </div>
                        
                    </div>
                    <div style={styles.posterContainer}>
                        <div
                            style={{
                                ...WEB_STYLES.flexColum,
                                width: '100%',
                                paddingTop: !isMobile() ? 16 : 4,
                                paddingLeft: isMobile() ? 0 : 0,
                            }}
                        >
                            <div
                            style={{
                                paddingLeft: 20,
                                paddingBottom: 20,
                            }}
                        >
                                <img
                                    src={logo}
                                    alt="logo"
                                    style={{
                                        width: 200,
                                    }}
                                />
                                
                                </div>
                            {
                                !isTablet() && (
                                    <div style={{
                                        ...WEB_STYLES.flexColum,
                                        justifyContent: 'left',
                                        alignItems: 'left',
                                        width: '100%',
                                        paddingLeft: 20,
                                        marginTop: 10,
                                        flex: 1,
                                    }}>
                                        <HeaderText capitalized additionalStyle={{ ...styles.multiChannelText, textAlign: 'left' }} textID='MULTI CHANNEL RETAIL PLATFORM' />
                                        <SimpleText additionalStyle={styles.manageText} textID='manage-sales' />
                                        <div
                                            style={{
                                                ...WEB_STYLES.flexColum,
                                                paddingTop:  10,
                                                paddingLeft: 0,
                                            }}>
                                            <SimpleText additionalStyle={styles.abstractText} textID='abstract0' />
                                        </div>
                                        <div
                                            style={{
                                                ...WEB_STYLES.flexColum,
                                                paddingTop:  5,
                                                paddingLeft: 0,
                                            }}>
                                            <SimpleText additionalStyle={styles.abstractText} textID='abstract1' />
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                        <div style={{
                                ...WEB_STYLES.flexColum,
                                paddingTop:  80,
                                paddingLeft: 0,
                            }}>
                    <img
                                src={comp}
                                alt="workspace"
                                style={{
                                    width: 400,
                                    alignItems: 'center',
                                    
                                }}
                            />
                            </div>
                    </div>
                </div>
                )
                }
                
            
            
        </DashboardLayout>
    )
}

export default About