import React from 'react'
import Button from "../../shared/components/button";
import SimpleText from "../../shared/components/text/simple-text";
import Input from "../../shared/components/input";
import styles from "./styles";
import {FaPen} from "react-icons/fa";
import { APP_COLORS, WEB_STYLES } from '../../shared/styles';

interface BodyProps {

}

function Body(props: BodyProps): JSX.Element {
    function onSaveChanges(): void {
        // TODO implement
    }

    return (
        <div style={{
            ...WEB_STYLES.flexColum,
            ...WEB_STYLES.flexWrap,
            marginLeft: "5%",
            marginTop: "5%",
            height: "60%",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "flex-start",
            }}> 
            <div style={{
                display: "flex",
            ...WEB_STYLES.flexRow,
            alignItems:"center",}}>
            <Input
                    value=""
                    placeholder="Full Name"
                    showLabel
                    required
                    label="Full Name"
                    onChangeText={(name: string) => {
                        //resetErrors()
                        //setName(name)
                    }}
                    //additionalStyles={styles.inputContainer}
                    //showError={nameError}
                    errorText={'error-empty-field'}
                />
                <FaPen color = {APP_COLORS.ligthBlue} style={{marginLeft: 10, marginTop: 15}} />
                </div>
                <div style={{
                display: "flex",
            ...WEB_STYLES.flexRow,
            alignItems:"center",}}>
                <Input
                    value=""
                    placeholder="E-mail"
                    showLabel
                    required
                    label="E-mail"
                    onChangeText={(name: string) => {
                        //resetErrors()
                        //setName(name)
                    }}
                    //additionalStyles={styles.inputContainer}
                    //showError={nameError}
                    errorText={'error-empty-field'}
                />
                <FaPen color = {APP_COLORS.ligthBlue} style={{marginLeft: 10, marginTop: 15}} />
                </div>
                <div style={{
                display: "flex",
            ...WEB_STYLES.flexRow,
            alignItems:"center",}}>
                <Input
                    value=""
                    placeholder="Birthdate"
                    showLabel
                    required
                    label="Birthdate"
                    onChangeText={(name: string) => {
                        //resetErrors()
                        //setName(name)
                    }}
                    //additionalStyles={styles.inputContainer}
                    //showError={nameError}
                    errorText={'error-empty-field'}
                />
                <FaPen color = {APP_COLORS.ligthBlue} style={{marginLeft: 10, marginTop: 15}} />
                </div>
                <div style={{
                display: "flex",
            ...WEB_STYLES.flexRow,
            alignItems:"center",}}>
                <Input
                    value=""
                    placeholder="Password"
                    showLabel
                    required
                    label="Password"
                    onChangeText={(name: string) => {
                        //resetErrors()
                        //setName(name)
                    }}
                    //additionalStyles={styles.inputContainer}
                    //showError={nameError}
                    errorText={'error-empty-field'}
                />
                <FaPen color = {APP_COLORS.ligthBlue} style={{marginLeft: 10, marginTop: 15}} />
                </div>
                <Button
                        
                        onPress={onSaveChanges}
                        buttonStyle={{
                            backgroundColor: APP_COLORS.lightGreen,
                            marginTop: 10,
                            justifyContent: 'center',
                            borderRadius: 8,
                            minWidth:"100"}}
                    >
                        <SimpleText textID='Save Changes' additionalStyle = {{...styles.buttonText}}/>
                    </Button>

            </div>
    )
}

export default Body