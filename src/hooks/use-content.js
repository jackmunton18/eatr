import { useState, useEffect, useContext} from 'react';
import { FirebaseContext} from '../context/firebase';

export default function useContent(target) {
    const [content, setContent] = useState([]);
    const { firebase } = useContext(FirebaseContext);   

    const user = JSON.parse(localStorage.getItem('authUser'))

    console.log(user.uid)

    useEffect(()=>{
        firebase
            .firestore()
            .collection(target).where("authorId", "==", user.uid)
            .get()
            .then((snapshot) => {
                const allContent = snapshot.docs.map((contentObj) => ({
                    ...contentObj.data(),
                    docId: contentObj.id,
                }))
                setContent(allContent);
            })
            .catch((e) =>{
                console.log(e.message);
            });
    }, []);

    return {[target]: content};
}