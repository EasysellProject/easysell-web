import React, { CSSProperties } from 'react'
import { useIntl } from 'react-intl';
import styles from './styles'

interface SimpleTextProps {
    textID: string;
    capitalized?: boolean
    additionalStyle?: CSSProperties
}

function SimpleText(props: SimpleTextProps): JSX.Element {
    const intl = useIntl()
    const { textID, capitalized, additionalStyle } = props
    let formattedText = intl.formatMessage({ id: textID });
    if (capitalized)
        formattedText = formattedText.toUpperCase()
    return (
        <div style={{ ...styles.text, ...additionalStyle }}>
            {formattedText}
        </div>
    )
}
export default SimpleText