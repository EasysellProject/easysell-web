import { User } from '../models/user'
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
      await firebase.firestore().collection('users').doc(currentUser._id).set({ firstname, lastname, lang, email, _id: res.user?.uid })
      UserService.currentUser = new User(currentUser)
      return { result: "success" }
    } catch (err) {
      console.log('err ', err)
      throw err
    }
  }

  async logout() {
    try {
      let res = await firebase.auth().signOut();
      console.log("logout successfull");
    } catch (err) {
      throw err
    }
  }

  async signIn(email: string, password: string) {
    try {
      let res = await firebase.auth().signInWithEmailAndPassword(email, password)
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      return this.getUserData().then(user => {
        UserService.currentUser = user
        return user
      })
    } catch (err) {
      console.log('login err ', err)
      throw err
    }
  }

  async getUserData(): Promise<User> {
    let currentUser = firebase.auth().currentUser;
    try {
      let userDoc = await firebase
        .firestore()
        .collection("users")
        .doc(currentUser.uid)
        .get();
      if (userDoc.exists) {
        let user = new User(userDoc.data());
        return user;
      }
    } catch (err) {
      throw err;
    }
  }
}

export default new AuthService();
