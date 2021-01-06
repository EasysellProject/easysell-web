import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

function Landing(): JSX.Element {
    const navigation = useHistory()

    useEffect(() => {
        setTimeout(() => {
            navigation.push('/login')
        }, 1500)
    }, [])

    return (
        <div style={{ justifyContent: 'center', alignItems: 'center' }}>I am landing page</div>
    )
}

export default Landing