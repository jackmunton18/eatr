import React, { useContext, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { Header, Form } from "../components";
import * as ROUTES from "../constants/routes";
import logo from "../logo.svg";
import { FirebaseContext } from "../context/firebase";
import { CenterContainer } from '../containers/center';
// import { useContent } from '../hooks';

export default function EditMeal() {
    const { firebase } = useContext(FirebaseContext);
    const history = useHistory();
    const user = firebase.auth().currentUser || {};
	
    const [error, setError] = useState('');

    const [meal, setMeal] = useState([]);

    const [allergens, setAllergens] = useState(['']);
    const [calories, setCalories] = useState('');
    const [ingredients, setIngredients] = useState(['']);
    const [mealName, setMealName] = useState('');
    const [mealTime, setMealTime] = useState('');
	
    const [formStage, setFormStage] = useState(0);
    
    const [dataLoaded, setDataLoaded] = useState(false);

    const queryID = "90xmxp6BEcg4jcwXbNln";

	
    /*
        Stage 0     Meal Name : 'string'
        Stage 1     Ingredients : []
        Stage 2     Calories : Number
        Stage 3     Allergens,
        Stage 4     Meal Time : Date
    */
    
	const isMealInvalid = mealName === '';
	const isIngredientsInvalid = ingredients[0] === '';
	const isCaloriesInvalid = calories === '';
	const isAllergensInvalid = allergens.length === 0;    
	const isMealTimeInvalid = mealName === '';

	
    const handleEditMeal = async (e) => {
        e.preventDefault();

        if (ingredients.indexOf('') !== -1) {
            setIngredients(ingredients.filter(item => item !== ''));
        }
        if (allergens.indexOf('') !== -1) {
            setAllergens(allergens.filter(item => item !== ''));
        }

        // return false;

        try {
            firebase
                .firestore()
                .collection('meals')
				.doc(queryID)
                .update({
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

    document.title = "eatr - Edit";

    useEffect(() => {
        console.log("initial fetch");
        if (typeof user.uid !== "string" || dataLoaded === true) return;
        firebase
            .firestore()
            .collection("meals")
            .doc(queryID)
            .get()
            .then((data) => {
				const thisMeal = data.data();
                setMeal(thisMeal);
				console.log(allergens)
				console.log(thisMeal.allergens)
				setAllergens( allergens => thisMeal.allergens);
				setCalories(thisMeal.calories);
				setIngredients( ingredients => thisMeal.ingredients);
				setMealName(thisMeal.mealName);
				setMealTime(thisMeal.mealTime);
				setDataLoaded(true);
            })
            .catch((e) => {
                console.log(e.message);
            });
    }, [user]);


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
        setIngredients(arr => [...arr]);
    }
    const addAllergen = () => {
        if (allergens.indexOf('') === -1) {
            setAllergens( allergens => [...allergens, '']);
        }
    }
    const writeAllergen = (index, name) => {
        let arr = allergens;
        arr[index] = name;
        setAllergens(arr);
    }

    const renderSwitch = (stage) => {
		{console.log(mealName)}
		
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
								console.log(ingredients)
                                return (
                                    <Form.Input
                                        key={index}
                                        placeholder="Ingredient"
                                        type="text" 
										value={ingredients[index]}
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
								console.log(allergens)
                                return (
                                    <Form.Input
                                        key={index}
                                        placeholder="Allergen"
                                        type="text" 
										value={allergens[index]}
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
                        <Form.Base onSubmit={handleEditMeal} method="POST">
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
                        <Header.ButtonLink
                            onClick={() => firebase.auth().signOut()}
                            to={ROUTES.HOME}
                        >
                            Sign out
                        </Header.ButtonLink>
                    </Header.Group>
                </Header.Frame>
            </Header>
            <CenterContainer>
                <Form>
                    {
						dataLoaded ? 
						renderSwitch(formStage) : (
							<p>Loading...</p>
						)
					}
                </Form>
            </CenterContainer>
        </>
    );
}
