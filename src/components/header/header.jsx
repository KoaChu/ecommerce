import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/crwn-logo.svg';
import { auth } from '../../firebase/firebase-utils';

import CartIcon from '../cart/cart';
import CartDropdown from '../cart-dropdown/cart-dropdown';

import './header.scss';

const Header = ({ currentUser, hidden }) => {
    return (
        <div className='header'>
        	<Link className='logo-container' to="/">
        		<Logo className='logo' />
        	</Link>
        	<div className='options-container'>
        		<Link className='option' to='/shop'>
        			SHOP
        		</Link>
        		<Link className='option' to='/contact'>
        			CONTACT
        		</Link>
                {
                    currentUser ? 
                    <div className='option' onClick={() => auth.signOut()}>SIGN OUT</div>
                    :
                    <Link className='option' to='/signin'>SIGN IN</Link>
                }
                <CartIcon />
        	</div>
            {hidden ? null : <CartDropdown />}
        </div>
    );
};

const mapStateToProps = ({user: { currentUser }, cart: { hidden }}) => ({
    currentUser,
    hidden
})

export default connect(mapStateToProps)(Header);
