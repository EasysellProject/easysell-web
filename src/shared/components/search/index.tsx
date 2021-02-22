import React, { CSSProperties } from 'react';
import { GoSearch } from 'react-icons/go'
import MUIButton from '@material-ui/core/Button'
import { useIntl } from 'react-intl'

import styles from './styles';
import { APP_COLORS } from '../../styles';

interface SearchProps {
    value: string,
    placeholder: string,
    additionalStyles?: CSSProperties
    onChangeText: (text: string) => void
    buttonStyle?: CSSProperties,
    onPress: () => void,
    containerStyle?: CSSProperties
}
function Search(props: SearchProps): JSX.Element {
    const intl = useIntl();
    const { value, placeholder, additionalStyles, onChangeText, buttonStyle, onPress, containerStyle } = props;
    let formattedPlaceholder = intl.formatMessage({ id: placeholder })
    return (
        <div style={{ ...styles.main, ...containerStyle, }}>
            <MUIButton style={{ ...styles.button, ...buttonStyle }}
                onClick={onPress}
            >
                <GoSearch size={22} color={APP_COLORS.gray} />
            </MUIButton>
            <input
                style={{ ...additionalStyles, ...styles.input }}
                type="text"
                value={value}
                placeholder={formattedPlaceholder}
                onChange={(e) => { onChangeText(e.target.value) }}
            />
        </div>
    );
}

export default Search;