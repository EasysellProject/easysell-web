import { APP_COLORS } from "../../shared/styles";

export default {
    container: {

    },
    inputContainer: {
        marginTop: 18,
    },
    inputs: {
        display: 'inline-block',
        marginTop: 6,
        maxWidth: 290,
    },
    registerContent: {
        display: 'inline-block',
        paddingTop: 20,
    },
    registerContentMobile: {
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
    registerButton: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 8,
        backgroundColor: APP_COLORS.lightGreen,
        paddingTop: 6,
        paddingBottom: 6,
        borderRadius: 12
    },
    registerText: {
        fontSize: 12,
        color: APP_COLORS.gray
    },
    registerIcon: {
        marginLeft: 4
    },
    loginButtonContainer: {
        width: '100%',
        marginTop: 4,
        display: 'flex',
        justifyContent: 'center'
    },
    loginButton: {
        marginTop: 12,
        backgroundColor: APP_COLORS.ligthBlue,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        minWidth: 150
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
    },
}