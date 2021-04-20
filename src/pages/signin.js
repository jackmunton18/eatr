import React, {useState, useContext} from 'react';
import { useHistory } from 'react-router-dom';
import logo from '../logo.svg';
import { Header, Form } from '../components';
import { FirebaseContext} from '../context/firebase';
import * as ROUTES from '../constants/routes';

export default function Signin (){

    document.title = "eatr - Sign In";

    const history = useHistory();

    const { firebase } = useContext(FirebaseContext);

    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const isInvalid = password === '' || emailAddress === '';

    const handleSignIn = (e) => {
        e.preventDefault();

        firebase
            .auth()
            .signInWithEmailAndPassword(emailAddress, password)
            .then(() => {
                history.push(ROUTES.DASHBOARD);
            })
            .catch((error) => {
                setEmailAddress('');
                setPassword('');
                setError(error.message);
            })
    }
    

    return (
            <>
            <Header>
                <Header.Frame>
                    <Header.Group>
                        <Header.Logo to={ROUTES.HOME} src={logo} alt="eatr" />
                    </Header.Group>
                    <Header.Group>
                    <Header.ButtonLink to={ROUTES.SIGNUP}>Sign Up</Header.ButtonLink>
                    </Header.Group>
                </Header.Frame>
            </Header>
            <Form>
                <Form.Title>Sign In</Form.Title>
                {error && <Form.Error>{error}</Form.Error>}
                <Form.Base onSubmit={handleSignIn} method="POST">
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
                    <Form.Submit disabled={isInvalid} type="submit">Sign In</Form.Submit>
                </Form.Base>
                <Form.Text>
                    New to <b>eatr?</b> <Form.Link to='/signup'>Sign up now.</Form.Link>
                </Form.Text>
                <Form.TextSmall>
                    This page is protect by Google reCAPTCHA to ensure you're not a bot. Learn more.
                </Form.TextSmall>
            </Form>
        </>
    );
}