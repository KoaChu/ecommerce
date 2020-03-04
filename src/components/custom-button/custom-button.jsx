import './custom-button.scss';

import React, { PropTypes } from 'react';

const CustomButton = ({ children, isGoogleSignIn, ...otherProps }) => {
    return (
        <button 
        className={`${isGoogleSignIn ? 'google-sign-in' : ''} custom-button`} 
        {...otherProps}>
        	{children}
        </button>
    );
};

export default CustomButton;
