import React, { JSXElementConstructor, ReactNode } from 'react'
import { useState } from 'react';
import { Helper } from '../../libs/helper'
import { Listing } from '../../models/listing'
import Button from '../button'
import ListingModal from '../listing-modal';
import SimpleText from '../text/simple-text'
import styles from './styles'
interface ListingCardProps {
    listing: Listing;
    index: number
}
// use with a container with such styles
// style={{ display: "flex", flexDirection: "row" }}
function ListingCard(props: ListingCardProps): JSX.Element {
    const { listing, index } = props
    const [modalStatus, setModalStatus] = useState(0);
    console.log('listing ', listing)
    let modal: ReactNode;
    if (modalStatus === 0)
        modal = null;
    else
        modal =
            <ListingModal header={'Edit Listing'} listing={listing} index={index}>
                <Button buttonStyle={{ fontSize: 24, width: '10%', height: '10%', borderRadius: 13 }} onPress={() => setModalStatus(0)}>ⓧ</Button>
            </ListingModal>;
    return (
        <div style={styles.card}>
            <div style={styles.indexContainer}>
                <SimpleText textID={'' + index} additionalStyle={styles.indexText} />
            </div>
            <img src={listing.img} style={styles.image} />
            <SimpleText textID={listing.title} additionalStyle={styles.text} />
            <SimpleText textID={'' + listing.price} additionalStyle={styles.text} />
            <SimpleText textID='TL' additionalStyle={styles.text} />
            <SimpleText textID={'' + listing.stock} additionalStyle={styles.text} />
            <SimpleText textID={listing.marketPlace[0]} additionalStyle={styles.text} />
            <SimpleText textID={Helper.getDMYTime(listing.createdAt)} additionalStyle={styles.text} />
            <Button buttonStyle={styles.button} onPress={() => setModalStatus(1)}>•••</Button>
            {modal}
        </div>
    );



}

export default ListingCard