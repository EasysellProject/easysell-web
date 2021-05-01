import React from 'react'
import { useState } from 'react';
import { Helper } from '../../libs/helper';

import { Order } from '../../models/order';
import { APP_COLORS } from '../../styles';
import SimpleText from '../text/simple-text'
import styles from './styles'

interface OrderCardProps {
    order: Order;
    index: number,
    onPress: (order: Order) => void;
    // onMorePressed: (listing: Listing) => void;
    // editListing?: () => void;
    // tooltipVisible: boolean
}

function OrderCard(props: OrderCardProps): JSX.Element {
    const { order, index, onPress } = props

    const [hovered, setHovered] = useState<boolean>(false);

    return (
        <button
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={() => onPress(order)}
            style={{ ...styles.card, backgroundColor: hovered ? APP_COLORS.HOVER.green : 'white', position: 'relative' }}>
            <div style={{ ...styles.indexContainer, backgroundColor: hovered ? APP_COLORS.HOVER.gray : APP_COLORS.BUTTONS.grayButton }}>
                <SimpleText text={'' + index} additionalStyle={styles.indexText} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                <div style={styles.infoContainer}>
                    <img src={order.product.img} style={styles.image} />
                    <SimpleText ellipsis text={order.product.desc} additionalStyle={styles.textHigherFlex} />
                </div>
                <div style={{ height: 34, width: 30 }}></div>
            </div>
            {/* <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', flex: 3 }}>
                <SimpleText ellipsis text={order.product.title} additionalStyle={styles.textHigherFlex} />
                <div style={{ height: 34, width: 30 }}></div>
            </div> */}
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', flex: 3 }}>
                <SimpleText ellipsis text={order.orderedBy.name} additionalStyle={{ ...styles.text, textAlign: 'left' }} />
                <div style={{ height: 34, width: 30 }}></div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flex: 1 }}>
                <SimpleText text={'' + order.product.price} additionalStyle={styles.text} />
                <div style={{ height: 34, width: 30 }}></div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                <SimpleText text={order.product.currency} additionalStyle={styles.text} />
                <div style={{ height: 34, width: 30 }}></div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                <SimpleText text={'' + 1} additionalStyle={styles.text} />
                <div style={{ height: 34, width: 30 }}></div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                <SimpleText ellipsis text={"" + order.orderNo} additionalStyle={styles.textHigherFlex} />
                <div style={{ height: 34, width: 30 }}></div>
            </div>
            {/* <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', flex: 3 }}>
                <SimpleText ellipsis text={"" + order.orderedBy.market} additionalStyle={styles.textHigherFlex} />
                <div style={{ height: 34, width: 30 }}></div>
            </div> */}
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                <SimpleText ellipsis text={Helper.getDMYTime(order.orderDate)} additionalStyle={styles.textHigherFlex} />
                <div style={{ height: 34, width: 30 }}></div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                <SimpleText ellipsis text={Helper.getDMYTime(order.dueDate)} additionalStyle={styles.textHigherFlex} />
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

export default OrderCard;