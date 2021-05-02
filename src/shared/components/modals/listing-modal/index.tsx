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
    onSubmit: (listing: any) => void;
    loading?: boolean
}

function ListingModal(props: ListingModalProps): JSX.Element {
    const { listing, header, children, closeModal, onSubmit, loading } = props
    const [windowDimensions, setWindowDimensions] = useState(Helper.getWindowDimensions());
    // const [listingData, setListing] = useState<Listing>(listing.copy());
    const [id, setId] = useState<string>('');
    const [createdAt, setCreatedAt] = useState<Date>(new Date());
    const [title, setTitle] = useState<string>('');
    const [desc, setDesc] = useState<string>('');
    const [price, setPrice] = useState<string>('');
    const [currency, setCurrency] = useState<'TL' | 'USD'>('TL');
    const [stock, setStock] = useState<string>('');
    const [markets, setMarkets] = useState<MarketPlace[]>([]);
    const [img, setImg] = useState<File | string>(null);
    const [submitted, setSubmitted] = useState<boolean>(false);


    useEffect(() => {
        if (listing) {
            const { marketPlace, product, _id, createdAt } = listing;
            const { title, desc, price, stock, currency, img } = product;
            setTitle(title);
            setDesc(desc);
            setPrice(price + '');
            setStock(stock + '');
            setCurrency(currency);
            setMarkets(marketPlace);
            setImg(img)
            setId(_id)
            setCreatedAt(createdAt)
        }
    }, [listing])

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    function handleResize() {
        setWindowDimensions(Helper.getWindowDimensions());
    }

    function onFinalizePress(): void {
        setSubmitted(true);
        if (!title || !price || !stock) {
            return;
        }
        if (!markets.length) {
            alert('You should choose at least one marketplace') // todo
            return
        }
        let listing = {
            _id: id,
            marketPlace: markets,
            product: {
                title,
                desc,
                price,
                stock,
                currency,
                img
            },
            createdAt: createdAt.getTime()
        }
        onSubmit(listing);
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
                        errorText='error-empty-field'
                        showError={title.length == 0 && submitted}
                        onChangeText={(title) => {
                            setSubmitted(false);
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
                            setSubmitted(false);
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
                            required
                            label="quantity"
                            errorText='error-empty-field'
                            showError={stock.length == 0 && submitted} onChangeText={(stock) => {
                                setSubmitted(false);
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
                            required
                            errorText='error-empty-field'
                            showError={price.length == 0 && submitted}
                            onChangeText={(price) => {
                                setSubmitted(false);
                                setPrice(price);
                            }} />
                        <Picker
                            pickerItems={[{ label: '₺', value: 'TL' }, { label: '$', value: "USD" }]}
                            selectedItems={[currency]}
                            placeholder='currency'
                            showLabel
                            label='currency'
                            onSelectItem={(currency: "TL" | "USD") => {
                                setSubmitted(false);
                                setCurrency(currency);
                            }}
                            containerStyle={styles.currencyPicker}
                        />
                    </div>

                    <Picker
                        pickerItems={[{ value: "Hepsiburada", label: "Hepsiburada" }, { value: "Trendyol", label: "Trendyol" }]}
                        selectedItems={markets}
                        multiple
                        required
                        onSelectItem={(item: MarketPlace) => {
                            let marketIdx = markets?.findIndex(market => market == item);
                            if (marketIdx > -1) {
                                markets.splice(marketIdx, 1);
                            } else {
                                markets.push(item);
                            }
                            setSubmitted(false);
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
                                setSubmitted(false);
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
                            onPress={onFinalizePress}
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