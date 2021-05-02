import React, { useEffect, useRef, useState } from 'react'
import { FaPen } from "react-icons/fa";
import { AiOutlineArrowRight } from 'react-icons/ai'
import ReactFlagsSelect from 'react-flags-select';
import Button from "../../shared/components/button";
import SimpleText from "../../shared/components/text/simple-text";
import Input from "../../shared/components/input";
import firebase from '../../shared/utils/firebase'
import UserService from "../../shared/services/user-service";
import AuthService from "../../shared/services/auth-service";
import styles from "./styles";
import { APP_COLORS, WEB_STYLES } from '../../shared/styles';
import { User } from '../../shared/models/user';
import { languageActions } from '../..';

interface BodyProps {

}

function Body(props: BodyProps): JSX.Element {

    const [user, setUser] = useState<User>(null);
    const [saveDisabled, setSavedDisabled] = useState<boolean>(true);

    const flagPicker = useRef<ReactFlagsSelect>(null);

    useEffect(() => {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                AuthService.getUserData().then(curr => {
                    UserService.currentUser = curr;
                    flagPicker.current.updateSelected(curr.lang.substring(curr.lang.length - 2))
                    setUser(curr);
                }).catch(err => {
                    console.log(err.message)
                    alert(err);
                })
            }
        });
    }, [])

    function onSaveChanges(): void {
        // TODO implement
        AuthService.updateUser(user)
            .then(() => {
                setSavedDisabled(true);
                alert("Successfully saved changes")
            })
            .catch((err) => {
                alert("Error occured " + err)
            });
    }

    function onResetPassPress(): void {
        AuthService.forgotPassword(user.email)
            .then(user => {
                console.log("reset mail send")
                alert("Reset link has sent to your e-mail, please check your inbox!")
            })
            .catch(err => alert(err))
    }

    return (
        <div style={{
            ...WEB_STYLES.flexColum,
            ...WEB_STYLES.flexWrap,
            marginLeft: "2.5%",
            marginTop: "2.5%",
            justifyContent: "space-between",
            alignItems: "flex-start",
        }}>
            <div style={styles.inputContainer}>
                <Input
                    value={user?.firstname}
                    placeholder="name"
                    showLabel
                    required
                    label="name"
                    onChangeText={(name: string) => {
                        setSavedDisabled(false);
                        setUser({ ...user, firstname: name, name: name + " " + user.lastname });
                    }}
                    errorText={'error-empty-field'}
                />
                <FaPen color={APP_COLORS.ligthBlue} style={{ marginLeft: 10, marginTop: 15 }} />
            </div>
            <div style={styles.inputContainer}>
                <Input
                    value={user?.lastname}
                    placeholder="surname"
                    showLabel
                    required
                    label="surname"
                    onChangeText={(name: string) => {
                        setSavedDisabled(false);
                        setUser({ ...user, lastname: name, name: user.firstname + " " + name });
                    }}
                    errorText={'error-empty-field'}
                />
                <FaPen color={APP_COLORS.ligthBlue} style={{ marginLeft: 10, marginTop: 15 }} />
            </div>
            <div style={styles.inputContainer}>
                <Input
                    value={user?.email}
                    placeholder="E-mail"
                    showLabel
                    required
                    disabled
                    label="E-mail"
                    onChangeText={(name: string) => {
                    }}
                    errorText={'error-empty-field'}
                />
                <FaPen color={APP_COLORS.ligthBlue} style={{ marginLeft: 10, marginTop: 15 }} />
            </div>
            <div style={{ marginTop: 15 }}>

            </div>
            <ReactFlagsSelect
                ref={flagPicker}
                className='flag-selector'
                countries={["US", "TR", "AZ"]}
                defaultCountry={'US'}

                customLabels={{ "US": "English", "TR": "Türkçe", "AZ": "Azərbaycanca" }}
                onSelect={(countryCode: string) => {
                    setSavedDisabled(false);
                    switch (countryCode) {
                        case "US": {
                            languageActions.next({ value: 'en-US' })
                            user.lang = 'en-US'
                            // setUser(user);
                            break
                        } case "TR": {
                            languageActions.next({ value: 'tr-TR' })
                            user.lang = 'tr-TR'
                            setUser(user);
                            // setCurrentLang('tr-TR')
                            break
                        } case "AZ": {
                            languageActions.next({ value: "az-Latn-AZ" })
                            user.lang = 'az-Latn-AZ'
                            setUser(user);
                            // setCurrentLang('az-Latn-AZ')
                            break
                        }
                    }
                }}
            />
            <div style={styles.buttonsContainer}>
                <Button
                    onPress={onResetPassPress}
                    buttonStyle={styles.button}
                >
                    <SimpleText additionalStyle={styles.buttonText} textID='reset-password' />
                    <AiOutlineArrowRight style={styles.buttonIcon} size={16} color={APP_COLORS.gray} />
                </Button>
                <Button
                    onPress={onSaveChanges}
                    buttonStyle={styles.button}
                    disabled={saveDisabled}
                >
                    <SimpleText textID='save-changes' additionalStyle={styles.buttonText} />
                </Button>
            </div>
        </div>
    )
}

export default Body