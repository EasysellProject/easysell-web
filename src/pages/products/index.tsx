import { CircularProgress } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import DashboardLayout from '../../shared/components/dashboard-layout';
import EmptyList from '../../shared/components/empty-list';
import ProductModal from '../../shared/components/modals/product-modal';
import ProductCard from '../../shared/components/product-card';
import Table, { HeadCell } from '../../shared/components/table';
import { Product } from '../../shared/models/product';
import ProductService from '../../shared/services/product-service';
import ProductsHeader from './productsHeader';
import styles from './styles';

interface ProductProps {

}

function ProductsPage(props: ProductProps): JSX.Element {
    const intl = useIntl();

    const headCells: HeadCell[] = [
        { id: 'index', numeric: true, label: '' },
        { id: 'name', numeric: false, label: intl.formatMessage({ id: 'name' }) },
        { id: 'desc', numeric: false, label: intl.formatMessage({ id: 'description' }) },
        { id: 'price', numeric: true, label: intl.formatMessage({ id: 'price' }) },
        { id: 'currency', numeric: false, label: intl.formatMessage({ id: 'currency' }) },
        { id: 'stock', numeric: true, label: intl.formatMessage({ id: 'quantity' }) },
        // { id: 'marketPlace', numeric: false, label: intl.formatMessage({ id: 'marketplace' }) },
        // { id: 'createdAt', numeric: true, label: intl.formatMessage({ id: 'created-at' }) },
        // { id: 'actions', numeric: false, label: intl.formatMessage({ id: 'actions' }) },
    ];

    const [products, setProducts] = useState<Product[]>([]);
    const [productToEdit, setProducttoEdit] = useState<Product>();
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [newProductModalVisible, setNewProductModalVisible] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetchProducts();
        // const product = {
        //     title: "Test",
        //     desc: "Test Description",
        //     price: Math.floor(Math.random() * 50) + 10,
        //     currency: "TL",
        //     stock: Math.floor(Math.random() * 20)
        // }
        // ProductService.createNewProduct(product);
    }, [])

    useEffect(() => {
        setFilteredProducts(products);
    }, [products])


    function fetchProducts() {
        ProductService.getProducts()
            .then(products => {
                setProducts(products)
                setLoading(false);
            })
            .catch(err => {
                alert(err)
                setLoading(false);
            });
    }

    function onSearchProduct(text: string): void {
        let filteredProducts = products;
        if (text) {
            filteredProducts = products.filter(product => (
                product.title.toLowerCase().includes(text) ||
                product.desc?.toLowerCase().includes(text) ||
                product.currency?.toLowerCase().includes(text) ||
                product.price == parseInt(text)
            ))
        }
        setFilteredProducts(filteredProducts)
    }

    function createProduct(newProduct: any): void {
        if (productToEdit) {
            fetchProducts();
            setProducttoEdit(null);
        } else {
            setProducts([newProduct].concat(products));
        }
        setNewProductModalVisible(false);
    }

    function editProduct(newProduct: any): void {
        //setProducts(products.concat([newProduct]));
        setNewProductModalVisible(false);
    }



    function renderProduct(product): JSX.Element {
        return (
            <ProductCard onPress={() => {
                setProducttoEdit(product);
                setNewProductModalVisible(true);
            }} product={product} index={product.index} />
        )
    }



    return (
        <DashboardLayout route='Product'>
            <div style={styles.container}>
                <ProductsHeader onNewProductPress={() => setNewProductModalVisible(true)} onSearchChanged={onSearchProduct} />
                <div style={styles.tableContainer}>
                    {
                        loading ? (
                            <div style={styles.spinnerContainer}>
                                <CircularProgress style={styles.spinner} />
                            </div>
                        ) : products.length > 0 ? (
                            <Table
                                data={filteredProducts}
                                headCells={headCells}
                                renderItem={renderProduct} />
                        ) : (<EmptyList />)
                    }
                </div>
                <ProductModal
                    visible={newProductModalVisible}
                    onClose={() => { setNewProductModalVisible(false); setProducttoEdit(null); }}
                    onSubmit={createProduct}
                    editData={productToEdit}
                    onDelete={() => {
                        fetchProducts()
                        setProducttoEdit(null)
                        setNewProductModalVisible(false);
                    }}
                />
            </div>
        </DashboardLayout>
    )
}

export default ProductsPage