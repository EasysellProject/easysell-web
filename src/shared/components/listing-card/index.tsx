import React, { useRef } from 'react'
import { useState } from 'react';
import { AiFillEdit } from 'react-icons/ai';
import { FiCopy, FiTrash } from 'react-icons/fi';

import { Helper } from '../../libs/helper'
import { Listing } from '../../models/listing'
import { APP_COLORS } from '../../styles';
import Button from '../button'
import { useOutsideAlerter } from '../picker';
import SimpleText from '../text/simple-text'
import styles from './styles'

interface ListingCardProps {
    listing: Listing;
    index: number,
    onMorePressed: (listing: Listing) => void;
    editListing?: () => void;
    removeListing?: () => void;
}

function ListingCard(props: ListingCardProps): JSX.Element {
    const { listing, index, onMorePressed, editListing, removeListing } = props

    const [hovered, setHovered] = useState<boolean>(false);
    const [tooltipVisible, setTooltipVisible] = useState<boolean>(false);

    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef, () => {
        setTooltipVisible(false);
        onMorePressed(null)
    });

    function toggleTooltip(): void {
        onMorePressed(listing)
        setTooltipVisible(!tooltipVisible)
    }

    function onActionPressed(index: number) {
        switch (index) {
            case 0:
                editListing()
                break;
            case 1:
                //TODO
                removeListing()
                break;
            case 2:
                //TODO
                break;
        }
        toggleTooltip();
    }

    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{ ...styles.card, backgroundColor: hovered ? APP_COLORS.HOVER.green : 'white', position: 'relative' }}
            ref={wrapperRef}
        >
            <div style={{ ...styles.indexContainer, backgroundColor: hovered ? APP_COLORS.HOVER.gray : APP_COLORS.BUTTONS.grayButton }}>
                <SimpleText text={'' + index} additionalStyle={styles.indexText} />
            </div>
            <div style={styles.infoContainer}>
                <img src={listing.product.img} style={styles.image} />
                <SimpleText ellipsis text={listing.product.title} additionalStyle={{ ...styles.text, textAlign: 'left' }} />
            </div>
            <SimpleText ellipsis text={listing.product.desc} additionalStyle={styles.textHigherFlex} />
            <SimpleText text={'' + listing.product.price} additionalStyle={styles.text} />
            <SimpleText text={listing.product.currency} additionalStyle={styles.text} />
            <SimpleText text={'' + listing.product.stock} additionalStyle={styles.text} />
            <SimpleText text={listing.marketPlace.join(', ')} additionalStyle={styles.text} ellipsis />
            <SimpleText text={Helper.getDMYTime(listing.createdAt)} additionalStyle={styles.text} />
            <Button buttonStyle={styles.button} onPress={() => toggleTooltip()}>•••</Button>
            {
                tooltipVisible && (
                    <div style={styles.tooltipContainer}>
                        <Button buttonStyle={styles.tooltipButton} onPress={() => onActionPressed(0)}>
                            <AiFillEdit size={24} color={APP_COLORS.BUTTONS.darkGray} />
                            <SimpleText additionalStyle={styles.tooltipText} textID={'edit-listing'} />
                        </Button>
                        <Button buttonStyle={styles.tooltipButton} onPress={() => onActionPressed(1)}>
                            <FiTrash size={24} color={APP_COLORS.BUTTONS.darkGray} />
                            <SimpleText additionalStyle={styles.tooltipText} textID={'disable-listing'} />
                        </Button>
                        <Button buttonStyle={styles.tooltipButton} onPress={() => onActionPressed(2)}>
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