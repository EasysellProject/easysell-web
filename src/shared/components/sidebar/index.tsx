import React from 'react'
import logo from "../../../assets/images/logo_wordless.png";
import { CgList } from 'react-icons/cg'
import { AiOutlineShoppingCart, AiOutlineAppstoreAdd, AiOutlineUser, AiOutlineInfoCircle } from 'react-icons/ai'

import { APP_COLORS, WEB_STYLES } from '../../styles';
import styles from './styles'
import SimpleText from '../text/simple-text';
import { Link } from 'react-router-dom';

export type SidebarItem = 'Listing' | 'Order' | 'Profile' | 'Integration' | 'About'

interface SidebarProps {
    item: SidebarItem;
}


function Sidebar(props: SidebarProps): JSX.Element {
    const { item } = props
    return (
        <div style={{ ...styles.container, ...WEB_STYLES.flexColum }}>
            <img src={logo} width='75%' height={150} />
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
                    size={36}
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
        </div>
    )
}

export default Sidebar