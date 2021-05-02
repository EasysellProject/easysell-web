import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../shared/components/dashboard-layout';
import { Product } from '../../shared/models/product';
import styles from './styles';
import DashboardHeader from "./dashboardHeader"
import OrdersService from "../../shared/services/order-service"
import LineChart from './components/chart'
import { Order } from '../../shared/models/order';
import { Helper } from '../../shared/libs/helper';
import { useIntl } from 'react-intl';

interface DashboardProps {

}


function Dashboard(props: DashboardProps): JSX.Element {

    const [labels, setLabels] = useState<string[]>([])
    const [data, setData] = useState<any[]>([])
    const [orders, setOrders] = useState<Order[]>([])
    useEffect(() => {
        let labels = []
        let data = []
        for (let i = 13; i >= 0; i--) {
            let d = new Date();
            d.setDate(d.getDate() - i)
            labels.push(Helper.getDMYTime(d))
            data.push(0)

        }
        setLabels(labels)
        OrdersService.getOrders().then(orders => {
            setOrders(orders)
            orders.forEach(order => {
                let idx = labels.findIndex(label => label == Helper.getDMYTime(order.orderDate))
                if (idx > -1) {
                    data[idx] += 1
                }
            })
            data[6] = 8
            setData(data)
        })
            .catch(err => {
                console.log(err.message)
                alert(err)
            })
    }, [])
    //var data = [1, 2, 3, 4, 5, 6, 5, 3, 5, 3, 2, 1, 1, 10, 11]
    //var labels = ["1 ocak 2021", "2 ocak 2021", "3 ocak 2021", "4 ocak 2021", "5 ocak 2021", "6 ocak 2021", "7 ocak 2021", "8 ocak 2021", "9 ocak 2021", "10 ocak 2021", "11 ocak 2021", "12 ocak 2021", "13 ocak 2021", "14 ocak 2021", "15 ocak 2021"]
    var title = useIntl().formatMessage({ id: 'number-of-orders' })
    var height = "40%"
    var width = "75%"



    return (
        <DashboardLayout route='Dashboard'>
            <div style={styles.container}>
                <div>
                    <DashboardHeader />
                </div>
                <LineChart title={title} data={data} labels={labels} height={height} width={width} />
            </div>
        </DashboardLayout>
    )
}

export default Dashboard;