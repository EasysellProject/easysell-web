import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../shared/components/dashboard-layout';
import { Product } from '../../shared/models/product';
import styles from './styles';
import DashboardHeader from "./dashboardHeader"

interface DashboardProps {

}


function Dashboard(props: DashboardProps): JSX.Element {

    useEffect(() => {
    }, [])

    return (
        <DashboardLayout route='Dashboard'>
            <div style={styles.container}>
                <DashboardHeader sales_amount = {0} total_profit = {0} 
                avg_sale_price = {0} profit_margin = {0} avg_product_price = {0} />
            </div>
        </DashboardLayout>
    )
}

export default Dashboard;