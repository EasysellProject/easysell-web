import React from 'react'
import { Helper } from '../../libs/helper'
import { Listing } from '../../models/listing'
import Button from '../button'
import SimpleText from '../text/simple-text'
import styles from './styles'

interface ListingCardProps {
    listing: Listing;
    index: number
}
// use with a container with such styles
// style={{ display: "flex", flexDirection: "row" }}
function ListingCard2(props: ListingCardProps): JSX.Element {
    const { listing, index } = props
    console.log('listing ', listing)
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
            <Button buttonStyle={styles.button} onPress={() => console.log('1')}>•••</Button>
        </div>
    )
}

export default ListingCard2