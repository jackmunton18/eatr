import React from 'react';
import { Header } from '../components';
import * as ROUTES from '../constants/routes';
import logo from '../logo.svg';

export default function Dashboard({ slides }) {

    document.title = "eatr";

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
            <p>Home page</p>
        </>
    )
}
