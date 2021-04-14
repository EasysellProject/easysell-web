import React from 'react'
import { useState } from 'react';

import { Helper } from '../../libs/helper'
import { Product } from '../../models/product';
import { APP_COLORS } from '../../styles';
import Button from '../button';
import SimpleText from '../text/simple-text'
import styles from './styles'

interface ProductCardProps {
    product: Product;
    index: number,
    // onMorePressed: (listing: Listing) => void;
    // editListing?: () => void;
    // tooltipVisible: boolean
}

function ProductCard(props: ProductCardProps): JSX.Element {
    const { product, index } = props

    const [hovered, setHovered] = useState<boolean>(false);

    // function toggleTooltip(): void {
    //     onMorePressed(listing)
    // }

    // function onActionPressed(index: number) {
    //     switch (index) {
    //         case 0:
    //             editListing()
    //             break;
    //         case 1:
    //             //TODO
    //             break;
    //         case 2:
    //             //TODO
    //             break;
    //     }
    //     toggleTooltip();
    // }

    return (
        // <div
        //     onMouseEnter={() => setHovered(true)}
        //     onMouseLeave={() => setHovered(false)}
        //     style={{ ...styles.card, backgroundColor: hovered ? APP_COLORS.HOVER.green : 'white', position: 'relative' }}>
        <Button onPress={() => { }} buttonStyle={{ ...styles.card, backgroundColor: hovered ? APP_COLORS.HOVER.green : 'white' }}>
            <div style={{ ...styles.indexContainer, backgroundColor: hovered ? APP_COLORS.HOVER.gray : APP_COLORS.BUTTONS.grayButton }}>
                <SimpleText textID={'' + index} additionalStyle={styles.indexText} />
            </div>
            <div style={styles.infoContainer}>
                <img src={product.img} style={styles.image} />
                <SimpleText ellipsis textID={product.title} additionalStyle={{ ...styles.text, textAlign: 'left' }} />
            </div>
            <SimpleText ellipsis textID={product.desc} additionalStyle={styles.textHigherFlex} />
            <SimpleText textID={'' + product.price} additionalStyle={styles.text} />
            <SimpleText textID={product.currency} additionalStyle={styles.text} />
            <SimpleText textID={'' + product.stock} additionalStyle={styles.text} />
            {/* <SimpleText textID={product.marketPlace[0]} additionalStyle={styles.text} /> */}
            {/* <SimpleText textID={Helper.getDMYTime(listing.createdAt)} additionalStyle={styles.text} /> */}
            {/* <Button buttonStyle={styles.button} onPress={() => toggleTooltip()}>•••</Button> */}
            {/* {
                tooltipVisible && (
                    <div style={styles.tooltipContainer}>
                        <Button buttonStyle={styles.tooltipButton} onPress={() => onActionPressed(0)}>
                            <AiFillEdit size={24} color={APP_COLORS.BUTTONS.darkGray} />
                            <SimpleText additionalStyle={styles.tooltipText} textID={'edit-listing'} />
                        </Button>
                        <Button buttonStyle={styles.tooltipButton} onPress={() => onActionPressed(1)}>
                            <FiTrash size={24} color={APP_COLORS.BUTTONS.darkGray} />
                            <SimpleText additionalStyle={styles.tooltipText} textID={'delete-listing'} />
                        </Button>
                        <Button buttonStyle={styles.tooltipButton} onPress={() => onActionPressed(2)}>
                            <FiCopy size={24} color={APP_COLORS.BUTTONS.darkGray} />
                            <SimpleText additionalStyle={styles.tooltipText} textID={'copy-listing'} />
                        </Button>
                    </div>

                )
            } */}
        </Button>
        // </div>
    );



}

export default ProductCard