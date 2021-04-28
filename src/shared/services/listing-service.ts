import React from 'react'
import { Helper } from '../libs/helper';
import { Listing } from '../models/listing';
import firebase from '../utils/firebase';

class ListingService {

    async editListing(listing: any): Promise<void> {
        try {
            if (listing.img) {
                await firebase.storage().ref(`users/${Helper.getUserID()}/listings/${listing._id}`).put(listing.img)
                listing.img = await firebase.storage().ref(`users/${Helper.getUserID()}/listings/${listing._id}`).getDownloadURL();
            }
            await firebase.firestore().collection('users').doc(Helper.getUserID()).collection('listings').doc(listing._id).update(listing)
        } catch (err) {
            alert(err);
            throw err
        }
    }

    async deleteListing(listing: Listing): Promise<void> {
        try {
            await firebase.firestore().collection('users').doc(Helper.getUserID()).collection('listings').doc(listing._id).delete();
        } catch (err) {
            alert(err);
            throw err
        }
    }

    async createListing(listing: any): Promise<Listing> {
        console.log('create listing ', listing)
        try {
            if (listing.product?.img instanceof File) {
                await firebase.storage().ref(`users/${Helper.getUserID()}/listings/${listing._id}`).put(listing.product.img)
                listing.product.img = await firebase.storage().ref(`users/${Helper.getUserID()}/listings/${listing._id}`).getDownloadURL();
            }
            let res = await firebase.firestore().collection('users').doc(Helper.getUserID()).collection('listings').add(listing);
            listing._id = res.id;
            return new Listing(listing);
        } catch (err) {
            alert(err);
            throw err
        }
    }

    async fetchListings(): Promise<Listing[]> {
        try {
            // TODO
            // integrationService.getListings();
            console.log("Helper ", Helper.getUserID());
            let res = await firebase.firestore().collection(`users/${Helper.getUserID()}/listings`).get();
            return res.docs.map(listing => {
                let data = listing.data();
                data._id = listing.id
                return new Listing(data)
            }
            );
        } catch (err) {
            alert(err);
            throw err;
        }
    }
}

export default new ListingService();