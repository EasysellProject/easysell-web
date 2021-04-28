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
import ListingService from '../../shared/services/listing-service';
import { CircularProgress, Dialog } from '@material-ui/core';
import EmptyList from '../../shared/components/empty-list';

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
    const [listingsLoading, setListingsLoading] = useState<boolean>(false);
    const [filteredListing, setFilteredListings] = useState<any[]>([]);
    const [listingModal, setListingModal] = useState<{ visible: boolean, type: 'edit' | 'create' }>({ visible: false, type: 'edit' });
    const [selectedListing, setSelectedListing] = useState<Listing>();
    const [createModalVisible, setCreateModalVisible] = useState(false);
    const [tooltipOpened, setTooltipOpened] = useState<Listing>(null);
    const [createLoading, setCreateLoading] = useState<boolean>(false);
    const [removeLoading, setRemoveLoading] = useState<boolean>(false);

    useEffect(() => {
        fetchListings();
    }, [])

    function fetchListings(): void {
        // TODO fetch listings from integrationService
        setListingsLoading(true);
        ListingService.fetchListings()
            .then((listings) => {
                setListingsLoading(false);
                setListings(listings);
                setFilteredListings(listings);
            })
            .catch(err => {
                setListingsLoading(false);
            })
        // setListings(generateRandomListings());
    }

    function editListing(listing: Listing): void {
        setListingModal({ visible: true, type: 'edit' });
        setSelectedListing(new Listing(listing));
    }

    function removeListing(listing: Listing): void {
        setRemoveLoading(true);
        ListingService.deleteListing(listing)
            .then(() => {
                setRemoveLoading(false);
                listings.splice(listings.findIndex(l => l._id == listing._id), 1);
                console.log('deleting ', listings)
                setListings(listings);
            }).catch(err => {
                setRemoveLoading(false);
            })
    }


    function onSearchListing(text: string): void {
        let filteredListings = listings;
        if (text) {
            filteredListings = listings.filter(listing =>
                listing.product.title.toLowerCase().includes(text) ||
                listing.product.desc?.toLowerCase().includes(text) ||
                listing.product.currency.toLowerCase().includes(text) ||
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
        let newListing = new Listing();
        newListing.product = product;
        setSelectedListing(newListing);
    }

    function closeListingModal(): void {
        setListingModal({ visible: false, type: 'edit' });
        setSelectedListing(null);
    }

    function renderListing(listing): JSX.Element {
        return (
            <ListingCard
                editListing={() => editListing(listing)}
                removeListing={() => removeListing(listing)}
                tooltipVisible={tooltipOpened && listing._id == tooltipOpened._id}
                listing={listing}
                index={listing.index}
                onMorePressed={(listing) => {
                    if (tooltipOpened && listing._id == tooltipOpened._id)
                        setTooltipOpened(null);
                    else
                        setTooltipOpened(listing);
                }}

            />
        )
    }

    return (
        <DashboardLayout route='Listing'>
            <div style={styles.innerContainer}>
                <ListingHeader listingCount={listings.length} onCreateNewPressed={() => setCreateModalVisible(true)} onSearchChanged={onSearchListing} onFilter={onFilterListing} />
                <div style={styles.dataContainer}>
                    {
                        listingsLoading ? (
                            <div style={styles.spinner}>
                                <CircularProgress size={16} />
                            </div>
                        ) : listings.length > 0 ? (
                            <Table
                                data={filteredListing}
                                onEditListing={editListing}
                                headCells={headCells}
                                renderItem={renderListing} />
                        ) : (
                            <EmptyList />
                        )
                    }
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
                            setCreateLoading(true)
                            if (listingModal.type == 'edit') {
                                ListingService.editListing(listing)
                                    .then(() => {
                                        setCreateLoading(false);
                                        closeListingModal()
                                    })
                                    .catch(() => {
                                        setCreateLoading(false);
                                    })
                            } else if (listingModal.type == 'create') {
                                if (selectedListing) {
                                    // create a listing from product
                                    ListingService.createListing(listing)
                                        .then((listing: Listing) => {
                                            setCreateLoading(false);
                                            setListings(listings.concat(listing));
                                            setFilteredListings(listings.concat(listing));
                                            closeListingModal()
                                        })
                                        .catch(() => {
                                            setCreateLoading(false);
                                        })
                                } else {
                                    // create new listing and product
                                    ListingService.createListing(listing)
                                        .then((listing: Listing) => {
                                            setCreateLoading(false);
                                            setListings(listings.concat(listing));
                                            setFilteredListings(listings.concat(listing));
                                            closeListingModal()
                                        })
                                        .catch(() => {
                                            setCreateLoading(false);
                                        })
                                    let product = listing.product
                                    ProductService.createNewProduct(product);
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
            {
                removeLoading && (
                    <div
                        style={styles.fullscreenSpinner}>
                        <CircularProgress size={24} />
                    </div>
                )
            }
            {/* <Dialog
                open={removeLoading}
                fullScreen
                style={{ backgroundColor: 'rgba(0,0,0,0.25)', display: 'flex',  }}
            >
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'transparent'
                }}>
                    <CircularProgress size={16} />
                </div>
            </Dialog> */}
        </DashboardLayout>
    )
}

export default ListingPage