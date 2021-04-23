import React, { ReactNode, useEffect } from 'react'
import { useState } from 'react';
import Button from '../../button';
import styles from './styles'
import { Listing } from '../../../models/listing'
import Input from '../../input';
import { Dialog } from '@material-ui/core';
import SimpleText from '../../text/simple-text';
import Picker from '../../picker';
import { MarketPlace } from '../../../models/integration';
import FilePicker from '../../file-picker';
import { MdClose, MdDone } from 'react-icons/md';
import { APP_COLORS } from '../../../styles';
import { Helper } from '../../../libs/helper';
interface ListingModalProps {
    listing: Listing;
    header: string,
    children: ReactNode,
    closeModal: () => void;
    onSubmit: () => void;
    loading?: boolean
}

function ListingModal(props: ListingModalProps): JSX.Element {
    const { listing, header, children, closeModal, onSubmit, loading } = props
    const [windowDimensions, setWindowDimensions] = useState(Helper.getWindowDimensions());
    // const [listingData, setListing] = useState<Listing>(listing.copy());
    const [title, setTitle] = useState<string>('');
    const [desc, setDesc] = useState<string>('');
    const [price, setPrice] = useState<string>('');
    const [currency, setCurrency] = useState<string>('');
    const [stock, setStock] = useState<string>('');
    const [markets, setMarkets] = useState<MarketPlace[]>([]);
    const [img, setImg] = useState<File | string>();


    useEffect(() => {
        if (listing) {
            const { title, desc, price, stock, currency, marketPlace, img } = listing;
            setTitle(title);
            setDesc(desc);
            setPrice(price + '');
            setStock(stock + '');
            setCurrency(currency);
            setMarkets(marketPlace);
            setImg(img)
        }
    }, [listing])

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    function handleResize() {
        setWindowDimensions(Helper.getWindowDimensions());
    }


    return (
        <Dialog open onClose={closeModal}>
            <div style={styles.modalCard}>
                <div style={styles.topContainer}>
                    <div style={styles.headerContainer}>
                        <SimpleText textID={header} additionalStyle={styles.headerText}></SimpleText>
                        {children}
                    </div>
                    <Input
                        additionalStyles={styles.titleDescInputAdditional}
                        inputStyles={styles.titleDescInput}
                        value={title}
                        placeholder="title"
                        required
                        showLabel
                        label="title"
                        onChangeText={(title) => {
                            setTitle(title);
                        }} />
                    <Input
                        additionalStyles={styles.titleDescInputAdditional}
                        inputStyles={styles.titleDescInput}
                        value={desc}
                        placeholder="description"
                        showLabel
                        label="description"
                        onChangeText={(desc) => {
                            setDesc(desc);
                        }} />
                    <div style={styles.priceCurrQuantity}>
                        <Input
                            additionalStyles={styles.quantityInputAdditional}
                            inputStyles={styles.quantityInput}
                            value={stock}
                            placeholder="quantity"
                            type='number'
                            showLabel
                            label="quantity"
                            onChangeText={(stock) => {
                                setStock(stock);
                            }} />
                        <Input
                            additionalStyles={styles.priceInputAdditional}
                            inputStyles={styles.priceInput}
                            value={price}
                            placeholder="price"
                            showLabel
                            type='number'
                            label="price"
                            onChangeText={(price) => {
                                setPrice(price);
                            }} />
                        <Picker
                            pickerItems={[{ label: '₺', value: 'TL' }, { label: '$', value: "USD" }]}
                            selectedItems={[currency]}
                            placeholder='currency'
                            showLabel
                            label='currency'
                            onSelectItem={(currency: "TL" | "USD") => {
                                setCurrency(currency);
                            }}
                            containerStyle={styles.currencyPicker}
                        />
                    </div>

                    <Picker
                        pickerItems={[{ value: "Hepsiburada", label: "Hepsiburada" }, { value: "Trendyol", label: "Trendyol" }]}
                        selectedItems={markets}
                        multiple
                        onSelectItem={(item: MarketPlace) => {
                            let marketIdx = markets?.findIndex(market => market == item);
                            if (marketIdx > -1) {
                                markets.splice(marketIdx, 1);
                            } else {
                                markets.push(item);
                            }
                            setMarkets(markets)
                        }}
                        placeholder='select-marketplace'
                        containerStyle={{ marginTop: windowDimensions.width < 768 ? 36 : 12 }}
                    />
                    <div style={styles.filePickerContainer}>
                        {
                            img && (
                                <img
                                    src={typeof img == 'string' ? img : URL.createObjectURL(img)}
                                    style={styles.image}
                                />
                            )
                        }
                        <FilePicker
                            onFileChosen={(image: File) => {
                                setImg(image);
                            }}
                        />
                    </div>

                    <div style={styles.buttons}>
                        <Button
                            onPress={closeModal}
                            buttonStyle={styles.cancelButton}>
                            <SimpleText
                                textID='cancel'
                                additionalStyle={styles.cancelText}
                            />
                            <MdClose size={16} color={APP_COLORS.gray} />
                        </Button>
                        <Button
                            onPress={onSubmit}
                            buttonStyle={styles.finalizeButton}
                            loading={loading}
                        >
                            <SimpleText
                                textID='finalize'
                                additionalStyle={styles.finalizeText}
                            />
                            <MdDone size={16} color={APP_COLORS.gray} />
                        </Button>
                    </div>
                </div>
            </div>
        </Dialog>
    )
}

export default ListingModal