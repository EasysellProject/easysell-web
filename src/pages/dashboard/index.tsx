import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../shared/components/dashboard-layout';
import { Product } from '../../shared/models/product';
import styles from './styles';

interface DashboardProps {

}


function Dashboard(props: DashboardProps): JSX.Element {

    useEffect(() => {
    }, [])

    return (
        <DashboardLayout route='Dashboard'>
            <div style={styles.container}>
                Dashboard
            </div>
        </DashboardLayout>
    )
}

export default Dashboard