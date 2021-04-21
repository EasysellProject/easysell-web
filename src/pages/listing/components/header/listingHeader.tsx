import React from 'react'
import { useState } from "react";
import { RiAddCircleLine } from 'react-icons/ri'

import { MarketPlace } from '../../../../shared/models/integration';
import SimpleText from "../../../../shared/components/text/simple-text";
import Button from "../../../../shared/components/button";
import DropDown from "../../../../shared/components/dropdown";
import Search from "../../../../shared/components/search"
import { APP_COLORS, WEB_STYLES } from '../../../../shared/styles';
import { useIntl } from 'react-intl';
import styles from './styles'


interface ListingHeaderProps {
    onSearchChanged: (text: string) => void;
    onFilter: (market: string) => void;
    onCreateNewPressed: () => void
    listingCount: number
}

function ListingHeader(props: ListingHeaderProps): JSX.Element {
    const { onSearchChanged, onFilter, onCreateNewPressed, listingCount } = props;
    const intl = useIntl();

    const [searchText, setSearchText] = useState('');
    const [marketPlace, setMarketPlace] = useState('');
    const data = [{ value: "Trendyol", text: "Trendyol", key: "1" },
    { value: "N11", text: "N11", key: "2" },
    { value: "Hepsiburada", text: "Hepsiburada", key: "3" },
    { value: "Amazon", text: "Amazon", key: "4" }
    ]

    function filterMarketPlace(marketPlace: string): void {
        onFilter(marketPlace)
        setMarketPlace(marketPlace)
    }

    function onSearchPress(): void {
        console.log(searchText);
        onSearchChanged(searchText);
    }
    function createNewListing(): void {
        console.log("create new button pressed")
        onCreateNewPressed();
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
                        filterMarketPlace(e.target.value)
                    }}
                    label={intl.formatMessage({ id: 'filter-marketplace' })}
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
        </div>
    )
}

export default ListingHeader;