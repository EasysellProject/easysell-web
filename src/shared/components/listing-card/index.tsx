import { TableCell } from '@material-ui/core';
import React, { JSXElementConstructor, ReactNode } from 'react'
import { useState } from 'react';
import { Helper } from '../../libs/helper'
import { Listing } from '../../models/listing'
import { APP_COLORS } from '../../styles';
import Button from '../button'
import ListingModal from '../listing-modal';
import SimpleText from '../text/simple-text'
import styles from './styles'
interface ListingCardProps {
    listing: Listing;
    index: number,
    onMorePressed: (listing: Listing) => void;
}
// use with a container with such styles
// style={{ display: "flex", flexDirection: "row" }}
function ListingCard(props: ListingCardProps): JSX.Element {
    const { listing, index, onMorePressed } = props
    return (
        <>
            <TableCell align='center' style={{ borderLeft: 1, borderColor: APP_COLORS.textGreen }}>
                <div style={styles.indexContainer}>
                    <SimpleText textID={'' + index} additionalStyle={styles.indexText} />
                </div>
            </TableCell>
            <TableCell align='center' style={{ borderColor: APP_COLORS.textGreen }}>
                <img src={listing.img} style={styles.image} />
            </TableCell>
            <TableCell align='center' style={{ borderColor: APP_COLORS.textGreen }}>
                <SimpleText textID={listing.title} additionalStyle={styles.text} />
            </TableCell>
            <TableCell align='center' style={{ borderColor: APP_COLORS.textGreen }}>
                <SimpleText textID={listing.desc} additionalStyle={styles.text} />
            </TableCell>
            <TableCell align='center' style={{ borderColor: APP_COLORS.textGreen }}>
                <SimpleText textID={'' + listing.price} additionalStyle={styles.text} />
            </TableCell>
            <TableCell align='center' style={{ borderColor: APP_COLORS.textGreen }}>
                <SimpleText textID='TL' additionalStyle={styles.text} />
            </TableCell>
            <TableCell align='center' style={{ borderColor: APP_COLORS.textGreen }}>
                <SimpleText textID={'' + listing.stock} additionalStyle={styles.text} />
            </TableCell>
            <TableCell align='center' style={{ borderColor: APP_COLORS.textGreen }}>
                <SimpleText textID={listing.marketPlace[0]} additionalStyle={styles.text} />
            </TableCell>
            <TableCell align='center' style={{ borderColor: APP_COLORS.textGreen }}>
                <SimpleText textID={Helper.getDMYTime(listing.createdAt)} additionalStyle={styles.text} />
            </TableCell>
            <TableCell align='center' style={{ borderColor: APP_COLORS.textGreen }}>
                <Button buttonStyle={styles.button} onPress={() => onMorePressed(listing)}>•••</Button>
            </TableCell>
        </>
    );



}

export default ListingCard