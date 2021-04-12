import React, { useEffect, useRef, useState } from 'react'
import logo from "../../../assets/images/logo_wordless.png";
import { CgList } from 'react-icons/cg'
import { AiOutlineShoppingCart, AiOutlineAppstoreAdd, AiOutlineUser, AiOutlineInfoCircle } from 'react-icons/ai'
import { useHistory } from "react-router-dom";
import { APP_COLORS, WEB_STYLES } from '../../styles';
import styles from './styles'
import SimpleText from '../text/simple-text';
import { Link } from 'react-router-dom';
import { Helper } from '../../libs/helper';
import AuthService from "../../services/auth-service";
import MUIButton from '@material-ui/core/Button'

export type SidebarItem = 'Listing' | 'Order' | 'Profile' | 'Integration' | 'About'

interface SidebarProps {
    item: SidebarItem;
}

const DRAWER_WIDTH = 256
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
    function Signout() {
        AuthService.logout().then(() => {
            localStorage.removeItem("userID");
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
                                backgroundColor: APP_COLORS.textGreen,
                            } : {
                            ...WEB_STYLES.flexColum,
                        }
                }>
                    {
                        ((isMobile() && expanded) || !isMobile()) && (

                            <div ref={sidebar} style={{ ...WEB_STYLES.flexColum, paddingTop: 32, alignItems: 'center', width: '100%', height: '100%', backgroundColor: APP_COLORS.sidebarGreen }}>
                                <img src={logo} width={175} height={150} />
                                <Link to='/listings' style={{ ...WEB_STYLES.flexRow, ...styles.row, backgroundColor: item == 'Listing' ? 'white' : 'transparent' }}>
                                    <CgList
                                        size={36}
                                        color={item == 'Listing' ? APP_COLORS.borderGray : 'white'}
                                    />
                                    <SimpleText
                                        textID='listings'
                                        additionalStyle={{ ...styles.rowTitle, color: item == 'Listing' ? APP_COLORS.borderGray : 'white' }}
                                    />
                                </Link>
                                <Link to='/orders' style={{ ...WEB_STYLES.flexRow, ...styles.row, backgroundColor: item == 'Order' ? 'white' : 'transparent' }}>
                                    <AiOutlineShoppingCart
                                        size={36}
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
                                        size={36}
                                        color={item == 'Profile' ? APP_COLORS.borderGray : 'white'}
                                    />
                                    <SimpleText
                                        textID='profile'
                                        additionalStyle={{ ...styles.rowTitle, color: item == 'Profile' ? APP_COLORS.borderGray : 'white' }}
                                    />
                                </Link>
                                <Link to='/about' style={{ ...WEB_STYLES.flexRow, ...styles.row, backgroundColor: item == 'About' ? 'white' : 'transparent' }}>
                                    <AiOutlineInfoCircle
                                        size={36}
                                        color={item == 'About' ? APP_COLORS.borderGray : 'white'}
                                    />
                                    <SimpleText
                                        textID='about'
                                        additionalStyle={{ ...styles.rowTitle, color: item == 'Order' ? APP_COLORS.borderGray : 'white' }}
                                    />
                                </Link>
                                <MUIButton
                                    style={styles.logoutButton}
                                    onClick={Signout}
                                >
                                    <SimpleText
                                        textID={"Logout"}
                                        additionalStyle={styles.logoutButtonText}
                                    />
                                </MUIButton>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
        // <div style={{ ...styles.container, ...WEB_STYLES.flexColum }}>
        //     <img src={logo} width='75%' height={150} />
        //     <Link to='/listings' style={{ ...WEB_STYLES.flexRow, ...styles.row, backgroundColor: item == 'Listing' ? 'white' : 'transparent' }}>
        //         <CgList
        //             size={36}
        //             color={item == 'Listing' ? APP_COLORS.borderGray : 'white'}
        //         />
        //         <SimpleText
        //             textID='listings'
        //             additionalStyle={{ ...styles.rowTitle, color: item == 'Listing' ? APP_COLORS.borderGray : 'white' }}
        //         />
        //     </Link>
        //     <Link to='/orders' style={{ ...WEB_STYLES.flexRow, ...styles.row, backgroundColor: item == 'Order' ? 'white' : 'transparent' }}>
        //         <AiOutlineShoppingCart
        //             size={36}
        //             color={item == 'Order' ? APP_COLORS.borderGray : 'white'}
        //         />
        //         <SimpleText
        //             textID='orders'
        //             additionalStyle={{ ...styles.rowTitle, color: item == 'Order' ? APP_COLORS.borderGray : 'white' }}
        //         />
        //     </Link>
        //     <Link to='/integrations' style={{ ...WEB_STYLES.flexRow, ...styles.row, backgroundColor: item == 'Integration' ? 'white' : 'transparent' }}>
        //         <AiOutlineAppstoreAdd
        //             size={36}
        //             color={item == 'Integration' ? APP_COLORS.borderGray : 'white'}
        //         />
        //         <SimpleText
        //             textID='integration'
        //             additionalStyle={{ ...styles.rowTitle, color: item == 'Integration' ? APP_COLORS.borderGray : 'white' }}
        //         />
        //     </Link>
        //     <Link to='/profile' style={{ ...WEB_STYLES.flexRow, ...styles.row, backgroundColor: item == 'Profile' ? 'white' : 'transparent' }}>
        //         <AiOutlineUser
        //             size={36}
        //             color={item == 'Profile' ? APP_COLORS.borderGray : 'white'}
        //         />
        //         <SimpleText
        //             textID='profile'
        //             additionalStyle={{ ...styles.rowTitle, color: item == 'Profile' ? APP_COLORS.borderGray : 'white' }}
        //         />
        //     </Link>
        //     <Link to='/about' style={{ ...WEB_STYLES.flexRow, ...styles.row, backgroundColor: item == 'About' ? 'white' : 'transparent' }}>
        //         <AiOutlineInfoCircle
        //             size={36}
        //             color={item == 'About' ? APP_COLORS.borderGray : 'white'}
        //         />
        //         <SimpleText
        //             textID='about'
        //             additionalStyle={{ ...styles.rowTitle, color: item == 'Order' ? APP_COLORS.borderGray : 'white' }}
        //         />
        //     </Link>
        // </div>
    )
}

export default Sidebar