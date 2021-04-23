import React, { useState } from 'react';
import { Dialog } from '@material-ui/core';
import { MdDone, MdClose } from 'react-icons/md'

import { Product } from '../../../models/product';
import SimpleText from '../../text/simple-text';
import HeaderText from '../../text/header-text';
import { APP_COLORS } from '../../../styles';
import FilePicker from '../../file-picker';
import Button from '../../button';
import Picker from '../../picker';
import Input from '../../input';
import styles from './styles';
import ProductService from '../../../services/product-service';

interface ProductModalProps {
    visible: boolean;
    onClose: () => void;
    onSubmit: (product: any) => void
}

function ProductModal(props: ProductModalProps): JSX.Element {
    const { visible, onClose, onSubmit } = props;
    const [name, setName] = useState<string>('');
    const [desc, setDesc] = useState<string>('');
    const [price, setPrice] = useState<string>('');
    const [stock, setStock] = useState<string>('');
    const [currency, setCurrency] = useState<'TL' | 'USD'>('TL');
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [image, setImage] = useState<File>(null);

    function finalize(): void {
        setSubmitted(true);
        if (!name || !price || !stock) {
            return;
        }
        let product = {
            title: name,
            desc,
            price,
            stock,
            currency,
            img: image
        };
        setLoading(true);
        ProductService.createNewProduct(product)
            .then((product) => {
                setLoading(false);
                setName('');
                setDesc('')
                setPrice('')
                setStock('')
                setCurrency('TL')
                setSubmitted(false)
                onSubmit(product);
            })
            .catch((err) => {
                alert(err)
            });
    }

    return (
        <Dialog
            open={visible}
            onClose={onClose}
            style={styles.container}
        >
            <HeaderText
                textID='add-product'
                additionalStyle={{
                    alignSelf: 'center',
                    marginTop: 8,
                    marginBottom: 8,
                    fontWeight: 'bold'
                }}
            />
            <div style={styles.innerContainer}>
                <Input
                    value={name}
                    placeholder="name"
                    onChangeText={(name) => {
                        setSubmitted(false)
                        setName(name)
                    }}
                    required
                    label="name"
                    showLabel
                    errorText='error-empty-field'
                    showError={name.length == 0 && submitted}
                    inputStyles={styles.inputStyle}
                    additionalStyles={styles.inputContainer}
                />
                <Input
                    value={desc}
                    placeholder="description"
                    onChangeText={(desc) => {
                        setSubmitted(false)
                        setDesc(desc)
                    }}
                    showLabel
                    label="description"
                    inputStyles={styles.inputStyle}
                    additionalStyles={styles.inputContainer}
                />
                <Input
                    required
                    showLabel
                    value={price}
                    placeholder="price"
                    label="price"
                    type='number'
                    errorText='error-empty-field'
                    showError={price.length == 0 && submitted}
                    onChangeText={(price) => {
                        setSubmitted(false)
                        setPrice(price)
                    }}
                    inputStyles={styles.priceInput}
                    additionalStyles={styles.inputContainer}
                />
                <Picker
                    pickerItems={[{ label: '₺', value: 'TL' }, { label: '$', value: "USD" }]}
                    selectedItems={[currency]}
                    placeholder='currency'
                    showLabel
                    label='currency'
                    onSelectItem={(currency: "TL" | "USD") => {
                        setSubmitted(false)
                        setCurrency(currency)
                    }}
                />
                <Input
                    required
                    showLabel
                    value={stock}
                    placeholder="quantity"
                    label="quantity"
                    type='number'
                    errorText='error-empty-field'
                    showError={stock.length == 0 && submitted}
                    onChangeText={(stock) => {
                        setSubmitted(false)
                        setStock(stock)
                    }}
                    inputStyles={styles.priceInput}
                    additionalStyles={styles.inputContainer}
                />
            </div>
            <div style={styles.filePickerContainer}>
                {
                    image && (
                        <img
                            src={URL.createObjectURL(image)}
                            style={styles.image}
                        />
                    )
                }
                <FilePicker onFileChosen={(image) => setImage(image)} />
            </div>
            <div style={styles.buttons}>
                <Button
                    onPress={onClose}
                    buttonStyle={styles.cancelButton}>
                    <SimpleText
                        textID='cancel'
                        additionalStyle={styles.cancelText}
                    />
                    <MdClose size={16} color={APP_COLORS.gray} />
                </Button>
                <Button
                    onPress={finalize}
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
        </Dialog>
    )
}
export default ProductModal;