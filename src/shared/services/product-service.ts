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
                products = productsDoc.docs.map(details => {
                    let product = new Product(details.data());
                    product._id = details.id
                    return product
                });
            }
            return products;
        } catch (err) {
            throw err
        }
    }
    async createNewProduct(details: any): Promise<Product> {
        try {
            let imgID = Helper.generateRandomID();
            let metadata = {
                contentType: 'image/*'
            }
            if (details.img) {
                await firebase.storage().ref().child(`users/${Helper.getUserID()}/products/${imgID}`).put(details.img, metadata);
                details.img = await firebase.storage().ref().child(`users/${Helper.getUserID()}/products/${imgID}`).getDownloadURL();
            }
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