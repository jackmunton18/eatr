import React from 'react';
import { Meal } from '../components/';

export function MealContainer({ data, children, ...restProps}) {
    return (
        <Meal.Container>
            {data.map((meal, index) => (
                <Meal key={index}>{meal}</Meal>
            ))}
        </Meal.Container>        
    );
}