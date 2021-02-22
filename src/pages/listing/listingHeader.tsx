import React from 'react'
import { useState } from "react";
import styles from './styles'
import Input from "../../shared/components/input";
import Button from "../../shared/components/button";
import DropDown from "../../shared/components/dropdown";
import SimpleText from "../../shared/components/text/simple-text";
import Search from "../../shared/components/search"
import { GoSearch } from 'react-icons/go'
import { RiAddCircleLine } from 'react-icons/ri'
import { APP_COLORS, WEB_STYLES } from '../../shared/styles';


interface ListingHeaderProps {

}

function ListingHeader(props: ListingHeaderProps): JSX.Element {

    const [searchText, setSearchText] = useState('');
    const [marketPlace, setMarketPlace] = useState('');
    const data = [{ value: "trendyol", text: "trendyol", key: "1" },
    { value: "N11", text: "N11", key: "2" },
    { value: "hepsiburada", text: "hepsiburada", key: "3" },
    { value: "amazon", text: "amazon", key: "4" }
    ]
    const [listingCount, setListingCount] = useState(0);

    const filterMarketPlace = (market_place: string) => {

    }

    const onSearchPress = () => {
        console.log("search button pressed")
        console.log(searchText);
    }
    const createNewListing = () => {
        console.log("create new button pressed")
    }
    return (
        <div style={styles.header}>
            <div style={{ ...WEB_STYLES.flexRow, flex: 1, alignItems: 'baseline' }}>
                <SimpleText
                    additionalStyle={styles.headerText}
                    textID={"listings"}
                />
                <div style={{ marginLeft: 10, ...WEB_STYLES.flexRow }}>
                    <SimpleText
                        textID={"total"}
                        additionalStyle={styles.listing_count_text} />
                    <SimpleText
                        textID={'' + listingCount}
                        additionalStyle={styles.listing_count_text}
                    />
                </div>
            </div>
            <div style={{ ...WEB_STYLES.flexRow, flex: 1, alignItems: 'baseline', justifyContent: 'flex-end' }}>
                <Button
                    onPress={createNewListing}
                    buttonStyle={styles.create_new_button_style}>
                    <div style={styles.create_new_button_inner_style}>
                        <RiAddCircleLine color={APP_COLORS.gray} size={20} />
                        <SimpleText
                            textID="create-new"
                            additionalStyle={styles.createNewText} />
                    </div>
                </Button>
                <DropDown
                    data={data}
                    value={marketPlace}
                    onChange={(e) => {
                        setMarketPlace(e.target.value)
                        filterMarketPlace(marketPlace)
                    }}
                    label={"filter-marketplace"}
                    DropDownStyle={styles.drop_down_style}
                />
                <Search
                    containerStyle={{ marginTop: 8 }}
                    buttonStyle={styles.searchButton}
                    value={searchText}
                    placeholder="type-in-to-search"
                    onChangeText={(val) => {
                        setSearchText(val);
                    }}
                    onPress={onSearchPress}
                />
            </div>
        </div >
    )
}

export default ListingHeader;