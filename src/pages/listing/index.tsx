import React from 'react'
import Sidebar from '../../shared/components/sidebar'

interface ListingProps {

}

function Listing(props: ListingProps): JSX.Element {

    return (
        <div>
            <Sidebar item='Listing' />
        </div>
    )
}

export default Listing