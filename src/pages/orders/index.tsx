import { CircularProgress } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import DashboardLayout from '../../shared/components/dashboard-layout';
import OrderCard from "../../shared/components/order-card"
import Table, { HeadCell } from '../../shared/components/table';
import { Order } from '../../shared/models/order';
import OrdersService from "../../shared/services/order-service"
import styles from './styles';
import OrdersHeader from "./ordersHeader"
import EmptyList from '../../shared/components/empty-list';

interface ordersProps{

}
function OrdersPage(props:ordersProps):JSX.Element{
    const intl = useIntl();

    const headCells: HeadCell[] = [
        { id: 'index', numeric: true, label: '' },
        { id: 'name', numeric: false, label: intl.formatMessage({ id: 'name' }) },
        { id: 'desc', numeric: false, label: intl.formatMessage({ id: 'description' }) },
        { id: 'price', numeric: true, label: intl.formatMessage({ id: 'price' }) },
        { id: 'currency', numeric: false, label: intl.formatMessage({ id: 'currency' }) },
        { id: 'stock', numeric: true, label: intl.formatMessage({ id: 'quantity' }) },
        { id: 'order no', numeric: true, label: intl.formatMessage({ id: 'order-no' }) },
        { id: 'ordered by', numeric: false, label: intl.formatMessage({ id: 'ordered-by' }) },
        { id: 'order date', numeric: false, label: intl.formatMessage({ id: 'order-date' }) },
        { id: 'due date', numeric: false, label: intl.formatMessage({ id: 'due-date' }) },
        // { id: 'actions', numeric: false, label: intl.formatMessage({ id: 'actions' }) },
    ];

    const [orders, setOrders] = useState<Order[]>([])
    const [filteredOrders, setFilteredOrders] = useState<Order[]>([])
    const [newOrderModalVisible, setNewOrderModalVisible] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        fetchOrders();
    }, [])
    useEffect(() => {
        setFilteredOrders(orders);
    }, [orders])

    function fetchOrders() {
        setLoading(true);
        OrdersService.getOrders()
            .then(orders => {
                setOrders(orders)
                setLoading(false);
            })
            .catch(err => {
                alert(err)
                setLoading(false);
            });
    }

    function onSearchOrder(text: string): void {
        let filteredOrders = orders;
        if (text) {
            filteredOrders = orders.filter(order => (
                order.orderNo.toString().includes(text) ||
                order.orderedBy.market.includes(text)||
                order.desc?.toLowerCase().includes(text) ||
                order.currency?.toLowerCase().includes(text) ||
                order.price == parseInt(text)
            ))
        }
        setFilteredOrders(filteredOrders)
    }

    function createOrder(newOrder: any): void {
        setOrders(orders.concat([newOrder]));
        setNewOrderModalVisible(false);
    }

    //change this according to orders
    function renderOrder(order): JSX.Element {
        return (
            <OrderCard onPress={() => { }} order={order} index={order.index} />
        )
    }

    return(<DashboardLayout route='Order'>
    <div style={styles.container}>
        <OrdersHeader onNewOrderPress={() => fetchOrders()} onSearchChanged={onSearchOrder} />
        <div style={styles.tableContainer}>
            {
                loading ? (
                    <div style={styles.spinnerContainer}>
                        <CircularProgress style={styles.spinner} />
                    </div>
                ) : orders.length > 0? (
                    <Table
                        data={filteredOrders}
                        headCells={headCells}
                        renderItem={renderOrder} />
                ):(
                    <EmptyList/>
                )
            }
        </div>
        {/*<ProductModal
            visible={newProductModalVisible}
            onClose={() => setNewProductModalVisible(false)}
            onSubmit={createProduct}
        />*/}
    </div>
</DashboardLayout>)
}

export default OrdersPage