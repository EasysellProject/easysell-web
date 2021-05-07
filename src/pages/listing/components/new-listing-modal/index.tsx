import React, { useEffect, useState } from 'react'
import { MdClose } from 'react-icons/md';
import { CircularProgress, Dialog } from '@material-ui/core'
import Button from '../../../../shared/components/button';
import SimpleText from '../../../../shared/components/text/simple-text';
import ProductService from '../../../../shared/services/product-service';
import { Product } from '../../../../shared/models/product';
import { APP_COLORS } from '../../../../shared/styles';
import ProductCard from '../../../../shared/components/product-card';
import styles from './styles';
import EmptyList from '../../../../shared/components/empty-list';

interface NewListingModalProps {
    visible: boolean
    onClose: () => void,
    onSelectProduct: (product: Product) => void
    onCreateProduct: () => void;
}

function NewListingModal(props: NewListingModalProps): JSX.Element {
    const { visible, onClose, onSelectProduct, onCreateProduct } = props;
    const [selectProduct, setSelectProduct] = useState<boolean>(false);
    const [productsLoading, setProductsLoading] = useState<boolean>(false);
    const [products, setProducts] = useState<Product[]>([]);

    function onClosePress(): void {
        setSelectProduct(false);
        setProductsLoading(false);
        onClose()
    }

    useEffect(() => {
        if (selectProduct) {
            setProductsLoading(true);
            ProductService.getProducts()
                .then((products: Product[]) => {
                    setProductsLoading(false);
                    setProducts(products)
                })
                .catch(err => alert(err))
        }
    }, [selectProduct])

    function defaultInner(): JSX.Element {
        return (
            <div style={styles.innerContainer}>
                <Button
                    buttonStyle={styles.card}
                    onPress={() => {
                        setSelectProduct(true);
                    }}>
                    <div style={styles.cardInner}>
                        <img
                            style={styles.img}
                            src={require('../../../../assets/images/product.svg')} />
                        <SimpleText textID="select-product" />
                    </div>
                </Button>
                <Button
                    buttonStyle={styles.card}
                    onPress={() => {
                        onClosePress();
                        onCreateProduct();
                    }}>
                    <div style={styles.cardInner}>
                        <img
                            style={styles.img}
                            src={require('../../../../assets/images/new-product.svg')} />
                        <SimpleText textID="create-new" />
                    </div>
                </Button>
            </div>
        )
    }

    function renderProductList(): JSX.Element {
        return (
            <div style={styles.container}>
                {
                    productsLoading ? (
                        <div style={styles.spinner}>
                            <CircularProgress size={16} />
                        </div>
                    ) : (
                        <div style={{
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                        }}>
                            <Button onPress={onClosePress} buttonStyle={styles.closeButton}>
                                <MdClose size={16} color={APP_COLORS.gray} />
                                <SimpleText
                                    textID='cancel'
                                    additionalStyle={{ color: APP_COLORS.gray }}
                                />
                            </Button>
                            {
                                products.length > 0 ? (
                                    products.map((product, index) =>
                                        <ProductCard
                                            key={product._id}
                                            index={index + 1}
                                            product={product}
                                            onPress={(product: Product) => {
                                                onSelectProduct(product)
                                                onClosePress();
                                            }} />
                                    )
                                ) : (
                                    <EmptyList />
                                )
                            }
                        </div>
                    )
                }
            </div>
        )
    }

    return (
        <Dialog fullScreen={selectProduct && !productsLoading} open={visible} onClose={onClosePress}>
            {
                selectProduct ? (
                    renderProductList()
                ) : (
                    defaultInner()
                )
            }
        </Dialog>
    )
}

export default NewListingModal