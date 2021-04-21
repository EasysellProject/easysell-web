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
                <DashboardHeader username={"Anar"} sales_amount = {200} total_profit = {100} 
                avg_sale_price = {100} profit_margin = {500} avg_product_price = {100} />
            </div>
        </DashboardLayout>
    )
}

export default Dashboard;