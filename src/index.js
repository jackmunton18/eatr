import React from 'react';
import { render } from 'react-dom';
import 'normalize.css';
import App from './app';
import {GlobalStyles} from './global-styles';
import { firebase } from './lib/firebase';
import { FirebaseContext } from './context/firebase';

render (
    <>
        <style>            
            @import url('https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,300;0,400;1,300;1,400&display=swap');
        </style>
        <FirebaseContext.Provider value={{firebase}}>
            <GlobalStyles/>
            <App />
        </FirebaseContext.Provider>
    </>,
    document.getElementById('root')
);