import React, {useState, useContext} from 'react';
import { useHistory } from 'react-router-dom';
import { Header, Form } from '../components';
import logo from '../logo.svg';
import { FirebaseContext} from '../context/firebase';
import * as ROUTES from '../constants/routes';

export default function Signup (){

    document.title = "eatr - Sign up";

    const history = useHistory();
    const { firebase } = useContext(FirebaseContext);

    const [firstName, setFirstName] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const isInvalid = password === '' || emailAddress === '' || firstName === '';

    const handleSignUp = async (e) => {
        e.preventDefault();

        try {
            const createdUserResult = await firebase
              .auth()
              .createUserWithEmailAndPassword(emailAddress, password);
    
            // authentication
            // -> emailAddress & password & first name (firstname)
            await createdUserResult.user.updateProfile({
              displayName: firstName
            });
        
            history.push(ROUTES.DASHBOARD);

        } catch (error) {
            setFirstName('');
            setEmailAddress('');
            setPassword('');
            setError(error.message);
        }

    }



    return (
        <>
            <Header>
                <Header.Frame>
                    <Header.Group>
                        <Header.Logo to={ROUTES.HOME} src={logo} alt="eatr" />
                    </Header.Group>
                    <Header.Group>
                    <Header.ButtonLink to={ROUTES.SIGNIN}>Sign In</Header.ButtonLink>
                    </Header.Group>
                </Header.Frame>
            </Header>
            <Form>
                <Form.Title>Sign Up</Form.Title>
                {error && <Form.Error>{error}</Form.Error>}
                <Form.Base onSubmit={handleSignUp} method="POST">
                <Form.Input
                        placeholder="First Name"
                        value={firstName}
                        type="text" 
                        onChange={({ target }) => setFirstName(target.value)}
                    />
                    <Form.Input
                        placeholder="Email Address"
                        value={emailAddress}
                        type="email" 
                        name="email" 
                        autocomplete="email"
                        onChange={({ target }) => setEmailAddress(target.value)}
                    />
                    <Form.Input
                        placeholder="Password"
                        value={password}
                        type="password" 
                        name="password" 
                        autocomplete="password"
                        onChange={({ target }) => setPassword(target.value)}
                    />
                    <Form.Submit disabled={isInvalid} type="submit">Sign Up</Form.Submit>
                </Form.Base>
                <Form.Text>
                    Already a user? <Form.Link to='/signin'>Sign in now.</Form.Link>
                </Form.Text>
                <Form.TextSmall>
                    This page is protect by Google reCAPTCHA to ensure you're not a bot. Learn more.
                </Form.TextSmall>
            </Form>
        </>
    );
}