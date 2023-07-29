import {useEffect} from "react";
import { getRedirectResult } from "firebase/auth";

import { auth, signInWithGooglePopUp, createUserProfileDocument, signInWithGoogleRedirect } from "../../utils/firebase/firebase";


const SignIn = () => {

    // Use redirect result to check if the user signed in by using a redirect flow.
    useEffect(() => {
        const fetchRedirectResult = async () => {
          try {
            const response = await getRedirectResult(auth);
            if (response.user) { 
              createUserProfileDocument(response.user);
            }
          } catch (error) {
            console.error("Error while fetching redirect result:", error);
          }
        };
    
        fetchRedirectResult();
      }, []);

      const logGoogleUserRedirect = async (retryCount = 0) => {
        try {
          const response = await signInWithGoogleRedirect();
          console.log(response);
        } catch (error) {
          if (retryCount < 3) {
            logGoogleUserRedirect(retryCount + 1);
          } else {
            console.error("Exceeded maximum retry attempts for redirect sign-in.");
          }
        }
      };
    
    // Use popup to sign in the user.
    const logGoogleUserPopUp = async (retryCount = 0) => {
        try {
            const response = await signInWithGooglePopUp();
            console.log(response);
            createUserProfileDocument(response.user);
        } catch (error) {
            if (retryCount < 3) {
              logGoogleUserPopUp(retryCount + 1);
            } else {
                console.error("Exceeded maximum retry attempts for popup sign-in.");
            }
        }
    }

    return (
        <div className="sign-in">
            <h2>I already have an account</h2>
            <button onClick={logGoogleUserPopUp}>Sign in with Google</button>
            <button onClick={logGoogleUserRedirect}>Sign in with Google Redirect</button>
        </div>
        )
    }
    
export default SignIn;