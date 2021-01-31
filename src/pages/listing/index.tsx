<<<<<<< HEAD
import React from 'react';
import Sidebar from '../../shared/components/sidebar';
import ListingHeader from './listingHeader';
import styles from './styles'
import { APP_COLORS, APP_STYLES, WEB_STYLES } from "../../shared/styles";
import DashboardLayout from '../../shared/components/dashboard-layout';
=======
import React from 'react'
import DashboardLayout from '../../shared/components/dashboard-layout'
import Sidebar from '../../shared/components/sidebar'
>>>>>>> dev

interface ListingProps {

}

function Listing(props: ListingProps): JSX.Element {

    return (
        <DashboardLayout route='Listing'>
            <Sidebar item='Listing' />
            <ListingHeader />
        </DashboardLayout>
    )
}

export default Listing