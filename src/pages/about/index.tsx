import React, { useEffect, useState } from "react";
import { HiMenu } from "react-icons/hi";
import { APP_COLORS, APP_STYLES, WEB_STYLES } from "../../shared/styles";
import { Helper } from "../../shared/libs/helper";
import DashboardLayout from "../../shared/components/dashboard-layout";
import SimpleText from '../../shared/components/text/simple-text';
import styles from './styles';
import logo from "../../assets/images/logo.png";
import comp from "../../assets/images/pngkomp-01.png";
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
                            paddingTop: !isMobile() ? 16 : 4,
                            paddingLeft: isMobile() ? 0 : 0,
                        }}
                    >

                            <img
                                src={logo}
                                alt="logo"
                                style={{
                                    width: 200,
                                }}
                            />
                            
                        {
                            !isTablet() && (
                                <div style={{
                                    ...WEB_STYLES.flexColum,
                                    justifyContent: 'left',
                                    alignItems: 'left',
                                    paddingLeft: 20,
                                    marginTop: 10,
                                    flex: 1,
                                }}>
                                    <HeaderText capitalized additionalStyle={{ ...styles.multiChannelText, textAlign: 'left' }} textID='multi-channel-retail-platform' />
                                    <SimpleText additionalStyle={styles.manageText} textID='manage-sales' />
                                </div>
                            )
                        }
                    </div>
                    <div style={{
                            ...WEB_STYLES.flexColum,
                            paddingTop:  4,
                            paddingLeft: 0,
                        }}>
                <img
                            src={comp}
                            alt="workspace"
                            style={{
                                width: 522,
                            }}
                        />
                        </div>
                </div>
            </div>
            
        </DashboardLayout>
    )
}

export default About