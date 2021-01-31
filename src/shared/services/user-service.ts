import { User } from "../models/user";
import firebase from '../utils/firebase'

class UserService {

    currentUser: User = null;

    constructor(){
        
    }
}

export default new UserService();