import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../shared/components/dashboard-layout';
import { Product } from '../../shared/models/product';
import styles from './styles';
import DashboardHeader from "./dashboardHeader"

import LineChart from './components/chart'

interface DashboardProps {

}


function Dashboard(props: DashboardProps): JSX.Element {

    useEffect(() => {
    }, [])
    var data = [1, 2, 3, 4, 5, 6, 5, 3, 5, 3, 2, 1, 1, 10, 11]
    var labels = ["1 ocak 2021", "2 ocak 2021", "3 ocak 2021", "4 ocak 2021", "5 ocak 2021", "6 ocak 2021", "7 ocak 2021", "8 ocak 2021", "9 ocak 2021", "10 ocak 2021", "11 ocak 2021", "12 ocak 2021", "13 ocak 2021", "14 ocak 2021", "15 ocak 2021"]
    var title = "# of Sales"
    var height = "40%"
    var width = "75%"



    return (
        <DashboardLayout route='Dashboard'>
            <div style={styles.container}>
                <div>
                    <DashboardHeader sales_amount={0} total_profit={0}
                        avg_sale_price={0} profit_margin={0} avg_product_price={0} />
                </div>
                <LineChart title={title} data={data} labels={labels} height={height} width={width} />
            </div>
        </DashboardLayout>
    )
}

export default Dashboard;