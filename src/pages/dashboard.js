import React, { useContext } from 'react';
import { Header } from '../components';
import * as ROUTES from '../constants/routes';
import logo from '../logo.svg';
import { FirebaseContext } from '../context/firebase';

export default function Dashboard({ slides }) {

  const { firebase } = useContext(FirebaseContext);
  const user = firebase.auth().currentUser || {};

  document.title = "eatr - Dashboard";

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
        <p>Dashboard</p>
      </Header>
    </>
  )
}
