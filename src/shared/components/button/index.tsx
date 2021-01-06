import React, { CSSProperties, ReactNode } from 'react'
import MUIButton from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress';


import styles from './styles'

interface ButtonProps {
    buttonStyle?: CSSProperties,
    onPress: () => void,
    children: ReactNode
    loading?: boolean
}

function Button(props: ButtonProps): JSX.Element {
    const { buttonStyle, onPress, children, loading } = props


    return (
        <MUIButton style={{ ...styles.container, ...buttonStyle, textTransform: 'none' }} onClick={onPress}>
            {
                loading ? (
                    <CircularProgress size={16} />
                ) : (
                        children
                    )
            }
        </MUIButton >
    )
}

export default Button