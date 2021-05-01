import { Container } from '@material-ui/core'
import { APP_COLORS, APP_STYLES, WEB_STYLES } from "../../shared/styles";
import { Helper } from "../../shared/libs/helper";
import React, { useEffect, useState } from 'react'
import Input from '../../shared/components/input'
import colors from '../../shared/styles/colors'
import styles from './styles'
import Button from '../../shared/components/button'
import SimpleText from '../../shared/components/text/simple-text'
import DashboardLayout from '../../shared/components/dashboard-layout';

function Integration(): JSX.Element {
    const [windowDimensions, setWindowDimensions] = useState(
        Helper.getWindowDimensions()
    );
    const [trendyol, setText] = useState("");
    const [hepsiburada, setText2] = useState("");

    function onSavePress(): void {
        console.log("save")
    }

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
    function renderInputs(): JSX.Element {
        return (
            <div>
                <Container>
                    <div style={styles.inputs}>
                        <SimpleText
                            additionalStyle={styles.name}
                            textID="trendyol" />
                        <Input
                            value={trendyol}
                            placeholder="API key..."
                            showLabel
                            required
                            onChangeText={(trendyol: string) => {
                                console.log(trendyol)
                                setText(trendyol)
                            }}
                            additionalStyles={styles.inputContainer}
                        />
                        <hr
                            style={{
                                color: colors.errorRed,
                                backgroundColor: colors.lightGray,
                                height: 3,
                                width: '100%',
                            }}
                        />
                        <SimpleText
                            additionalStyle={styles.name}
                            textID="hepsiburada" />
                        <Input
                            value={hepsiburada}
                            placeholder="API key..."
                            showLabel
                            required
                            onChangeText={(hepsiburada: string) => {
                                console.log(hepsiburada)
                                setText2(hepsiburada)
                            }}
                            additionalStyles={styles.inputContainer}
                        />
                        <hr
                            style={{
                                color: colors.errorRed,
                                backgroundColor: colors.lightGray,
                                height: 3,
                                width: '100%',
                            }}
                        />
                        <div style={{ display: 'flex' }}>
                            <Button onPress={onSavePress} buttonStyle={styles.saveButton}>
                                <SimpleText additionalStyle={styles.newAccountText} textID='Save' />
                            </Button>
                        </div>

                    </div>
                </Container>
            </div>
        )
    }

    return (
        <DashboardLayout route='Integration'>
            <div style={{ ...WEB_STYLES.flexRow }}>
                {isMobile() ? (
                    <div
                        style={{
                            ...WEB_STYLES.flexColum,
                            ...styles.integrationContentsMobile,
                            width: windowDimensions.width,
                            height: windowDimensions.height,
                        }}
                    >
                        <label style={styles.labelM}> Marketplace Integration</label>
                        <div style={styles.container}>
                            {renderInputs()}
                        </div>
                    </div>
                ) : (
                    <div
                        style={{
                            ...WEB_STYLES.flexColum,
                            background: APP_COLORS.lightTurquoise,
                            ...styles.integrationContents,
                            width: windowDimensions.width,
                            height: windowDimensions.height,
                        }}
                    >
                        <label style={styles.label}> Marketplace Integration</label>
                        <div style={styles.container}>
                            {renderInputs()}
                        </div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}

export default Integration