import React, { CSSProperties } from 'react'
import { useIntl } from 'react-intl';
import styles from './styles'

interface SimpleTextProps {
    textID: string;
    capitalized?: boolean
    additionalStyle?: CSSProperties
    required?: boolean
}

function SimpleText(props: SimpleTextProps): JSX.Element {
    const intl = useIntl()
    const { textID, capitalized, additionalStyle, required } = props
    let formattedText = intl.formatMessage({ id: textID || 'Dummy' });
    if (capitalized)
        formattedText = formattedText.toUpperCase()
    if (required)
        formattedText += '*'
    return (
        <div style={{ ...styles.text, ...additionalStyle }}>
            {formattedText}
        </div>
    )
}
export default SimpleText