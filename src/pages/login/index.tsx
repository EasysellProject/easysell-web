import React, { useEffect, useState } from "react";
import { AiOutlineArrowRight } from 'react-icons/ai'

import logo from "../../assets/images/logo_white.png";
import background from "../../assets/images/login_background.png";

import styles from "./styles";
import { APP_COLORS, WEB_STYLES } from "../../shared/styles";
import { Helper } from "../../shared/libs/helper";
import HeaderText from "../../shared/components/text/header-text";
import Input from "../../shared/components/input";

import "./login.css";
import Button from "../../shared/components/button";
import SimpleText from "../../shared/components/text/simple-text";

function Login(): JSX.Element {
    //state
    const [windowDimensions, setWindowDimensions] = useState(
        Helper.getWindowDimensions()
    );
    // input values
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");

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

    function onForgotPassPress(): void {
        // TODO implement
    }

    function onLoginPress(): void {
        // TODO implement
        console.log('hello')
    }

    function onNewAccountPressed(): void {
        // TODO implement
        console.log('hello')
    }

    function renderInputs(): JSX.Element {
        return (
            <div style={styles.inputs}>
                <Input
                    value={email}
                    placeholder="e-mail"
                    showLabel
                    label="e-mail"
                    onChangeText={setEmail}
                    additionalStyles={styles.inputContainer}
                />
                <Input
                    value={pass}
                    placeholder="password"
                    showLabel
                    label="password"
                    onChangeText={setPass}
                    additionalStyles={styles.inputContainer}
                />
                <div
                    style={styles.forgotPassButton}
                >
                    <Button
                        onPress={onForgotPassPress}
                    >
                        <SimpleText additionalStyle={styles.forgotPassText} textID='forgot-password' />
                    </Button>
                </div>
                <Button
                    onPress={onLoginPress}
                    buttonStyle={{ ...styles.loginButton, ...WEB_STYLES.flexRow }}
                >
                    <SimpleText additionalStyle={styles.loginText} textID='login' />
                    <AiOutlineArrowRight style={styles.loginIcon} size={16} color={APP_COLORS.gray} />
                </Button>
                <div style={styles.newAccountButtonContainer}>
                    <Button
                        onPress={onNewAccountPressed}
                        buttonStyle={styles.newAccountButton}
                    >
                        <SimpleText additionalStyle={styles.newAccountText} textID='create-new-account' />
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div>
            {!isMobile() && (
                <div>
                    <img
                        src={background}
                        style={{
                            position: "absolute",
                            width: windowDimensions.width,
                            height: windowDimensions.height,
                        }}
                    />
                </div>
            )}
            {isMobile() ? (
                <div
                    style={{
                        ...WEB_STYLES.flexColum,
                        ...styles.loginContentMobile,
                    }}
                >
                    <div
                        style={{
                            ...styles.loginContent,
                        }}
                    >
                        <img
                            src={logo}
                            alt="logo"
                            style={{
                                width: 200,
                            }}
                        />
                        <HeaderText textID="login" additionalStyle={styles.textStyle} />
                        <HeaderText
                            textID="enter-creds"
                            additionalStyle={{ fontSize: 24, ...styles.textStyle }}
                        />
                        {renderInputs()}
                    </div>
                </div>
            ) : (
                    <div
                        style={{
                            ...WEB_STYLES.flexRow,
                            paddingTop: !isMobile() ? 160 : 40,
                            paddingLeft: isMobile() ? 0 : 40,
                        }}
                    >
                        <div
                            style={{
                                ...styles.loginContent,
                            }}
                        >
                            <img
                                src={logo}
                                alt="logo"
                                style={{
                                    width: 200,
                                }}
                            />
                            <HeaderText textID="login" additionalStyle={styles.textStyle} />
                            <HeaderText
                                textID="enter-creds"
                                additionalStyle={{ fontSize: 24, ...styles.textStyle }}
                            />
                            {renderInputs()}
                        </div>
                        {
                            !isTablet() && (
                                <div style={{
                                    ...WEB_STYLES.flexColum,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    paddingLeft: -20,
                                    marginTop: 150,
                                    flex: 1,
                                }}>
                                    <HeaderText capitalized additionalStyle={{ ...styles.multiChannelText, textAlign: 'left' }} textID='multi-channel-retail-platform' />
                                    <SimpleText additionalStyle={styles.manageText} textID='manage-sales'/>
                                </div>
                            )
                        }
                                </div>
                            )}
                    </div>
                );
}

export default Login;
