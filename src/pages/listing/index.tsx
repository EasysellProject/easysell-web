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
import items from './items.json';
import names from './names.json';
import districts from './districts.json';
import streets from './streets.json';
import AuthService from '../../shared/services/auth-service';
import orderService from '../../shared/services/order-service';

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
    // const [tooltipOpened, setTooltipOpened] = useState<Listing>(null);
    const [createLoading, setCreateLoading] = useState<boolean>(false);
    const [removeLoading, setRemoveLoading] = useState<boolean>(false);

    useEffect(() => {
        fetchListings();
    }, [])


    function generateNumber(length) {
        var result = [];
        var characters = '0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result.push(characters.charAt(Math.floor(Math.random() *
                charactersLength)));
        }
        return result.join('');
    }

    function fetchListings(): void {
        // TODO fetch listings from integrationService
        setListingsLoading(true);
        ListingService.fetchListings()
            .then((listings) => {
                setListingsLoading(false);
                setListings(listings);
                setFilteredListings(listings);
                // let count = 150;
                // for (let i = 0; i < count; i++) {
                //     let idx = Math.floor(Math.random() * listings.length);
                //     let listing = listings[idx];
                //     console.log('create order from listing ', listing)
                //     let dueDate = new Date();
                //     dueDate.setDate(new Date().getDate() + Math.floor(Math.random() * 10 + 5))
                //     let nidx = Math.floor(Math.random() * names.people.length);
                //     let didx = Math.floor(Math.random() * districts.districts.length);
                //     let sidx = Math.floor(Math.random() * streets.streets.length);
                //     let order = {
                //         orderNo: generateNumber(9),
                //         orderDate: AuthService.getRandomDate(new Date(1609460000000), new Date()).getTime(),
                //         dueDate: AuthService.getRandomDate(new Date(), dueDate).getTime(),
                //         cargoCompany: {
                //             _id: "ASwtsHgsawE",
                //             name: "MNG Kargo",
                //             shortName: "MNG",
                //             logo: "https://pbs.twimg.com/profile_images/999569747778748416/PIkmvcJf_400x400.jpg",
                //         },
                //         product: {
                //             _id: listing.product._id,
                //             title: listing.product.title,
                //             desc: listing.product.desc,
                //             price: listing.product.price,
                //             stock: listing.product.stock,
                //             currency: listing.product.currency,
                //             img: listing.product.img,
                //         },
                //         deliveryAddress: {
                //             address: 'Bina No:' + Math.floor(Math.random() * 100 + 1) + ', Kapi No:' + Math.floor(Math.random() * 30 + 1) + ` ${streets.streets[sidx][0]}, ${districts.districts[didx][0]}, ${districts.districts[didx][1]}`,
                //             name: names.people[nidx][0],
                //             email: names.people[nidx][1],
                //             district: streets.streets[sidx][0],
                //             town: districts.districts[didx][0],
                //             city: districts.districts[didx][1],
                //         },
                //         orderedBy: {
                //             _id: generateNumber(9),
                //             name: names.people[nidx][0],
                //             market: Math.floor(Math.random() * 2) == 1 ? 'Trendyol' : 'Hepsiburada'
                //         }
                //     }
                //     console.log('create order ', order)
                //     orderService.createNewOrder(order);
                // }
                /**
                 let order = {
                     orderNo: generateNumber()
                     orderDate: AuthService.getRandomDate(new Date(1609460000000), new Date())
                     dueDate: AuthService.getRandomDate(new Date(), new Date().addDays(Math.floor(Math.random() * 10 + 5 )))
                     cargoCompany:{
                         _id: "ASwtsHgsawE",
                         name: "MNG Kargo",
                         shortName: "MNG",
                         logo:"https://pbs.twimg.com/profile_images/999569747778748416/PIkmvcJf_400x400.jpg",
                     },
                     product:{
                         _id: listing.product._id,
                         title: listing.product.title,
                         desc: listing.product.desc,
                         price: listing.product.price,
                         stock: listing.product.stock,
                         currency: listing.product.currency,
                         img: listing.product.img,
                     },
                     deliveryAddress:
                 }
                 */
            })
            .catch(err => {
                setListingsLoading(false);
            })
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
                // listings.splice(listings.findIndex(l => l._id == listing._id), 1);
                // console.log('deleting ', listings)
                // setListings(listings);
                // setFilteredListings(listings);
                // setUpdate(update + 1);
                fetchListings();
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
        if (listing.product.title == 'Filiz') {
            console.log('render listing ', listing);
        }
        return (
            <ListingCard
                editListing={() => editListing(listing)}
                removeListing={() => removeListing(listing)}
                listing={listing}
                index={listing.index}
                // onMorePressed={(listing) => {
                //     setTooltipOpened(listing);
                // }
            />
        )
    }

    function randomListings() {
        const json = items.items
        let count = 50;
        for (let i = 0; i < count; i++) {
            let idx = Math.floor(Math.random() * json.length);
            let item = json[idx];
            let product = {
                title: item[1],
                desc: item[2],
                price: item[0],
                stock: Math.floor(Math.random() * 50) + 10,
                currency: "TL",
                category: "",
                img: item[3]
            }
            let listing = {
                product,
                createdAt: new Date().getTime(),
                marketPlace: Math.floor(Math.random() * 2) == 1 ? ['Trendyol', 'Hepsiburada'] : Math.floor(Math.random() * 2) == 1 ? ["Hepsiburada"] : ["Trendyol"]
            }
            ProductService.createNewProduct(product)
                .then(() => {
                    listing.product = product;
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
                });
        }
        console.log('json ', json)
        /**
         {
             product:{
                 title: '',
                 desc: '',
                 price: 0,
                 stock: Math.random() * 50 + 10,
                 currency: "TL",
                 category: "",
                 img: ""
             },
             createdAt: new Date().getTime(),
             marketPlace: Math.floor(Math.random() * 2) == 1 ? ['Trendyol', 'Hepsiburada'] : Math.floor(Math.random() * 2) == 1 ? ["Hepsiburada"] : ["Trendyol"],
         }
         */
    }

    return (
        <DashboardLayout route='Listing'>
            <div style={styles.innerContainer}>
                <ListingHeader listingCount={listings.length} onCreateNewPressed={() => setCreateModalVisible(true)} onSearchChanged={onSearchListing} onFilter={onFilterListing} />
                {/* <button onClick={randomListings}>Randomize</button> */}
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
                                        // listings[listings.findIndex(li => li._id == listing._id)] = new Listing(listing);
                                        // console.log('listings after edit ', listings);
                                        // setListings(listings);
                                        // setFilteredListings(listings);
                                        // setUpdate(update + 1);
                                        // setCreateLoading(false);
                                        fetchListings();
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