import React, { Children, JSXElementConstructor, ReactNode } from 'react'
import { useState } from 'react';
import { Helper } from '../../libs/helper'
import Button from '../button'
import SimpleText from '../text/simple-text'
import styles from './styles'
import { Listing } from '../../models/listing'
import Input from '../input';
interface ListingModalProps {
    listing: Listing;
    index: number,
    header: string,
    children: ReactNode,
}

function ListingModal(props: ListingModalProps): JSX.Element {
    let test: string;
    test = "test"
    const { listing, index, header, children } = props
    const [listingData, setListing] = useState(listing);
    return (
        <div style={styles.backGrnd}>
            <div style={styles.modalCard}>

                <div style={{ width: '100%', padding: 20 }}>
                    <h1 style={{ display: 'flex', justifyContent: 'center' }}>{header}</h1>
                    <div>

                        <Input
                            additionalStyles={{ width: '100%', margin: '10' }}
                            inputStyles={{ maxWidth: '100%', width: '100%' }}
                            value={listingData.title}
                            placeholder="title"
                            showLabel
                            label="title"
                            onChangeText={(test) => {
                                let change = { title: test }
                                setListing({ ...listingData, ...change })
                            }} />

                        <Input
                            additionalStyles={{ width: '100%', margin: '10' }}
                            inputStyles={{ maxWidth: '100%', width: '100%' }}
                            value={listingData.desc}
                            placeholder="description"
                            showLabel
                            label="description"
                            onChangeText={(test) => {
                                let change = { desc: test }
                                setListing({ ...listingData, ...change })
                            }} />


                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <Input
                                additionalStyles={{ width: '40%', margin: '10' }}
                                inputStyles={{ minWidth: '0', maxWidth: '100%', width: '100%' }}
                                value={'' + listingData.price}
                                placeholder="price"
                                showLabel
                                label="price"
                                onChangeText={(test) => {
                                    let change = { price: Number(test) }
                                    setListing({ ...listingData, ...change })
                                }} />
                            <Input

                                additionalStyles={{ width: '10%', margin: '10' }}
                                inputStyles={{ minWidth: '0', maxWidth: '100%', width: '100%' }}
                                value={"TL"}
                                placeholder="currency"
                                showLabel
                                label="currency"
                                onChangeText={(test) => {
                                    console.log("2");
                                }} />
                            <Input
                                additionalStyles={{ width: '40%', margin: '10' }}
                                inputStyles={{ minWidth: '0', maxWidth: '100%', width: '100%' }}
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
                            additionalStyles={{ margin: '10' }}
                            inputStyles={{ maxWidth: '100%', width: '50%' }}
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
                    </div>
                    <div style={{ padding: 40, display: "flex", justifyContent: "space-between" }} >
                        <img src={listing.img} style={styles.image} />
                        <Button buttonStyle={styles.chooseFileButton} onPress={() => console.log(listingData)}>
                            <h6>Choose File</h6>
                        </Button>
                    </div>
                    <div style={{ padding: 20 }}>
                        <Button buttonStyle={styles.button} onPress={() => {
                            console.log(listingData)
                        }
                        }>
                            <h4>Finalize</h4>
                        </Button>

                    </div>
                </div>

                {children}
            </div>
        </div >
    )
}

export default ListingModal