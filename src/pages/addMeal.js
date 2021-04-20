import React, {useState, useContext} from 'react';
import { useHistory } from 'react-router-dom';
import { CenterContainer } from '../containers/center';
import { Header, Form } from '../components';
import { FirebaseContext} from '../context/firebase';
import logo from '../logo.svg';
import * as ROUTES from '../constants/routes';

export default function AddMeal () {
    

    document.title = "eatr - Add Meal";

    const history = useHistory();
    const { firebase } = useContext(FirebaseContext);

    const user = firebase.auth().currentUser || {}; 

    const [allergens, setAllergens] = useState(['']);
    const [calories, setCalories] = useState('');
    const [ingredients, setIngredients] = useState(['']);
    const [mealName, setMealName] = useState('');
    const [mealTime, setMealTime] = useState('');
    
    const [formStage, setFormStage] = useState(0);

    const [error, setError] = useState('');

    /*
        Stage 0     Meal Name : 'string'
        Stage 1     Ingredients : []
        Stage 2     Calories : Number
        Stage 3     Allergens,
        Stage 4     Meal Time : Date
    */
    
    const isMealInvalid = mealName === '';
    const isIngredientsInvalid = ingredients.length === 0;
    const isCaloriesInvalid = calories === '';
    const isAllergensInvalid = allergens.length === 0;    
    const isMealTimeInvalid = mealName === '';
   
    const handleAddMeal = async (e) => {
        e.preventDefault();

        // return false;

        try {
            firebase
                .firestore()
                .collection('meals')
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

    const handleFormUpdate = (e) => {
        e.preventDefault();
        setFormStage(formStage + 1);

    }


    const addIngredient = () => {
        if (ingredients.indexOf('') === -1) {
            setIngredients( ingredients => [...ingredients, '']);
        }
    }
    const writeIngredient = (index, name) => {
        let arr = ingredients;
        arr[index] = name;
        setIngredients(arr);
    }
    const addAllergen = () => {
        if (allergens.indexOf('') === -1) {
            setIngredients( allergens => [...allergens, '']);
        }
    }
    const writeAllergen = (index, name) => {
        let arr = allergens;
        arr[index] = name;
        setAllergens(arr);
    }

    const renderSwitch = (stage) => {
        switch(stage) {
            case 0:
                return (
                    <>
                        <Form.Title>What did you eat?</Form.Title>
                        {error && <Form.Error>{error}</Form.Error>}
                        <Form.Base onSubmit={handleFormUpdate} method="POST">
                        <Form.Input
                                placeholder="Meal Name"
                                value={mealName}
                                type="text" 
                                onChange={({ target }) => setMealName(target.value)}
                            />
                            <Form.Submit disabled={isMealInvalid} type="submit">Next</Form.Submit>
                        </Form.Base>
                    </>
                )
            case 1:
                return (
                    <>
                        <Form.Title>List your ingredients!</Form.Title>
                        {error && <Form.Error>{error}</Form.Error>}
                        <Form.Base onSubmit={handleFormUpdate} method="POST">
                            {ingredients.map((item, index) => {
                                return (
                                    <Form.Input
                                        key={index}
                                        placeholder="Ingredient"
                                        type="text" 
                                        onChange={({ target }) => writeIngredient(index, target.value)}
                                    />
                                )
                            })}
                            <div onClick={addIngredient}>add ingredient</div>
                            <Form.Submit disabled={isIngredientsInvalid} type="submit">Next</Form.Submit>
                        </Form.Base>
                    </>
                )
            case 2:
                return (
                    <>
                        <Form.Title>How many calories?</Form.Title>
                        {error && <Form.Error>{error}</Form.Error>}
                        <Form.Base onSubmit={handleFormUpdate} method="POST">
                        <Form.Input
                                placeholder="Calories"
                                value={calories}
                                type="number" 
                                onChange={({ target }) => setCalories(target.value)}
                            />
                            <Form.Submit disabled={isCaloriesInvalid} type="submit">Next</Form.Submit>
                        </Form.Base>
                    </>
                )
            case 3:
                return (
                    <>
                        <Form.Title>List the allergens!</Form.Title>
                        {error && <Form.Error>{error}</Form.Error>}
                        <Form.Base onSubmit={handleFormUpdate} method="POST">
                            {allergens.map((item, index) => {
                                return (
                                    <Form.Input
                                        key={index}
                                        placeholder="Allergen"
                                        type="text" 
                                        onChange={({ target }) => writeAllergen(index, target.value)}
                                    />
                                )
                            })}
                            <div onClick={addAllergen}>add allergen</div>
                            <Form.Submit disabled={isAllergensInvalid} type="submit">Next</Form.Submit>
                        </Form.Base>
                    </>
                )  
            case 4:
                return (
                    <>
                        <Form.Title>What time did you eat your {mealName}?</Form.Title>
                        {error && <Form.Error>{error}</Form.Error>}
                        <Form.Base onSubmit={handleAddMeal} method="POST">
                        <Form.Input
                                placeholder="Meal Time"
                                value={mealTime}
                                type="text" 
                                onChange={({ target }) => setMealTime(target.value)}
                            />
                            <Form.Submit disabled={isMealTimeInvalid} type="submit">Add Meal</Form.Submit>
                        </Form.Base>
                    </>
                )              
            default:
                return (
                    <>
                        <p></p>
                    </>
                )
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
                <Header.ButtonLink onClick={() => firebase.auth().signOut()}to={ROUTES.HOME}>Sign out</Header.ButtonLink>
                </Header.Group>
            </Header.Frame>
            </Header>
            <CenterContainer>
                <Form>
                    {renderSwitch(formStage)}
                </Form>
            </CenterContainer>
        </>
    );
}