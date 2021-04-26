import React, { useContext, useEffect, useState } from 'react';
import { Header, Meals } from '../components';
import * as ROUTES from '../constants/routes';
import logo from '../logo.svg';
import { FirebaseContext } from '../context/firebase';
import { WrapContainer as Wrap } from '../containers/wrap';
import Skeleton, {SkeletonTheme} from 'react-loading-skeleton';
// import { useContent } from '../hooks';

export default function Dashboard() {

  const { firebase } = useContext(FirebaseContext);
  const user = firebase.auth().currentUser || {};
  const friendlyName = user.displayName;

  const [meals, setMeals] = useState([])

  document.title = "eatr - Dashboard";

  useEffect(()=>{
    if (typeof user.uid !== 'string') return;
      firebase
          .firestore()
          .collection('meals').where("authorId", "==", user.uid)
          .get()
          .then((snapshot) => {
              const allContent = snapshot.docs.map((contentObj) => ({
                  ...contentObj.data(),
                  docId: contentObj.id,
              }))
              setMeals(allContent);
          })
          .catch((e) =>{
              console.log(e.message);
          });
  }, [user]);
  

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
      <Wrap>
        <p>Hello {friendlyName}</p>
        <h2>My Meals</h2>
        <Header.ButtonLink to={ROUTES.ADDMEAL}>Add Meal</Header.ButtonLink>
        {meals.length === 0 ? (
          <>
          {
            Array.from({ length: 3 }, (_, k) => (
              <SkeletonTheme color="#e2dcd4"> 
                <p></p>
                <Skeleton height={50} width={400}/>
                <p></p>
                <div>
                  <Skeleton width={120}/>
                </div>
                <p></p>
              </SkeletonTheme>
            ))
          }
          
          </>
        ) : 
          meals.map((meal, index) => {
            return (
              <Meals key={index} meal={meal}/>
            )
          })
        }
        
      </Wrap>
    </>
  )
}
