import React, { CSSProperties } from 'react'
import { useIntl } from 'react-intl';
import LinesEllipsis from "react-lines-ellipsis";
import responsiveHOC from 'react-lines-ellipsis/lib/responsiveHOC'
import styles from './styles'

const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis)

interface SimpleTextProps {
    textID?: string;
    text?: string
    capitalized?: boolean
    additionalStyle?: CSSProperties
    required?: boolean
    ellipsis?: boolean
    maxLine?: number
}

function SimpleText(props: SimpleTextProps): JSX.Element {
    const intl = useIntl()
    const { textID, text, capitalized, additionalStyle, required, ellipsis, maxLine } = props
    let formattedText = text;
    if (textID)
        formattedText = intl.formatMessage({ id: textID || 'Dummy' });
    if (capitalized)
        formattedText = formattedText.toUpperCase()
    if (required)
        formattedText += '*'
    return (
        <div style={{ ...styles.text, ...additionalStyle }}>
            {
                !ellipsis ? (
                    <>
                        {formattedText}
                    </>
                ) : (
                    <ResponsiveEllipsis
                        text={formattedText}
                        basedOn="letters"
                        maxLine={maxLine || 1}
                        style={{ "overflow-wrap": "break-word", "white-space": "pre-wrap", "flex": 1 }}
                    />
                )
            }
        </div>
    )
}
export default SimpleText