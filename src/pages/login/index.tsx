import React, { useEffect, useState } from "react";
import { AiOutlineArrowRight } from 'react-icons/ai'
import { useHistory } from "react-router-dom";

import logo from "../../assets/images/logo.png";
import background from "../../assets/images/login_background.png";

import styles from "./styles";
import { APP_COLORS, APP_STYLES, WEB_STYLES } from "../../shared/styles";
import { Helper } from "../../shared/libs/helper";
import HeaderText from "../../shared/components/text/header-text";
import Input from "../../shared/components/input";

import Button from "../../shared/components/button";
import SimpleText from "../../shared/components/text/simple-text";
import AuthService from "../../shared/services/auth-service";
import Error_CODES from "../../shared/libs/error-codes";
import UserService from "../../shared/services/user-service";


function Login(): JSX.Element {

    const navigation = useHistory()
    //state
    const [windowDimensions, setWindowDimensions] = useState(Helper.getWindowDimensions());
    // input values
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [emailError, setEmaiError] = useState('');
    const [passError, setPassError] = useState('')
    const [loading, setLoading] = useState(false)

    const [forgot, setForgot] = useState(false)
    const [loginError, setLoginError] = useState('')

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
    function onResetPassPress(): void {
        AuthService.forgotPassword(email)
            .then(user => {
                console.log("reset mail send")
            })
            .catch(err => console.log(err))
    }
    function onForgotPassPress(): void {
        if (forgot == false)
            setForgot(true);
        if (forgot == true)
            setForgot(false)


    }

    function onLoginPress(): void {
        if (!email) {
            setEmaiError('error-empty-field')
            return;
        }
        if (!pass) {
            setPassError('error-empty-field')
            return;
        }
        setLoading(true)
        AuthService.signIn(email, pass)
            .then(user => {
                setLoading(false)
                UserService.currentUser = user
                navigation.replace('/listings')
            })
            .catch(err => {
                setLoading(false)
                switch (err.code) {
                    case Error_CODES.FIREBASE_ERROR_CODES.LOGIN_ERRORS.INCORRECT_PASSWORD: {
                        setLoginError('incorrect-password')
                        break
                    }
                    case Error_CODES.FIREBASE_ERROR_CODES.LOGIN_ERRORS.INVALID_EMAIL: {
                        setLoginError('invalid-email')
                        break
                    }
                    case Error_CODES.FIREBASE_ERROR_CODES.GENERAL_ERRORS.TOO_MANY_REQUEST: {
                        setLoginError('too-many-requests')
                        break
                    }
                    case Error_CODES.FIREBASE_ERROR_CODES.LOGIN_ERRORS.USER_NOT_FOUND: {
                        setLoginError('user-not-found')
                        break
                    }
                    case Error_CODES.FIREBASE_ERROR_CODES.GENERAL_ERRORS.INTERNAL_ERROR: {
                        setLoginError('internal-error')
                        break
                    }
                    default: {
                        setLoginError(err.message)
                    }
                }
            })
    }

    function onNewAccountPressed(): void {
        navigation.push('/register')
    }

    function renderInputs(): JSX.Element {
        let forgotPass;
        if (forgot) {
            forgotPass = <div>

                <Input
                    value={email}
                    placeholder="e-mail"
                    errorText={emailError}
                    showError
                    showLabel
                    label="e-mail"
                    onChangeText={(email) => {
                        setEmaiError('')
                        setEmail(email)
                        setLoginError('')
                    }}
                    additionalStyles={styles.forgotPassDialog}
                />
                <div
                    style={styles.forgotPassButton}
                >
                    <Button
                        onPress={onForgotPassPress}
                    >
                        <SimpleText additionalStyle={styles.forgotPassText} textID='login' />
                    </Button>
                </div>
                <Button
                    onPress={onResetPassPress}
                    buttonStyle={{ ...styles.loginButton, ...WEB_STYLES.flexRow }}
                    loading={loading}
                >
                    <SimpleText additionalStyle={styles.loginText} textID='reset-password' />
                    <AiOutlineArrowRight style={styles.loginIcon} size={16} color={APP_COLORS.gray} />
                </Button>
            </div>
        }
        else
            forgotPass =
                <div>
                    <Input
                        value={email}
                        placeholder="e-mail"
                        showLabel
                        errorText={emailError}
                        showError
                        label="e-mail"
                        onChangeText={(email) => {
                            setEmaiError('')
                            setEmail(email)
                            setLoginError('')
                        }}
                        additionalStyles={styles.inputContainer}
                    />

                    <Input
                        value={pass}
                        placeholder="password"
                        showLabel
                        errorText={passError}
                        showError
                        type='password'
                        label="password"
                        onChangeText={(pass) => {
                            setPassError('')
                            setPass(pass)
                            setLoginError('')
                        }}
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
                        loading={loading}
                    >
                        <SimpleText additionalStyle={styles.loginText} textID='login' />
                        <AiOutlineArrowRight style={styles.loginIcon} size={16} color={APP_COLORS.gray} />
                    </Button>
                    {
                        loginError && (
                            <SimpleText textID={loginError} additionalStyle={APP_STYLES.errorText} />
                        )
                    }
                </div>



        return (
            <div style={styles.inputs}>
                {forgotPass}
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
                            zIndex: -1
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
                                <SimpleText additionalStyle={styles.manageText} textID='manage-sales' />
                            </div>
                        )
                    }
                </div>
            )}
        </div>
    );
}

export default Login;
