import { CSSProperties } from '@material-ui/styles'
import React from 'react'
import { useIntl } from 'react-intl'
import SimpleText from '../text/simple-text'
import styles from './styles'

interface InputProps {
    value: string
    placeholder: string
    showLabel?: boolean
    label?: string
    additionalStyles?: CSSProperties
    onChangeText: (text: string) => void
}

function Input(props: InputProps): JSX.Element {
    const intl = useIntl()
    const { value, placeholder, additionalStyles, showLabel, label, onChangeText } = props
    const formattedPlaceholder = intl.formatMessage({ id: placeholder })

    return (
        <div style={additionalStyles}>
            {
                showLabel && label && (
                    <SimpleText
                        textID={label}
                        capitalized={true}
                        additionalStyle={{ fontWeight: 'bold' }}
                    />
                )
            }
            {
                <input style={styles.input} placeholder={formattedPlaceholder}></input>
            }
        </div>
        // <input />
    )
}

export default Input