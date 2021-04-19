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

interface ProductModalProps {
    visible: boolean;
    onClose: () => void;
    onSubmit: (product: Product) => void
}

function ProductModal(props: ProductModalProps): JSX.Element {
    const { visible, onClose, onSubmit } = props;
    const [name, setName] = useState<string>('');
    const [desc, setDesc] = useState<string>('');
    const [price, setPrice] = useState<string>('');
    const [stock, setStock] = useState<string>('');
    const [currency, setCurrency] = useState<'TL' | 'USD'>('TL');
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [image, setImage] = useState<File>(null);

    function finalize(): void {
        let product = new Product({ title: name, desc, price, stock, currency, img: URL.createObjectURL(image) });
        onSubmit(product);
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
                    onChangeText={(name) => setName(name)}
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
                    onChangeText={(desc) => setDesc(desc)}
                    label="description"
                    showLabel
                    errorText='error-empty-field'
                    showError={desc.length == 0 && submitted}
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
                    onChangeText={(price) => setPrice(price)}
                    inputStyles={styles.priceInput}
                    additionalStyles={styles.inputContainer}
                />
                <Picker
                    pickerItems={[{ label: '₺', value: 'TL' }, { label: '$', value: "USD" }]}
                    selectedItem={currency}
                    placeholder='currency'
                    showLabel
                    label='currency'
                    onSelectItem={(currency: "TL" | "USD") => setCurrency(currency)}
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
                    onChangeText={(stock) => setStock(stock)}
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
                        additionalStyle={styles.finalizeText}
                    />
                    <MdClose size={16} color={APP_COLORS.gray} />
                </Button>
                <Button
                    onPress={finalize}
                    buttonStyle={styles.finalizeButton}>
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