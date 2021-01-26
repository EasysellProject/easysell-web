import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Utils from '../../shared/utils';

const { Firebase } = Utils;

function Landing(): JSX.Element {
    const navigation = useHistory()

    useEffect(() => {
        setTimeout(() => {
            if (Firebase.auth().currentUser)
                navigation.push('/listing')
            navigation.push('/login')
        }, 1500)
    }, [])

    return (
        <div style={{ justifyContent: 'center', alignItems: 'center' }}>I am landing page</div>
    )
}

export default Landing