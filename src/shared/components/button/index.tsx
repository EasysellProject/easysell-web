import React, { CSSProperties, ReactNode } from 'react'
import MUIButton from '@material-ui/core/Button'


import styles from './styles'

interface ButtonProps {
    buttonStyle?: CSSProperties,
    onPress: () => void,
    children: ReactNode
}

function Button(props: ButtonProps): JSX.Element {
    const { buttonStyle, onPress, children } = props


    return (
        <MUIButton style={{ ...styles.container, ...buttonStyle, textTransform: 'none' }} onClick={onPress}>
            {children}
        </MUIButton>
    )
}

export default Button