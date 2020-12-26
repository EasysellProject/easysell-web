import React, { CSSProperties } from 'react'
import { useIntl } from 'react-intl';
import styles from './styles'

interface HeaderTextProps {
    textID: string
    additionalStyle?: CSSProperties
    capitalized?: boolean
}

function HeaderText(props: HeaderTextProps): JSX.Element {
    const intl = useIntl()
    const { textID, additionalStyle, capitalized } = props
    let formattedText = intl.formatMessage({ id: textID });
    if (capitalized)
        formattedText = formattedText.toUpperCase()
    return (
        <div style={{ ...styles.text, ...additionalStyle }}>
            {formattedText}
        </div>
    )
}
export default HeaderText