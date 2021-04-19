import React from 'react';

interface RotatableProps {
    rotate: boolean
    children: any
}

function Rotatable(props: RotatableProps): JSX.Element {
    const { rotate, children } = props;

    return (
        <div style={{
            float: 'right',
            overflow: 'hidden',
            transition: 'transform 0.2s',
            transform: rotate ? 'rotate(180deg)' : 'rotate(0deg)'
        }}>
            {children}
        </div>
    )
}
export default Rotatable