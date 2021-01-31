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
    const data = [{ value: "Trendyol", text: "Trendyol", key: "1" },
    { value: "N11", text: "N11", key: "2" },
    { value: "Hepsiburada", text: "Hepsiburada", key: "3" },
    { value: "Amazon", text: "Amazon", key: "4" }
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
            <div style={{ ...WEB_STYLES.flexRow }}>
                <SimpleText
                    additionalStyle={styles.headerText}
                    textID={"listings"}
                />
                <div style={{ marginTop: 25, marginLeft: 10, ...WEB_STYLES.flexRow }}>
                    <SimpleText
                        textID={"Total"}
                        additionalStyle={styles.listing_count_text} />
                    <div style={{ fontSize: 11, color: APP_COLORS.gray }}>
                        {listingCount}
                    </div>
                </div>
            </div>
            <Button
                onPress={createNewListing}
                buttonStyle={styles.create_new_button_style}>
                <div style={styles.create_new_button_inner_style}>
                    <RiAddCircleLine size={20} />
                    {<SimpleText
                        textID="Create-new"
                        additionalStyle={styles.create_new_button_inner_button_style} />}
                </div>
            </Button>
            <DropDown
                data={data}
                value={marketPlace}
                onChange={(e) => {
                    setMarketPlace(e.target.value)
                    filterMarketPlace(marketPlace)
                }
                }
                label={"Filter-Marketplace"}
                DropDownStyle={styles.drop_down_style}
            />
            <Search
                componentStyle={{ marginTop: 8 }}
                value={searchText}
                placeholder="Type-in-to-search"
                onChangeText={(val) => {
                    setSearchText(val);
                }
                }
                onPress={onSearchPress}
            />
        </div>
    )
}

export default ListingHeader;