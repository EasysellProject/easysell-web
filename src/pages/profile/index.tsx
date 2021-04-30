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
                {/* {
                    isMobile() ? (<div>
                        <div style={{
                            ...WEB_STYLES.flexColum,
                            ...WEB_STYLES.flexWrap,
                        }}>
                            <div style={{
                                padding: 20,
                                display: "flex",
                                backgroundColor: 'red',
                                ...WEB_STYLES.flexRow,
                                ...WEB_STYLES.flexWrap,
                                justifyContent: "left",
                                alignItems: "center"
                            }}
                            >
                                <HiMenu
                                    size={36}
                                    color='#565656'
                                    onClick={() => {

                                    }}
                                />
                                <div style={{ marginLeft: 20 }}>
                                    <HeaderText textID="Profile" />
                                </div>

                            </div>
                            <Body />
                        </div>
                    </div>
                    ) : */}
                {/* ( */}
                <div style={{
                    ...WEB_STYLES.flexRow,
                    ...WEB_STYLES.flexWrap,
                    flex: 1
                }}>
                    <div style={{
                        ...WEB_STYLES.flexColum,
                        ...WEB_STYLES.flexWrap,
                        flex: 1
                    }}>
                        <div style={{
                            padding: 20,
                            display: "flex",
                            backgroundColor: APP_COLORS.lightTurquoise,
                            ...WEB_STYLES.flexRow,
                            ...WEB_STYLES.flexWrap,
                            justifyContent: "left",
                            height: "10%",
                            alignItems: "center"
                        }}>
                            <HeaderText textID="Profile" />
                        </div>
                        <Body />
                    </div>
                </div>
                {/* ) */}
                {/* } */}
            </div>
        </DashboardLayout>
    )
}

export default Profile