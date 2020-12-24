import React from 'react'

interface InputProps {
    value: string
    placeholder: string
    showLabel?: boolean
    onChangeText: (text: string) => void
}

function Input(props: InputProps): JSX.Element {
    const { value, placeholder, showLabel, onChangeText } = props
    return (
        <input />
    )
}

export default Input