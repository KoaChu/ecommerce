import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAyMSNTM6rNr0SJJkMZJ9Kys9TQ1AI6J1U",
    authDomain: "crwn-db-7dc22.firebaseapp.com",
    databaseURL: "https://crwn-db-7dc22.firebaseio.com",
    projectId: "crwn-db-7dc22",
    storageBucket: "crwn-db-7dc22.appspot.com",
    messagingSenderId: "703916645983",
    appId: "1:703916645983:web:f7216220b69308038905ea",
    measurementId: "G-53NLF0DZ4G"
  };

  export const createUserProfileDocument = async (userAuth, additionalData) => {
  	if(!userAuth) return;

  	const userRef = firestore.doc(`users/${userAuth.uid}`);

  	const snapShot = await userRef.get();

  	if(!snapShot.exists) {
  		const { displayName, email } = userAuth;
  		const createdAt = new Date();

  		try {
  			await userRef.set({
  				displayName,
  				email,
  				createdAt,
  				...additionalData
  			})
  		} catch (error) {
  			console.log('error creating user', error.message);
  		}
  	}

  	return userRef;
  };

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;