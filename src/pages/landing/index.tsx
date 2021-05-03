import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Utils from '../../shared/utils';
import logo from "../../assets/images/logo.png";

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
        <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img
                src={logo}
                alt="logo"
                style={{
                    width: 200,
                    paddingTop: 10,
                    paddingLeft: 15,
                }}
            />
        </div>
    )
}

export default Landing