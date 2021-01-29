import React from 'react';
import Sidebar from '../../shared/components/sidebar';
import ListingHeader from './listingHeader';
import styles from './styles'
import { APP_COLORS, APP_STYLES, WEB_STYLES } from "../../shared/styles";

interface ListingProps {

}

function Listing(props: ListingProps): JSX.Element {

    return (
        <div style={styles.listing }>
            <Sidebar item='Listing' />
            <ListingHeader/>
        </div>
    )
}

export default Listing