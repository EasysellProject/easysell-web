import { Helper } from "../libs/helper";
import { Product } from "../models/product";
import {Order} from "../models/order"
import firebase from '../utils/firebase'
import UserService from "./user-service";

class OrderService {
    async getOrders(): Promise<Order[]> {
        try {
            let ordersDoc = await firebase.firestore().collection('users').doc(Helper.getUserID()).collection('orders').get();
            let orders: Order[] = [];
            if (!ordersDoc.empty) {
                orders = ordersDoc.docs.map(details => {
                    let order = new Order(details.data());
                    order._id = details.id
                    return order
                });
            }
            return orders;
        } catch (err) {
            throw err
        }
    }
    async createNewOrder(details: any): Promise<Order> {
        try {
            let imgID = Helper.generateRandomID();
            let metadata = {
                contentType: 'image/*'
            }
            if (details.img) {
                await firebase.storage().ref().child(`users/${Helper.getUserID()}/${imgID}`).put(details.img, metadata);
                details.img = await firebase.storage().ref().child(`users/${Helper.getUserID()}/${imgID}`).getDownloadURL();
            }
            let ordersDoc = await firebase.firestore().collection('users').doc(Helper.getUserID()).collection('orders').add(details);
            let order = details;
            order._id = ordersDoc.id;
            return new Order(order);
        } catch (err) {
            alert(err)
            throw err;
        }
    }
}

export default new OrderService();