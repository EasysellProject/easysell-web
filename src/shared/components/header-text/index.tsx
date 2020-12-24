import React, { CSSProperties } from 'react'
import { useIntl } from 'react-intl';
import styles from './styles'

interface HeaderTextProps {
    textID: string
    additionalStyle?: CSSProperties
}

function HeaderText(props: HeaderTextProps): JSX.Element {
    const intl = useIntl()
    const { textID, additionalStyle } = props
    const formattedText = intl.formatMessage({ id: textID });

    return (
        <div style={{ ...styles.text, ...additionalStyle }}>
            {formattedText}
        </div>
    )
}
export default HeaderText