import React from 'react'
import { useState } from 'react';

import { Product } from '../../models/product';
import { APP_COLORS } from '../../styles';
import SimpleText from '../text/simple-text'
import styles from './styles'

interface ProductCardProps {
    product: Product;
    index: number,
    onPress: (product: Product) => void;
    // onMorePressed: (listing: Listing) => void;
    // editListing?: () => void;
    // tooltipVisible: boolean
}

function ProductCard(props: ProductCardProps): JSX.Element {
    const { product, index, onPress } = props

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
        <button
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={() => onPress(product)}
            style={{ ...styles.card, backgroundColor: hovered ? APP_COLORS.HOVER.green : 'white', position: 'relative' }}>
            {/* <Button onPress={() => { }}> */}
            <div style={{ ...styles.indexContainer, backgroundColor: hovered ? APP_COLORS.HOVER.gray : APP_COLORS.BUTTONS.grayButton }}>
                <SimpleText text={'' + index} additionalStyle={styles.indexText} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                <div style={styles.infoContainer}>
                    <img src={product.img} style={styles.image} />
                    <SimpleText ellipsis text={product.title} additionalStyle={{ ...styles.text, textAlign: 'left' }} />
                </div>
                <div style={{ height: 34, width: 30 }}></div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', flex: 3 }}>
                <SimpleText ellipsis text={product.desc} additionalStyle={styles.textHigherFlex} />
                <div style={{ height: 34, width: 30 }}></div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flex: 1 }}>
                <SimpleText text={'' + product.price} additionalStyle={styles.text} />
                <div style={{ height: 34, width: 30 }}></div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                <SimpleText text={product.currency} additionalStyle={styles.text} />
                <div style={{ height: 34, width: 30 }}></div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                <SimpleText text={'' + product.stock} additionalStyle={styles.text} />
                <div style={{ height: 34, width: 30 }}></div>
            </div>
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
            {/* </Button> */}
        </button>
    );
}

export default ProductCard