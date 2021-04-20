import React, { useContext } from 'react';
import { Header } from '../components';
import * as ROUTES from '../constants/routes';
import logo from '../logo.svg';
import { FirebaseContext } from '../context/firebase';
import { useContent } from '../hooks';

export default function Dashboard() {

  const { firebase } = useContext(FirebaseContext);
  const user = firebase.auth().currentUser || {};
  const friendlyName = user.displayName;

  document.title = "eatr - Dashboard";

  console.log(useContent('meals'));

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
        <p>Hello {friendlyName}</p>
        <p>Dashboard</p>
    </>
  )
}
