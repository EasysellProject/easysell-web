import React from 'react'
import { useState } from 'react';
import { AiFillEdit } from 'react-icons/ai';
import { FiCopy, FiTrash } from 'react-icons/fi';
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
    tooltipVisible: boolean
}
// use with a container with such styles
// style={{ display: "flex", flexDirection: "row" }}
function ListingCard(props: ListingCardProps): JSX.Element {
    const { listing, index, onMorePressed, tooltipVisible } = props

    // const [tooltipVisible, setTooltipVisible] = useState<boolean>(index == 1);
    const [hovered, setHovered] = useState<boolean>(false);

    function openTooltip(): void {
        onMorePressed(listing)
    }

    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{ ...styles.card, backgroundColor: hovered ? APP_COLORS.HOVER.green : 'white', position: 'relative' }}>
            <div style={{ ...styles.indexContainer, backgroundColor: hovered ? APP_COLORS.HOVER.gray : APP_COLORS.BUTTONS.grayButton }}>
                <SimpleText textID={'' + index} additionalStyle={styles.indexText} />
            </div>
            <div style={styles.infoContainer}>
                <img src={listing.img} style={styles.image} />
                <SimpleText ellipsis textID={listing.title} additionalStyle={{ ...styles.text, textAlign: 'left' }} />
            </div>
            <SimpleText ellipsis textID={listing.desc} additionalStyle={styles.textHigherFlex} />
            <SimpleText textID={'' + listing.price} additionalStyle={styles.text} />
            <SimpleText textID={listing.currency} additionalStyle={styles.text} />
            <SimpleText textID={'' + listing.stock} additionalStyle={styles.text} />
            <SimpleText textID={listing.marketPlace[0]} additionalStyle={styles.text} />
            <SimpleText textID={Helper.getDMYTime(listing.createdAt)} additionalStyle={styles.text} />
            <Button buttonStyle={styles.button} onPress={() => openTooltip()}>•••</Button>
            {
                tooltipVisible && (
                    <div style={styles.tooltipContainer}>
                        <Button buttonStyle={styles.tooltipButton} onPress={() => { }}>
                            <AiFillEdit size={24} color={APP_COLORS.BUTTONS.darkGray} />
                            <SimpleText additionalStyle={styles.tooltipText} textID={'edit-listing'} />
                        </Button>
                        <Button buttonStyle={styles.tooltipButton} onPress={() => { }}>
                            <FiTrash size={24} color={APP_COLORS.BUTTONS.darkGray} />
                            <SimpleText additionalStyle={styles.tooltipText} textID={'delete-listing'} />
                        </Button>
                        <Button buttonStyle={styles.tooltipButton} onPress={() => { }}>
                            <FiCopy size={24} color={APP_COLORS.BUTTONS.darkGray} />
                            <SimpleText additionalStyle={styles.tooltipText} textID={'copy-listing'} />
                        </Button>
                    </div>

                )
            }
        </div>
    );



}

export default ListingCard