const Error_CODES = {
    FIREBASE_ERROR_CODES: {
        AUTH_ERROR: {
            EMAIL_ALREADY_EXISTS: 'auth/email-already-in-use',
            INVALID_ARGUMENT: 'auth/invalid-argument',
            INVALID_EMAIL: 'auth/invalid-email',
            INVALID_PASSWORD: 'auth/invalid-password',
            WEAK_PASSWORD: 'auth/weak-password',
        },
        LOGIN_ERRORS: {
            INVALID_EMAIL: "auth/invalid-email",
            INCORRECT_PASSWORD: "auth/wrong-password",
            USER_NOT_FOUND: "auth/user-not-found"
        },
        GENERAL_ERRORS: {
            INTERNAL_ERROR: 'auth/internal-error',
            TOO_MANY_REQUEST: "auth/too-many-requests"
        }
    }
}

export default Error_CODES