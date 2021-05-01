import React, { useEffect, useState } from "react";
import { HiMenu } from "react-icons/hi";
import { APP_COLORS, APP_STYLES, WEB_STYLES } from "../../shared/styles";
import { Helper } from "../../shared/libs/helper";
import HeaderText from "../../shared/components/text/header-text";
import DashboardLayout from "../../shared/components/dashboard-layout";
import Body from "./body";
import styles from './styles';



interface ProfileProps {

}

function Profile(props: ProfileProps): JSX.Element {
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


    return (
        <DashboardLayout route='Profile'>
            <div style={styles.innerContainer}>
                <div style={styles.container}>
                    <div style={styles.container}>
                        <div style={styles.headerContainer}>
                            <HeaderText textID="Profile" />
                        </div>
                        <Body />
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}

export default Profile