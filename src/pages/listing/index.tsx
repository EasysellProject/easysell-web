import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';

import ListingHeader from './components/header/listingHeader';
import DashboardLayout from '../../shared/components/dashboard-layout';
import { Listing } from '../../shared/models/listing'
import Table, { HeadCell } from '../../shared/components/table';
import ListingModal from '../../shared/components/modals/listing-modal';
import ListingCard from '../../shared/components/listing-card';
import NewListingModal from './components/new-listing-modal';
import styles from './styles';
import { Product } from '../../shared/models/product';
import ProductService from '../../shared/services/product-service';

interface ListingProps {

}

function ListingPage(props: ListingProps): JSX.Element {
    const intl = useIntl();

    const headCells: HeadCell[] = [
        { id: 'index', numeric: true, label: '' },
        { id: 'title', numeric: false, label: intl.formatMessage({ id: 'product-info' }) },
        { id: 'desc', numeric: false, label: intl.formatMessage({ id: 'description' }) },
        { id: 'price', numeric: true, label: intl.formatMessage({ id: 'price' }) },
        { id: 'currency', numeric: false, label: intl.formatMessage({ id: 'currency' }) },
        { id: 'stock', numeric: true, label: intl.formatMessage({ id: 'quantity' }) },
        { id: 'marketPlace', numeric: false, label: intl.formatMessage({ id: 'marketplace' }) },
        { id: 'createdAt', numeric: true, label: intl.formatMessage({ id: 'created-at' }) },
        { id: 'actions', numeric: false, label: intl.formatMessage({ id: 'actions' }) },
    ];

    const [listings, setListings] = useState<Listing[]>([]);
    const [tableData, setTableData] = useState<any[]>([]);
    const [filteredListing, setFilteredListings] = useState<any[]>([]);
    const [listingModal, setListingModal] = useState<{ visible: boolean, type: 'edit' | 'create' }>({ visible: false, type: 'edit' });
    const [selectedListing, setSelectedListing] = useState<Listing>();
    const [createModalVisible, setCreateModalVisible] = useState(false);
    const [tooltipOpened, setTooltipOpened] = useState<Listing>(null);
    const [createLoading, setCreateLoading] = useState<boolean>(false);

    useEffect(() => {
        fetchListings();
    }, [])

    function generateRandomID(): string {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < 12; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    function getRandomDate(from: Date, to: Date): Date {
        const fromTime = from.getTime();
        const toTime = to.getTime();
        return new Date(fromTime + Math.random() * (toTime - fromTime));
    }


    function generateRandomListings(): Listing[] {
        let listings: Listing[] = [];
        let infos = [
            {
                title: "Nike",
                desc: "Unisex Küçük Boy Sırt Çantası",
                img: 'https://cdn.dsmcdn.com/mnresize/-/-//ty76/product/media/images/20210222/19/66004015/144844476/1/1_org_thumb.jpg',
                price: 145,
                currency: "TL"
            }
            ,
            {
                title: "Nike",
                desc: "Nike 2.0 elementi Backpack Sırt Çantası",
                img: 'https://cdn.dsmcdn.com/mnresize/-/-//ty45/product/media/images/20210105/9/46370072/99054131/1/1_org_thumb.jpg',
                price: 140,
                currency: "TL"
            },
            {
                title: "Nike",
                desc: "Unisex Siyah Kırmızı Detaylı Sırt Çantası",
                img: "https://cdn.dsmcdn.com/mnresize/-/-//ty84/product/media/images/20210311/15/70718479/22374021/1/1_org_thumb.jpg",
                price: 129.99,
                currency: "TL"
            },
            {
                title: "XS Max",
                desc: "Iphone Tüm Cihazlarla Uyumlu Şarj Aleti",
                img: "https://cdn.dsmcdn.com/mnresize/-/-//ty81/product/media/images/20210310/18/70501445/94101997/1/1_org_thumb.jpg",
                price: 34.99,
                currency: "TL"
            },
            {
                title: "Nike",
                desc: "Unisex Siyah Kırmızı Detaylı Sırt Çantası",
                img: 'https://cdn.dsmcdn.com/mnresize/-/-//ty81/product/media/images/20210310/18/70501445/94101997/1/1_org_thumb.jpg',
                price: 128.70,
                currency: "TL"
            }
        ]
        let data = []
        for (let i = 0; i < 100; i++) {
            let info = infos[i % infos.length];
            let details = {
                _id: generateRandomID(),
                index: i + 1,
                title: info.title,
                desc: info.desc,
                price: info.price,
                img: info.img,
                stock: Math.floor(Math.random() * 50),
                marketPlace: Math.floor(Math.random() * 2) == 2 ? ['Trendyol', 'Hepsiburada'] : Math.floor(Math.random() * 2) == 2 ? ["Hepsiburada"] : ["Trendyol"],
                currency: info.currency,
                createdAt: getRandomDate(new Date(1609460000000), new Date()) // random time since 1 january 2021
            }
            listings.push(new Listing(details));
            data.push(details);
        }
        setTableData(data);
        setFilteredListings(listings);
        return listings;
    }

    function fetchListings(): void {
        // TODO fetch listings from integrationService
        setListings(generateRandomListings());
    }

    function editListing(listing): void {
        setListingModal({ visible: true, type: 'edit' });
        setSelectedListing(new Listing(listing));
    }

    function onSearchListing(text: string): void {
        let filteredListings = listings;
        if (text) {
            filteredListings = listings.filter(listing =>
                listing.title.toLowerCase().includes(text) ||
                listing.desc?.toLowerCase().includes(text) ||
                listing.currency.toLowerCase().includes(text) ||
                listing.marketPlace.filter(market => market.toLowerCase().includes(text)).length > 0
            )
        }
        setFilteredListings(filteredListings);
    }

    function onFilterListing(market: string): void {
        let filteredListings = listings;
        if (market)
            filteredListings = filteredListings.filter(listing => listing.marketPlace.findIndex(marketPlace => marketPlace == market) > -1);
        setFilteredListings(filteredListings);
    }

    function newListingFromProduct(product: Product): void {
        setListingModal({ visible: true, type: 'create' });
        setSelectedListing(new Listing(product));
    }

    function closeListingModal(): void {
        setListingModal({ visible: false, type: 'edit' });
        setSelectedListing(null);
    }

    function renderListing(listing): JSX.Element {
        return (
            <ListingCard editListing={() => editListing(listing)} tooltipVisible={tooltipOpened && listing._id == tooltipOpened._id} listing={listing} index={listing.index} onMorePressed={(listing) => {
                if (tooltipOpened && listing._id == tooltipOpened._id)
                    setTooltipOpened(null);
                else
                    setTooltipOpened(listing);
            }} />
        )
    }

    return (
        <DashboardLayout route='Listing'>
            <div style={styles.innerContainer}>
                <ListingHeader listingCount={listings.length} onCreateNewPressed={() => setCreateModalVisible(true)} onSearchChanged={onSearchListing} onFilter={onFilterListing} />
                <div style={styles.tableContainer}>
                    <Table
                        data={filteredListing}
                        onEditListing={editListing}
                        headCells={headCells}
                        renderItem={renderListing} />
                </div>
            </div>
            {
                listingModal.visible && (
                    <ListingModal
                        header={listingModal.type == 'edit' ? 'edit-listing' : 'create-listing'}
                        listing={selectedListing}
                        children={null}
                        closeModal={closeListingModal}
                        loading={createLoading}
                        onSubmit={(listing: any) => {
                            if (listingModal.type == 'edit') {
                                // listingService.editListing(listing)
                            } else if (listingModal.type == 'create') {
                                if (selectedListing) {
                                    // create a listing from product
                                    // listingService.create(listing)
                                } else {
                                    // create new listing and product
                                    // listingService.create(listing)
                                    ProductService.createNewProduct(listing)
                                }
                            }
                        }}
                    />
                )
            }
            <NewListingModal
                visible={createModalVisible}
                onClose={() => setCreateModalVisible(false)}
                onSelectProduct={(product: Product) => newListingFromProduct(product)}
                onCreateProduct={() => {
                    setSelectedListing(null);
                    setListingModal({ visible: true, type: 'create' });
                }}
            />

        </DashboardLayout>
    )
}

export default ListingPage