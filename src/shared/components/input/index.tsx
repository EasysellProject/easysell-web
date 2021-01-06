import { CSSProperties } from '@material-ui/styles'
import React from 'react'
import { useIntl } from 'react-intl'
import { APP_COLORS } from '../../styles'
import SimpleText from '../text/simple-text'
import styles from './styles'

type InputType = "password" | "text"

interface InputProps {
    value: string
    placeholder: string
    showLabel?: boolean
    required?: boolean
    label?: string
    additionalStyles?: CSSProperties
    onChangeText: (text: string) => void;
    showError?: boolean
    errorText?: string
    type?: InputType
}

function Input(props: InputProps): JSX.Element {
    const intl = useIntl()
    const { value, placeholder, additionalStyles, required, showLabel, type, label, onChangeText, showError, errorText } = props
    let formattedPlaceholder = intl.formatMessage({ id: placeholder })
    return (
        <div style={additionalStyles}>
            {
                showLabel && label && (
                    <SimpleText
                        textID={label}
                        required={required}
                        capitalized
                        additionalStyle={{ fontWeight: 'bold' }}
                    />
                )
            }
            {
                <input type={type || 'text'} value={value} style={styles.input} placeholder={formattedPlaceholder} onChange={(e) => onChangeText(e.target.value)}></input>
            }
            {
                showError && errorText && (
                    <SimpleText
                        textID={errorText}
                        additionalStyle={{ fontWeight: 'bold', color: APP_COLORS.errorRed, fontSize: 10, marginTop: 0, marginLeft: 4 }}
                    />
                )
            }
        </div>
        // <input />
    )
}

export default Input