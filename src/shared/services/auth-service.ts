import { User } from '../models/user'
import firebase from '../utils/firebase'
import { LangCode } from '../utils/localization'
import UserService from './user-service'
import { Listing } from '../models/listing'


class AuthService {
  async register(email: string, password: string, firstname: string, lastname: string, lang: LangCode) {
    try {
      let res = await firebase.auth().createUserWithEmailAndPassword(email, password)
      let randomListings = this.generateRandomListings()
      //TODO save user to firestore
      let currentUser = {
        _id: res.user?.uid,
        firstname,
        lastname,
        lang,
        email,
      }
      await firebase.firestore().collection('users').doc(currentUser._id).set(currentUser)

      UserService.currentUser = new User(currentUser)
      return { result: "success" }
    } catch (err) {
      console.log('err ', err)
      throw err
    }
  }
  async forgotPassword(email: string) {
    try {
      let res = await firebase.auth().sendPasswordResetEmail(email);
      console.log("res")
    } catch (err) {
      throw err
    }
  }
  async logout() {
    try {
      let res = await firebase.auth().signOut();
      localStorage.removeItem("userID");
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
        localStorage.setItem("userID", user._id)
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
  generateRandomListings(): Listing[] {
    let listings: Listing[] = [];
    let infos = [
      {
        title: "Nike",
        desc: "Unisex Küçük Boy Sırt Çantası",
        img: 'https://cdn.dsmcdn.com/mnresize/-/-//ty76/product/media/images/20210222/19/66004015/144844476/1/1_org_thumb.jpg',
        price: 145,
        currency: "TL"
      }
      ,
      {
        title: "Nike",
        desc: "Nike 2.0 elementi Backpack Sırt Çantası",
        img: 'https://cdn.dsmcdn.com/mnresize/-/-//ty45/product/media/images/20210105/9/46370072/99054131/1/1_org_thumb.jpg',
        price: 140,
        currency: "TL"
      },
      {
        title: "Nike",
        desc: "Unisex Siyah Kırmızı Detaylı Sırt Çantası",
        img: "https://cdn.dsmcdn.com/mnresize/-/-//ty84/product/media/images/20210311/15/70718479/22374021/1/1_org_thumb.jpg",
        price: 129.99,
        currency: "TL"
      },
      {
        title: "XS Max",
        desc: "Iphone Tüm Cihazlarla Uyumlu Şarj Aleti",
        img: "https://cdn.dsmcdn.com/mnresize/-/-//ty81/product/media/images/20210310/18/70501445/94101997/1/1_org_thumb.jpg",
        price: 34.99,
        currency: "TL"
      },
      {
        title: "Nike",
        desc: "Unisex Siyah Kırmızı Detaylı Sırt Çantası",
        img: 'https://cdn.dsmcdn.com/mnresize/-/-//ty81/product/media/images/20210310/18/70501445/94101997/1/1_org_thumb.jpg',
        price: 128.70,
        currency: "TL"
      }
    ]
    var rndmNUmber = Math.floor(Math.random() * 1000 + 1)
    for (let i = 0; i < rndmNUmber; i++) {
      let info = infos[i % infos.length];
      let details = {
        _id: this.generateRandomID(),
        index: i + 1,
        title: info.title,
        desc: info.desc,
        price: info.price,
        img: info.img,
        stock: Math.floor(Math.random() * 50),
        marketPlace: Math.floor(Math.random() * 2) == 1 ? ['Trendyol', 'Hepsiburada'] : Math.floor(Math.random() * 2) == 1 ? ["Hepsiburada"] : ["Trendyol"],
        currency: info.currency,
        createdAt: this.getRandomDate(new Date(1609460000000), new Date()) // random time since 1 january 2021
      }
      listings.push(new Listing(details));
    }

    return listings
  }

  generateRandomID(): string {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < 12; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  getRandomDate(from: Date, to: Date): Date {
    const fromTime = from.getTime();
    const toTime = to.getTime();
    return new Date(fromTime + Math.random() * (toTime - fromTime));
  }

}

export default new AuthService();
