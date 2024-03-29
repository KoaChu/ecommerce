import React from 'react';
import './App.css';
import { Switch, Route, Link, Redirect } from 'react-router-dom';
import HomePage from './pages/homepage/homepage';
import ShopPage from './pages/shoppage/shoppage';
import Header from './components/header/header';
import SignInAndSignUp from './pages/sign-in-sign-up/sign-in-sign-up';
import { auth, createUserProfileDocument } from './firebase/firebase-utils';
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user-actions';

class App extends React.Component {
	unsubscribeFromAuth = null;

	componentDidMount() {

		const {setCurrentUser} = this.props;

		this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
			if(userAuth) {
				const userRef = await createUserProfileDocument(userAuth);

				userRef.onSnapshot(snapShot => {
					setCurrentUser({
							id:snapShot.id,
							...snapShot.data()
					});
				});
			} else {
				setCurrentUser(userAuth);
			}
		})
	}

	componentWillUnmount() {
		this.unsubscribeFromAuth();
	}


	render() {
	return (
	    <div>
	    	<Header />
		    <Switch>
		      <Route exact path='/' component={HomePage} />
		      <Route exact path='/shop' component={ShopPage} />
		      <Route exact path='/signin' render={() => this.props.currentUser ? (<Redirect to='/' />) : (<SignInAndSignUp />)} />

		    </Switch>
	    </div>
	  );
	}
}

const mapStateToProps = ({ user }) => ({
	currentUser: user.currentUser
});

const mapDispatchToProps = dispatch => ({
	setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
