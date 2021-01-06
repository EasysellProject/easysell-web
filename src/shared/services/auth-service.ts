import { User } from '../models/User'
import firebase from '../utils/firebase'
import { LangCode } from '../utils/localization'
import UserService from './user-service'
class AuthService {

    async createUser(email: string, password: string, firstname: string, lastname: string, lang: LangCode) {
        try {
            let res = await firebase.auth().createUserWithEmailAndPassword(email, password)
            console.log('res ', res)
            //TODO save user to firestore
            let currentUser = {
                firstname,
                lastname,
                lang,
                email,
                _id: res.user?.uid
            }
            await firebase.firestore().collection('users').doc(currentUser._id).set({ firstname, lastname, lang, email, uid: res.user?.uid })
            UserService.currentUser = new User(currentUser)
            return { result: "success" }
        } catch (err) {
            console.log('err ', err)
            throw err
        }
    }

}

export default new AuthService();