import React, { useState } from 'react';
import { RiAddCircleLine } from 'react-icons/ri';
import Button from '../../shared/components/button';
import Search from '../../shared/components/search';
import SimpleText from '../../shared/components/text/simple-text';
import { APP_COLORS } from '../../shared/styles';

import styles from './headerStyles';

interface ProductsHeaderProps {
    onSearchChanged: (text: string) => void;
    onNewProductPress: () => void;
    // onFilter: (market: string) => void;
}

function ProductsHeader(props: ProductsHeaderProps): JSX.Element {
    const { onSearchChanged, onNewProductPress } = props;
    const [searchText, setSearchText] = useState('');

    function onSearchPress(): void {
        console.log(searchText);
        onSearchChanged(searchText);
    }

    return (
        <div style={styles.container}>
            <SimpleText
                additionalStyle={styles.headerText}
                textID={"products"}
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
                <Button
                    onPress={onNewProductPress}
                    buttonStyle={styles.newProductButton}>
                    <div style={styles.newProductButtonInner}>
                        <RiAddCircleLine color={APP_COLORS.gray} size={20} />
                        <SimpleText
                            textID="create-new"
                            additionalStyle={styles.newProductText} />
                    </div>
                </Button>
            </div>
        </div>
    )
}

export default ProductsHeader;