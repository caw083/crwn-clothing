import { useState } from 'react';
import { createAuthUserWithEmailAndPassword, createUserProfileDocument } from '../utils/firebase/firebase';
import Form from '../form-input/form';
import Button from '../button/Button';
import './sign-up.scss';

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    const handleChange = (event) =>{
        const { name, value } = event.target;    
        setFormFields({...formFields, [name]: value});
    };
    

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert("password don't match");
            return;
        }
        try {
            const response = await createAuthUserWithEmailAndPassword(email, password);
            await createUserProfileDocument(response.user, {displayName});

        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                alert('That email address is already in use!');
            } else {
                console.log('user creation encountered an error');
            }
        }
    }

    const ResetForm = () => {
        setFormFields({
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        })
    }
    return(
        <div>
            <h2>Don't have an Account</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit} className="Register" onReset={ResetForm}>
                <Form label="Display Name" type="text" name='displayName' onChange={handleChange} value={displayName} required/>
                <Form label="Email" type="email" name='email' value={email} onChange={handleChange} required />                
                <Form label="Password" type="password"  name='password' value={password} onChange={handleChange} required />
                <Form label="Confirm Password" type="password" name='confirmPassword' value={confirmPassword} onChange={handleChange} required />
                <div className="buttons register">
                    <Button type="submit" children="Register" id="register" />
                    <Button type="reset"  children={"Reset"} id="reset"/>
                </div>
            </form>
        </div>
    )
}

export default SignUpForm;