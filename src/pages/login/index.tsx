import React, { useEffect, useState } from 'react'

import logo from '../../assets/images/logo_white.png'
import background from '../../assets/images/login_background.png'

import styles from './styles'
import APP_STYLES from '../../shared/styles'
import './login.css'
import { Helper } from '../../shared/libs/helper'
import { CSSProperties } from '@material-ui/core/styles/withStyles'
import HeaderText from '../../shared/components/header-text'


function Login(): JSX.Element {
    const [windowDimensions, setWindowDimensions] = useState(Helper.getWindowDimensions());

    function handleResize() {
        setWindowDimensions(Helper.getWindowDimensions());
    }
    useEffect(() => {

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    function isMobile(): boolean {
        return windowDimensions.width < 768
    }

    function isTablet(): boolean {
        return windowDimensions.width < 1024
    }

    return (
        <div>
            {
                !isMobile() && (
                    <div>
                        <img src={background} style={{
                            position: 'absolute',
                            width: windowDimensions.width,
                            height: windowDimensions.height
                        }} />
                    </div>
                )
            }
            {
                isMobile() ? (
                    <div style={{
                        ...APP_STYLES.webStyles.flexColum,
                        ...styles.loginContent
                    }}>
                        <div style={{ ...styles.loginContent, ...APP_STYLES.webStyles.flexColum }}></div>
                        <img src={logo} alt='logo' style={{
                            width: 200
                        }} />
                        <HeaderText
                            textID='login'
                            additionalStyle={styles.textStyle}
                        />
                        <HeaderText
                            textID='enter-creds'
                            additionalStyle={{ fontSize: 24, ...styles.textStyle }}
                        />
                    </div>
                ) : (
                        <div style={{
                            ...APP_STYLES.webStyles.flexColum,
                            paddingTop: !isMobile() ? 160 : 40,
                            paddingLeft: isMobile() ? 0 : 40,
                        }}>
                            <div style={{ ...styles.loginContent, ...APP_STYLES.webStyles.flexColum }}></div>
                            <img src={logo} alt='logo' style={{
                                width: 200
                            }} />
                            <HeaderText
                                textID='login'
                                additionalStyle={styles.textStyle}
                            />
                            <HeaderText
                                textID='enter-creds'
                                additionalStyle={{ fontSize: 24, ...styles.textStyle }}
                            />
                        </div>
                    )
            }
        </div>
    )
}


export default Login