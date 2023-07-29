import {initializeApp } from 'firebase/app';
import {getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider} from 'firebase/auth';
import {getFirestore, doc, getDoc, setDoc}  from 'firebase/firestore';


// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDU4LK1WgWrkVfTkPYFCOuffDOsN-Gm8co",
    authDomain: "crwn-clothing-db-515f8.firebaseapp.com",
    projectId: "crwn-clothing-db-515f8",
    storageBucket: "crwn-clothing-db-515f8.appspot.com",
    messagingSenderId: "298664173019",
    appId: "1:298664173019:web:8a64b40e0e603ce0a8dbfe",
    measurementId: "G-TE47FVH0X3"
  };
  
const app = initializeApp(firebaseConfig);


// This is sign in with google
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: 'select_account'
});

const auth = getAuth();
const signInWithGooglePopUp = () => signInWithPopup(auth, provider);
const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);



// This is firestore
const db = getFirestore(app);

const createUserProfileDocument = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);
  const userDocSnap = await getDoc(userDocRef);
  
  // if user data does not exist, create user data
  if (!userDocSnap.exists()){
    const {displayName, email} = userAuth;
    const createAt = new Date();
    try {
      await setDoc(userDocRef, {displayName, email, createAt});
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }
  console.log("sucess")

  return userDocRef;
}  





export { auth ,signInWithGooglePopUp, createUserProfileDocument, signInWithGoogleRedirect }