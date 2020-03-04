import React from 'react';
import './App.css';
import { Switch, Route, Link } from 'react-router-dom';
import HomePage from './pages/homepage/homepage';
import ShopPage from './pages/shoppage/shoppage';
import Header from './components/header/header';
import SignInAndSignUp from './pages/sign-in-sign-up/sign-in-sign-up';
import { auth, createUserProfileDocument } from './firebase/firebase-utils';

class App extends React.Component {
	constructor() {
		super();

		this.state = {
			currentUser: null
		};
	}

	unsubscribeFromAuth = null;

	componentDidMount() {
		this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
			if(userAuth) {
				const userRef = await createUserProfileDocument(userAuth);

				userRef.onSnapshot(snapShot => {
					this.setState({
						currentUser: {
							id:snapShot.id,
							...snapShot.data()
						}
					}, () => {
						console.log(this.state);
					});
				});
			} else {
				this.setState({currentUser: userAuth});
			}
		})
	}

	componentWillUnmount() {
		this.unsubscribeFromAuth();
	}


	render() {
	return (
	    <div>
	    	<Header currentUser={this.state.currentUser} />
		    <Switch>
		      <Route exact path='/' component={HomePage} />
		      <Route exact path='/shop' component={ShopPage} />
		      <Route exact path='/signin' component={SignInAndSignUp} />

		    </Switch>
	    </div>
	  );
	}
}

export default App;
