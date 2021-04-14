import React, { ReactNode } from 'react'
import { useState } from 'react';
import Button from '../../button';
import styles from './styles'
import { Listing } from '../../../models/listing'
import Input from '../../input';
import { Dialog } from '@material-ui/core';
import SimpleText from '../../text/simple-text';
interface ListingModalProps {
    listing: Listing;
    header: string,
    children: ReactNode,
    closeModal: () => void;
}

function ListingModal(props: ListingModalProps): JSX.Element {
    const { listing, header, children, closeModal } = props
    const [listingData, setListing] = useState(listing);
    return (
        <Dialog open onClose={closeModal}>
            <div style={styles.modalCard}>
                <div style={styles.topContainer}>
                    <div style={styles.headerContainer}>
                        <SimpleText textID={'' + header} additionalStyle={styles.headerText}></SimpleText>
                        {children}
                    </div>
                    <Input
                        additionalStyles={styles.titleDescInputAdditional}
                        inputStyles={styles.titleDescInput}
                        value={listingData.title}
                        placeholder="title"
                        showLabel
                        label="title"
                        onChangeText={(test) => {
                            let change = { title: test }
                            setListing({ ...listingData, ...change })
                        }} />
                    <Input
                        additionalStyles={styles.titleDescInputAdditional}
                        inputStyles={styles.titleDescInput}
                        value={listingData.desc}
                        placeholder="description"
                        showLabel
                        label="description"
                        onChangeText={(test) => {
                            let change = { desc: test }
                            setListing({ ...listingData, ...change })
                        }} />
                    <div style={styles.priceCurrQuantity}>
                        <Input
                            additionalStyles={styles.priceInputAdditional}
                            inputStyles={styles.priceInput}
                            value={'' + listingData.price}
                            placeholder="price"
                            showLabel
                            label="price"
                            onChangeText={(test) => {
                                let change = { price: Number(test) }
                                setListing({ ...listingData, ...change })
                            }} />
                        <Input
                            additionalStyles={styles.currencyInputAdditional}
                            inputStyles={styles.currencyInput}
                            value={"TL"}
                            placeholder="currency"
                            showLabel
                            label="currency"
                            onChangeText={(test) => {
                                console.log("2");
                            }} />
                        <Input
                            additionalStyles={styles.quantityInputAdditional}
                            inputStyles={styles.quantityInput}
                            value={"" + listingData.stock}
                            placeholder="quantity"
                            showLabel
                            label="quantity"
                            onChangeText={(test) => {
                                let change = { stock: Number(test) }
                                setListing({ ...listingData, ...change })
                            }} />
                    </div>
                    <Input
                        additionalStyles={styles.marketplaceInputAdditional}
                        inputStyles={styles.marketplaceInput}
                        value={'' + listingData.marketPlace[0]}
                        placeholder="marketplace"
                        showLabel
                        label="marketplace"
                        onChangeText={(test) => {
                            let change = listingData.marketPlace
                            if (change[0] === 'Hepsiburada')
                                change[0] = 'Trendyol'
                            else
                                change[0] = 'Hepsiburada'
                            setListing({ ...listingData, ...change })
                        }} />
                    <div style={styles.choosefileButton} >
                        <img src={listing.img} style={styles.image} />
                        <Button buttonStyle={styles.chooseFileButton} onPress={() => console.log(listingData)}>
                            <SimpleText textID="choose-file"></SimpleText>
                        </Button>
                    </div>
                    <div style={styles.finalizeButton}>
                        <Button buttonStyle={styles.button} onPress={() => {
                            console.log(listingData)
                        }
                        }>
                            <SimpleText textID="finalize"></SimpleText>
                        </Button>
                    </div>
                </div>
            </div>
        </Dialog>
    )
}

export default ListingModal