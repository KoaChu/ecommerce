import './sign-in-sign-up.scss';
import SignIn from '../../components/sign-in/sign-in';
import SignUp from '../../components/sign-up/sign-up';
import React, { PropTypes } from 'react';

const SignInAndSignUp = () => {
    return (
        <div className='sign-in-sign-up'>
        	<SignIn />
        	<SignUp />
        </div>
    );
};


export default SignInAndSignUp;
