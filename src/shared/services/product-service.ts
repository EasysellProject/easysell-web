import { Helper } from "../libs/helper";
import { Product } from "../models/product";
import firebase from '../utils/firebase'
import UserService from "./user-service";

class ProductService {
    async getProducts(): Promise<Product[]> {
        try {
            let productsDoc = await firebase.firestore().collection('users').doc(Helper.getUserID()).collection('products').get();
            let products: Product[] = [];
            if (!productsDoc.empty) {
                products = productsDoc.docs.map(product => new Product(product.data()));
            }
            return products;
        } catch (err) {
            throw err
        }
    }
    async createNewProduct(details: any): Promise<Product> {
        try {
            console.log('uid ', Helper.getUserID())
            let productsDoc = await firebase.firestore().collection('users').doc(Helper.getUserID()).collection('products').add(details);
            let product = details;
            product._id = productsDoc.id;
            return new Product(product);
        } catch (err) {
            alert(err)
            throw err;
        }
    }
}

export default new ProductService();