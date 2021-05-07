import {useState} from 'react';
import { Container, Item, Title, Text } from './styles/meal';

export default function Meal({ meal, children, ...restProps}) {

    const [expanded, setExpanded] = useState(false);

    return (
        <Item>
            <Title onClick={() => setExpanded(!expanded)}>{meal.mealName}</Title>
            <Text>Date logged: {new Date(meal.created).toLocaleString()}</Text>
            {expanded === true ? (
                <>
                    <Text>Calories: {meal.calories}</Text>
                    <Text>Ingredients:</Text>
                    <ul>
                        {meal.ingredients.map((item, idx) => (
                            <li key={idx}>{item}</li>
                        ))}
                    </ul>
                    {meal.allergens[0] === '' ? (
                        <></>
                    ) : (
                        <>
                            <Text>Allergens:</Text>
                            <ul>
                                {meal.allergens.map((item, idx) => (
                                    <li key={idx}>{item}</li>
                                ))}
                            </ul>
                        </>
                    )}
                    
                </>
            ) : ''}
        </Item>
    )
}

Meal.Container = function MealContainer({ children, ...restProps }) {
    return (<Container {...restProps}>{children}</Container>);
}
Meal.Text = function MealText({ children, ...restProps }) {
    return (<Text {...restProps}>{children}</Text>);
}