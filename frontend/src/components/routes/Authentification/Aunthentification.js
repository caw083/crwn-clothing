import SignUpForm from "../../signUp-form/sign-up";
import SignIn from "../SignIn/SignIn";
import './authentification.scss';

const Authentification = () => {
    return (
        <div className='authentication-container'>
            <SignIn />
            <SignUpForm />
        </div>
    )

}

export default Authentification;