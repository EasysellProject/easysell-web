import React, { useEffect, useRef, useState } from 'react'
import { useHistory, Link } from "react-router-dom";
import { CgList, CgProfile } from 'react-icons/cg'
import { TiNews } from 'react-icons/ti';
import { RiDashboardLine } from 'react-icons/ri';
import MUIButton from '@material-ui/core/Button'
import { AiOutlineShoppingCart, AiOutlineAppstoreAdd, AiOutlineUser, AiOutlineInfoCircle } from 'react-icons/ai'
import logo from "../../../assets/images/logo_wordless.png";
import { Helper } from '../../libs/helper';
import { APP_COLORS, WEB_STYLES } from '../../styles';
import AuthService from "../../services/auth-service";
import SimpleText from '../text/simple-text';
import styles from './styles'

export type SidebarItem = 'Listing' | 'Order' | 'Profile' | 'Integration' | 'About' | 'Product' | 'Dashboard'

interface SidebarProps {
    item: SidebarItem;
}

// const DRAWER_WIDTH = 256
const DRAWER_ICON_SIZE = 32;
function Sidebar(props: SidebarProps): JSX.Element {
    const history = useHistory();
    const { item } = props
    const [windowDimensions, setWindowDimensions] = useState<{ width: number, height: number }>(Helper.getWindowDimensions());
    const [expanded, setExpanded] = useState<boolean>(false);

    const sidebar = useRef(null)

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    function isMobile(): boolean {
        return windowDimensions.width < 768;
    }

    function handleResize() {
        setWindowDimensions(Helper.getWindowDimensions());
    }
    function logout() {
        AuthService.logout().then(() => {
            history.push("/")
        }).catch(err => {
            console.log(err.toString());
        })
    }

    function renderMenuIcon(): JSX.Element {
        return (
            <div onClick={() => {
                setExpanded(!expanded)
            }}
                style={{
                    cursor: 'pointer',
                    position: 'absolute',
                    left: 24,
                    top: 34,
                    zIndex: 1000
                }}>
                <svg height="32px" version="1.1" viewBox="0 0 32 32" width="32px"
                    xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                    <path d="M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z" />
                </svg>
            </div>
        )
    }

    return (
        <div style={{ position: 'relative' }}>
            <div style={isMobile() ? {
                ...WEB_STYLES.flexRow,
                position: 'absolute',
                top: 0,
                left: 0,
            } :
                {
                    ...WEB_STYLES.flexRow,
                    height: '100%',
                    minHeight: '100vh',
                }}>
                {(isMobile()) && renderMenuIcon()}
                <div style={
                    isMobile() ?
                        expanded ? {
                            left: 0,
                            ...WEB_STYLES.flexColum,
                            transition: 'left 0.5s, right 0.5s',
                            position: 'absolute',
                            zIndex: 999,
                        } :
                            {
                                backgroundColor: 'red',
                            } : {
                            ...WEB_STYLES.flexColum,
                        }
                }>
                    {
                        ((isMobile() && expanded) || !isMobile()) && (

                            <div ref={sidebar} style={{ ...WEB_STYLES.flexColum, ...styles.container }}>
                                <img src={logo} width={175} height={150} />
                                <Link to='/dashboard' style={{ ...WEB_STYLES.flexRow, ...styles.row, backgroundColor: item == 'Dashboard' ? 'white' : 'transparent' }}>
                                    <RiDashboardLine
                                        size={DRAWER_ICON_SIZE}
                                        color={item == 'Dashboard' ? APP_COLORS.borderGray : 'white'}
                                    />
                                    <SimpleText
                                        textID='dashboard'
                                        additionalStyle={{ ...styles.rowTitle, color: item == 'Dashboard' ? APP_COLORS.borderGray : 'white' }}
                                    />
                                </Link>
                                <Link to='/products' style={{ ...WEB_STYLES.flexRow, ...styles.row, backgroundColor: item == 'Product' ? 'white' : 'transparent' }}>
                                    <TiNews
                                        size={DRAWER_ICON_SIZE}
                                        color={item == 'Product' ? APP_COLORS.borderGray : 'white'}
                                    />
                                    <SimpleText
                                        textID='products'
                                        additionalStyle={{ ...styles.rowTitle, color: item == 'Product' ? APP_COLORS.borderGray : 'white' }}
                                    />
                                </Link>
                                <Link to='/listings' style={{ ...WEB_STYLES.flexRow, ...styles.row, backgroundColor: item == 'Listing' ? 'white' : 'transparent' }}>
                                    <CgList
                                        size={DRAWER_ICON_SIZE}
                                        color={item == 'Listing' ? APP_COLORS.borderGray : 'white'}
                                    />
                                    <SimpleText
                                        textID='listings'
                                        additionalStyle={{ ...styles.rowTitle, color: item == 'Listing' ? APP_COLORS.borderGray : 'white' }}
                                    />
                                </Link>
                                <Link to='/orders' style={{ ...WEB_STYLES.flexRow, ...styles.row, backgroundColor: item == 'Order' ? 'white' : 'transparent' }}>
                                    <AiOutlineShoppingCart
                                        size={DRAWER_ICON_SIZE}
                                        color={item == 'Order' ? APP_COLORS.borderGray : 'white'}
                                    />
                                    <SimpleText
                                        textID='orders'
                                        additionalStyle={{ ...styles.rowTitle, color: item == 'Order' ? APP_COLORS.borderGray : 'white' }}
                                    />
                                </Link>
                                <Link to='/integrations' style={{ ...WEB_STYLES.flexRow, ...styles.row, backgroundColor: item == 'Integration' ? 'white' : 'transparent' }}>
                                    <AiOutlineAppstoreAdd
                                        size={52}
                                        color={item == 'Integration' ? APP_COLORS.borderGray : 'white'}
                                    />
                                    <SimpleText
                                        textID='integration'
                                        additionalStyle={{ ...styles.rowTitle, color: item == 'Integration' ? APP_COLORS.borderGray : 'white' }}
                                    />
                                </Link>
                                <Link to='/profile' style={{ ...WEB_STYLES.flexRow, ...styles.row, backgroundColor: item == 'Profile' ? 'white' : 'transparent' }}>
                                    <AiOutlineUser
                                        size={DRAWER_ICON_SIZE}
                                        color={item == 'Profile' ? APP_COLORS.borderGray : 'white'}
                                    />
                                    <SimpleText
                                        textID='profile'
                                        additionalStyle={{ ...styles.rowTitle, color: item == 'Profile' ? APP_COLORS.borderGray : 'white' }}
                                    />
                                </Link>
                                <Link to='/about' style={{ ...WEB_STYLES.flexRow, ...styles.row, backgroundColor: item == 'About' ? 'white' : 'transparent' }}>
                                    <AiOutlineInfoCircle
                                        size={DRAWER_ICON_SIZE}
                                        color={item == 'About' ? APP_COLORS.borderGray : 'white'}
                                    />
                                    <SimpleText
                                        textID='about'
                                        additionalStyle={{ ...styles.rowTitle, color: item == 'About' ? APP_COLORS.borderGray : 'white' }}
                                    />
                                </Link>
                            </div>
                        )
                    }
                    <MUIButton
                        style={styles.logoutButton}
                        onClick={logout}
                        autoCapitalize={"none"}
                    >
                        <SimpleText
                            textID={"logout"}
                            additionalStyle={styles.logoutButtonText}
                        />
                    </MUIButton>
                </div>
            </div>
        </div>
    )
}

export default Sidebar