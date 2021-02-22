import React, { useEffect, useState } from "react";
import { AiOutlineArrowRight } from 'react-icons/ai'
import ReactFlagsSelect from 'react-flags-select';
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
import { languageActions } from "../..";
import './register.css'
import { LangCode } from "../../shared/utils/localization";

function Register(): JSX.Element {
    const navigation = useHistory()
    //state
    const [windowDimensions, setWindowDimensions] = useState(
        Helper.getWindowDimensions()
    );
    // input values
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [nameError, setNameError] = useState(false);
    const [surnameError, setSurnameError] = useState(false)
    const [emailError, setEmaiError] = useState(false);
    const [passError, setPassError] = useState(false)
    const [confirmPassError, setConfirmPassError] = useState(false)
    const [unequalPassError, setUnequalPassError] = useState(false);
    const [invalidEmailError, setInvalidEmailError] = useState(false);
    const [registerError, setRegisterError] = useState('');
    const [currentLang, setCurrentLang] = useState<LangCode>('en-US');
    const [registerLoading, setRegisterLoading] = useState(false)


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

    function onRegisterPress(): void {
        if (!name) {
            setNameError(true)
            return
        }
        if (!surname) {
            setSurnameError(true)
            return
        }
        if (!email) {
            setEmaiError(true)
            return
        }
        if (!Helper.validateEmail(email)) {
            console.log('hello')
            setInvalidEmailError(true)
            return
        }
        if (!pass) {
            setPassError(true)
            return
        }
        if (!confirmPass) {
            setConfirmPassError(true)
            return
        }
        if (confirmPass !== pass) {
            setUnequalPassError(true)
            return
        }
        setRegisterLoading(true)
        AuthService.register(email, pass, name, surname, currentLang)
            .then((res) => {
                console.log('register successfull do smt', res)
                //TODO
                setRegisterLoading(false)
            }).catch((err) => {
                setRegisterLoading(false)
                switch (err.code) {
                    case Error_CODES.FIREBASE_ERROR_CODES.AUTH_ERROR.EMAIL_ALREADY_EXISTS: {
                        setRegisterError('email-already-in-use')
                        break
                    } case Error_CODES.FIREBASE_ERROR_CODES.AUTH_ERROR.INVALID_ARGUMENT: {
                        setRegisterError('invalid-argument')
                        break
                    } case Error_CODES.FIREBASE_ERROR_CODES.AUTH_ERROR.INVALID_EMAIL: {
                        setRegisterError('invalid-email')
                        break
                    } case Error_CODES.FIREBASE_ERROR_CODES.AUTH_ERROR.WEAK_PASSWORD: {
                        setRegisterError('invalid-password')
                        break
                    }
                    case Error_CODES.FIREBASE_ERROR_CODES.AUTH_ERROR.INVALID_PASSWORD: {
                        setRegisterError('invalid-password')
                        break
                    }
                    case Error_CODES.FIREBASE_ERROR_CODES.GENERAL_ERRORS.INTERNAL_ERROR: {
                        setRegisterError('internal-error')
                        break
                    }
                    default: {
                        setRegisterError(err.message)
                    }
                }
                console.log('error on front ', err)
            })
    }

    function onLoginPress(): void {
        navigation.push('/login')
    }

    function resetErrors(): void {
        setEmaiError(false)
        setInvalidEmailError(false)
        setPassError(false)
        setUnequalPassError(false)
        setNameError(false)
        setSurnameError(false)
        setRegisterError('')
    }

    function renderInputs(): JSX.Element {
        return (
            <div style={styles.inputs}>
                <ReactFlagsSelect
                    className='flag-selector'
                    countries={["US", "TR", "AZ"]}
                    defaultCountry="US"
                    customLabels={{ "US": "EN-US", "TR": "Türkçe", "AZ": "Azərbaycanca" }}
                    onSelect={(countryCode: string) => {
                        switch (countryCode) {
                            case "US": {
                                languageActions.next({ value: 'en-US' })
                                setCurrentLang('en-US')
                                break
                            } case "TR": {
                                languageActions.next({ value: 'tr-TR' })
                                setCurrentLang('tr-TR')
                                break
                            } case "AZ": {
                                languageActions.next({ value: "az-Latn-AZ" })
                                setCurrentLang('az-Latn-AZ')
                                break
                            }
                        }
                    }}
                />
                <Input
                    value={name}
                    placeholder="name"
                    showLabel
                    required
                    label="name"
                    onChangeText={(name: string) => {
                        resetErrors()
                        setName(name)
                    }}
                    additionalStyles={styles.inputContainer}
                    showError={nameError}
                    errorText={'error-empty-field'}
                />
                <Input
                    value={surname}
                    placeholder="surname"
                    showLabel
                    required
                    label="surname"
                    onChangeText={(surname: string) => {
                        resetErrors()
                        setSurname(surname)
                    }}
                    additionalStyles={styles.inputContainer}
                    showError={surnameError}
                    errorText={'error-empty-field'}
                />
                <Input
                    value={email}
                    placeholder="e-mail"
                    showLabel
                    required
                    label="e-mail"
                    onChangeText={(email: string) => {
                        resetErrors()
                        setEmail(email)
                    }}
                    additionalStyles={styles.inputContainer}
                    showError={emailError || invalidEmailError}
                    errorText={invalidEmailError ? 'invalid-email-format' : 'error-empty-field'}
                />
                <Input
                    value={pass}
                    placeholder="password"
                    type="password"
                    showLabel
                    required
                    label="password"
                    onChangeText={(pass: string) => {
                        resetErrors()
                        setPass(pass)
                    }}
                    additionalStyles={styles.inputContainer}
                    showError={passError}
                    errorText='error-empty-field'
                />
                <Input
                    value={confirmPass}
                    placeholder="confirm-password"
                    type="password"
                    showLabel
                    required
                    label="confirm-password"
                    onChangeText={(pass: string) => {
                        setConfirmPassError(false)
                        setUnequalPassError(false)
                        setConfirmPass(pass)
                    }}
                    additionalStyles={styles.inputContainer}
                    showError={confirmPassError || unequalPassError}
                    errorText={unequalPassError ? 'unequal-pass' : 'error-empty-field'}
                />
                <Button
                    onPress={onRegisterPress}
                    buttonStyle={{ ...styles.registerButton, ...WEB_STYLES.flexRow }}
                    loading={registerLoading}
                >
                    <SimpleText additionalStyle={styles.registerText} textID='register' />
                    <AiOutlineArrowRight style={styles.registerIcon} size={16} color={APP_COLORS.gray} />
                </Button>
                {
                    registerError && (
                        <SimpleText textID={registerError} additionalStyle={APP_STYLES.errorText} />
                    )
                }
                <div style={styles.loginButtonContainer}>
                    <Button
                        onPress={onLoginPress}
                        buttonStyle={styles.loginButton}
                    >
                        <SimpleText additionalStyle={styles.newAccountText} textID='login' />
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
                        ...styles.registerContentMobile,
                    }}
                >
                    <div
                        style={{
                            ...styles.registerContent,
                        }}
                    >
                        <img
                            src={logo}
                            alt="logo"
                            style={{
                                width: 200,
                            }}
                        />
                        <HeaderText textID="register" additionalStyle={styles.textStyle} />
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
                                ...styles.registerContent,
                            }}
                        >
                            <img
                                src={logo}
                                alt="logo"
                                style={{
                                    width: 200,
                                }}
                            />
                            <HeaderText textID="register" additionalStyle={styles.textStyle} />
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

export default Register;
