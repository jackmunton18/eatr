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

  const [meals, setMeals] = useState([]);
  const [lastDoc, setLastDoc] = useState();
  const [dataLoaded, setDataLoaded] = useState(false)

  document.title = "eatr - Dashboard";


  useEffect(()=>{
    console.log('initial fetch')
    if (typeof user.uid !== 'string' || dataLoaded === true) return;
      firebase
      .firestore()
      .collection('meals')
      .where("authorId", "==", user.uid)
      .orderBy('created', 'desc')
      .limit(25)
      .get()
      .then((collections) => {
          const allContent = collections.docs.map((meal) => meal.data());
          setMeals(allContent);
          setLastDoc(collections.docs[collections.docs.length - 1]);
          setDataLoaded(true);
          console.log(allContent);
      })
      .catch((e) =>{
          console.log(e.message);
      });
  }, [user]);

  const fetchMore = () => {
    console.log(lastDoc)
    firebase
      .firestore()
      .collection('meals')
      .where("authorId", "==", user.uid)
      .orderBy('created', 'desc')
      .limit(25)
      .startAt(lastDoc)
      .get()
      .then((collections) => {
          const allContent = collections.docs.map((meal) => meal.data());
          console.log(collections.docs)
          setMeals(allContent => [...meals, ...allContent]);
          setLastDoc(collections.docs[collections.docs.length - 1]);
      })
      .catch((e) =>{
          console.log(e.message);
      });
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
      <Wrap>
        <p>Hello {friendlyName}</p>
        <h2>My Meals</h2>
        <Header.ButtonLink to={ROUTES.ADDMEAL}>Add Meal</Header.ButtonLink>
        {dataLoaded === false ? (
          <>
            {
              Array.from({ length: 3 }, (_, k) => (
                <SkeletonTheme key={k} color="#e2dcd4"> 
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
          meals.length === 0 ? (
            <p>No meals found</p>
          ) : (
            <>
              {
                meals.map((meal, index) => {
                  return (
                    <Meals key={index} meal={meal}/>
                  )
                })   
              }
            </>
          )
                 
        }

        {/* <div onClick={() => fetchMore()}>load more...</div> */}
        
      </Wrap>
    </>
  )
}
