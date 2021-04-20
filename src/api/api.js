import React, {useState, useContext} from 'react';
import { useHistory } from 'react-router-dom';
import { HeaderContainer } from '../containers/header';
import { Form } from '../components';
import { FirebaseContext} from '../context/firebase';
import * as ROUTES from '../constants/routes';

export default function AddMeal () {

    document.title = "eatr - Add";

    const history = useHistory();
    const { firebase } = useContext(FirebaseContext);

    const user = firebase.auth().currentUser || {}; 

    const [allergens, setAllergens] = useState([]);
    const [calories, setCalories] = useState('');
    const [ingredients, setIngredients] = useState([]);
    const [mealName, setMealName] = useState('');
    const [mealTime, setMealTime] = useState('');
    const [error, setError] = useState('');

    const isInvalid = calories === '' || ingredients === '' || mealName === '';

    const handleAddMeal = async (e) => {
        e.preventDefault();

        return false;

        try {
            const createdMealResult = await firebase
                .firestore()
                .collections('meals')
                .add({
                    allergens,
                    authorId: user.uid,
                    calories,
                    created: Date.now(),
                    ingredients,
                    mealName,
                    mealTime
                })
        
            history.push(ROUTES.DASHBOARD);

        } catch (error) {
            setAllergens([]);
            setCalories('');
            setIngredients('');
            setMealName('');
            setMealTime('');
            setError(error.message);
        }

    }



    return (
        <>
            <HeaderContainer>
                <Form>
                    <Form.Title>Sign Up</Form.Title>
                    {error && <Form.Error>{error}</Form.Error>}
                    <Form.Base onSubmit={handleAddMeal} method="POST">
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
                        <Form.Submit disabled={isInvalid} type="submit">Add Meal</Form.Submit>
                    </Form.Base>
                    <Form.TextSmall>
                        This page is protect by Google reCAPTCHA to ensure you're not a bot. Learn more.
                    </Form.TextSmall>
                </Form>
            </HeaderContainer>
        </>
    );
}