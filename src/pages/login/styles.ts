import { APP_COLORS } from "../../shared/styles";

export default {
    container: {

    },
    forgotPassDialog:{
        marginTop: 18,
    },
    inputContainer: {
        marginTop: 18,
    },
    inputs: {
        display: 'inline-block',
        marginTop: 6,
    },
    loginContent: {
        display: 'inline-block',
        paddingTop: 20,
    },
    loginContentMobile: {
        alignItems: 'center',
        width: '100%'
    },
    logo: {
        width: 200
    },
    textStyle: {
        marginTop: 12
    },
    forgotPassButton: {
        width: '100%',
        marginTop: 4,
        display: 'flex',
        justifyContent: 'flex-end'
    },
    forgotPassText: {
        color: APP_COLORS.ligthBlue,
    },
    loginButton: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 8,
        backgroundColor: APP_COLORS.lightGreen,
        paddingTop: 6,
        paddingBottom: 6,
        borderRadius: 12
    },
    loginText: {
        fontSize: 12,
        color: APP_COLORS.gray
    },
    loginIcon: {
        marginLeft: 4
    },
    newAccountButtonContainer: {
        width: '100%',
        marginTop: 4,
        display: 'flex',
        justifyContent: 'center'
    },
    newAccountButton: {
        marginTop: 12,
        backgroundColor: APP_COLORS.ligthBlue,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
    },
    newAccountText: {
        color: 'white'
    },
    multiChannelText: {
        maxWidth: 330,
        color: APP_COLORS.textGreen,
        fontSize: 36
    },
    manageText: {
        fontSize: 18,
        maxWidth: '50%',
    }
}