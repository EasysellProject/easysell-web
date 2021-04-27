import React, { useState } from 'react';
import {BiSync} from "react-icons/bi"
import Button from '../../shared/components/button';
import Search from '../../shared/components/search';
import SimpleText from '../../shared/components/text/simple-text';
import { APP_COLORS } from '../../shared/styles';
import styles from './headerStyle';

interface OrdersHeaderProps {
    onSearchChanged: (text: string) => void;
    onNewOrderPress: () => void;
    // onFilter: (market: string) => void;
}

function OrdersHeader(props: OrdersHeaderProps): JSX.Element {
    const { onSearchChanged, onNewOrderPress } = props;
    const [searchText, setSearchText] = useState('');

    function onSearchPress(): void {
        console.log(searchText);
        onSearchChanged(searchText);
    }

    return (
        <div style={styles.container}>
            <SimpleText
                additionalStyle={styles.headerText}
                textID={"orders"}
            />
            <div
                style={styles.headerActions}
            >
                <Search
                    buttonStyle={styles.searchButton}
                    value={searchText}
                    placeholder="type-in-to-search"
                    onChangeText={(val) => {
                        setSearchText(val);
                    }}
                    onPress={onSearchPress}
                />
                {<Button
                    onPress={onNewOrderPress}
                    buttonStyle={styles.newOrderButton}>
                    <div style={styles.newOrderButtonInner}>
                        <BiSync color={APP_COLORS.gray} size={20} />
                        <SimpleText
                            textID="sync-orders"
                            additionalStyle={styles.newOrderText} />
                    </div>
                </Button>}
            </div>
        </div>
    )
}

export default OrdersHeader;