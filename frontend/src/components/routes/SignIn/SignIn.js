import { signInWithGoogle, createUserProfileDocument } from "../../utils/firebase/firebase";


const SignIn = () => {
    const logGoogleUser = async () => {
        try {
            const response = await signInWithGoogle();
            console.log(response);
            createUserProfileDocument(response.user);
        } catch (error) {
            logGoogleUser();
        }
    }
    return (
        <div className="sign-in">
            <h2>I already have an account</h2>
            <button onClick={logGoogleUser}>Sign in with Google</button>
        </div>
        )
    }
    
export default SignIn;