import { APP_COLORS } from "../../shared/styles";

export default {
    container: {
        backgroundColor: 'white',
        marginLeft: 0,
        width: 500,
        height: '100%',
    },
    inputContainer: {
        marginTop: 18,
        fontStyle: 'italic',
    },
    inputs: {
        display: 'inline-block',
        marginTop: 12,
        maxWidth: 450,
    },

    integrationContents: {
        display: "flex",
        flexDirection: "column",
        background: APP_COLORS.lightTurqoise,
        height: '650px',
    }as React.CSSProperties,

    integrationContentsMobile: {
        alignItems: 'center',
        width: '100%',
        height: '650px',
        background: APP_COLORS.lightTurqoise,
    },
    saveButton: {
        marginTop: 12,
        backgroundColor: APP_COLORS.lightGreen,
        borderRadius: 8,
        marginLeft: "auto",
    } as React.CSSProperties, 

    newAccountText: {
        color: 'white'
    },

    name: {
        color: '#000000',
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 18,
    } as React.CSSProperties, 

    label: {
        fontSize: 36,
        fontWeight: 'bold',
        fontColor: APP_COLORS.gray,
        marginLeft: 25,
        marginTop: 18,
    } as React.CSSProperties,

    labelM: {
        alignItems: 'center',
        fontSize: 36,
        fontWeight: 'bold',
        fontColor: APP_COLORS.gray,
        marginLeft: 25,
        marginTop: 18,
    } as React.CSSProperties,
}