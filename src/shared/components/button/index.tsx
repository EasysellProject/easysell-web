import React, { CSSProperties, ReactNode, useState } from 'react'
import MUIButton from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress';


import styles from './styles'
import { APP_COLORS } from '../../styles';

interface ButtonProps {
    buttonStyle?: CSSProperties,
    onPress: () => void,
    children: ReactNode
    loading?: boolean,
    disabled?: boolean
}

function Button(props: ButtonProps): JSX.Element {
    const { buttonStyle, onPress, children, loading, disabled } = props
    const [hovered, setHovered] = useState<boolean>(false);

    return (
        <MUIButton
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                ...styles.container,
                ...buttonStyle,
                textTransform: 'none',
                backgroundColor: hovered ? APP_COLORS.HOVER.gray : (buttonStyle?.backgroundColor || 'white')
            }}
            onClick={onPress}
            disabled={disabled}>
            {
                loading ? (
                    <div style={styles.spinner}>
                        <CircularProgress size={16} />
                    </div>
                ) : (
                    children
                )
            }
        </MUIButton >
    )
}

export default Button