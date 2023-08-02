import {useState,useEffect} from "react";
import { getRedirectResult } from "firebase/auth";

import { auth, signInWithGooglePopUp, createUserProfileDocument, signInWithGoogleRedirect, signAuthUserWithEmailAndPassword, getUserData } from "../../utils/firebase/firebase";
import Form from "../../form-input/form";
import Button from "../../button/Button";
import "./signin.css";

const defaultFormFields = { 
    email : "",
    password : ""
}


const SignIn = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;
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

    const handleChange = (event) =>{
        const { name, value } = event.target;    
        setFormFields({...formFields, [name]: value});
    }
    const resetFormFields = () => {
      setFormFields(defaultFormFields);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
          const response = await signAuthUserWithEmailAndPassword(email, password);
          const data = await getUserData(response.user);
          console.log(data);
          resetFormFields();
            
        } catch(error){
          switch (error.code) {
            case 'auth/wrong-password':
              alert('incorrect password for email');
              break;
            case 'auth/user-not-found':
              alert('no user associated with this email');
              break;
            default:
              console.log(error);
          }
        }
    
    }

    return (
        <div className="sign-in" onSubmit={handleSubmit}>
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>
            <form className="sign-In">
              <Form label="Email" type="email" name='email' value={email} onChange={handleChange} required />
              <Form label="Password" type="password" name='password' onChange={handleChange} value={password} required />
              <div className="buttons">
                <Button type="submit"> Sign in </Button>
                <Button type="button" buttonType="google" onClick={logGoogleUserRedirect}>Google Sign In  </Button>
              </div>
            </form>
        </div>
        )
    }
    
export default SignIn;