import React from 'react';
import { APP_COLORS, WEB_STYLES } from '../../styles';
import SimpleText from '../text/simple-text';
import styles from './styles';
import Button from "../button";
import Input from "../input";
import {ReactNode } from 'react';
import { CSSProperties } from '@material-ui/styles';
import { GoSearch } from 'react-icons/go'
import MUIButton from '@material-ui/core/Button'
import { useIntl } from 'react-intl'


interface SearchProps{
    value:string,
    placeholder:string,
    additionalStyles?: CSSProperties
    onChangeText: (text: string) => void
    buttonStyle?: CSSProperties,
    onPress: () => void,
    componentStyle?:CSSProperties
}
function Search(props:SearchProps):JSX.Element{
    const intl = useIntl();
    const {value, placeholder, additionalStyles, onChangeText, buttonStyle, onPress, componentStyle} = props;
    let formattedPlaceholder = intl.formatMessage({ id: placeholder })
    return(
        <div style={{...componentStyle, ...styles.main}}>
            <MUIButton style={{...styles.button, ...buttonStyle}}
            onClick={onPress}
            ><GoSearch size={14}/></MUIButton>
            <input
            style={{...additionalStyles, ...styles.input}} 
            type="text"
            value={value}
            placeholder={formattedPlaceholder}
            onChange={(e)=>{onChangeText(e.target.value)}}
           />
        </div>
    );
}

export default Search;