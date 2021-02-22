import React from 'react';
import ListingHeader from './listingHeader';
import styles from './styles'
import { APP_COLORS, APP_STYLES, WEB_STYLES } from "../../shared/styles";
import DashboardLayout from '../../shared/components/dashboard-layout';
import ListingCard from '../../shared/components/listing-card'
import Sidebar from '../../shared/components/sidebar'
import logo from '../../assets/images/logo.png'
import { Listing } from '../../shared/models/listing'

interface ListingProps {

}

function ListingPage(props: ListingProps): JSX.Element {

    let listing = new Listing({
        _id: 'sdaslkdjas213',
        title: 'Test',
        price: 5,
        dispatchTime: 100,
        stock: 100,
        cargoCompanies: [{
            _id: '12531qqw2lkjas',
            name: 'Aras Kargo',
            shortName: "ARS",
            logo: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fi4.hurimg.com%2Fi%2Fhurriyet%2F75%2F1200x675%2F5e1c4e1f7af50714c889242e.jpg&imgrefurl=https%3A%2F%2Fwww.hurriyet.com.tr%2Fgundem%2Faras-kargo-musteri-hizmetleri-telefon-numarasi-nedir-direk-operatore-baglanma-ve-iletisim-no-41418626&tbnid=3WWa2bPk6rEf6M&vet=12ahUKEwjwrIr57cbuAhXRu6QKHaFdCKYQMygAegUIARCUAQ..i&docid=R8RZ3mXdsIfKQM&w=1200&h=675&q=aras%20kargo&ved=2ahUKEwjwrIr57cbuAhXRu6QKHaFdCKYQMygAegUIARCUAQ',
        }],
        marketPlace: ['trendyol'],
        createdAt: new Date().getTime(),
        img: 'data:image/png;base64,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'
    })

    return (
        <DashboardLayout route='Listing'>
            <ListingHeader />
            
            {/* <ListingCard index={1} listing={listing} /> */}
            {/* <ListingCard2 data={null} image={logo} /> */}
        </DashboardLayout>
    )
}

export default ListingPage