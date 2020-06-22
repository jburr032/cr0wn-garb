import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyAHfU4wlcwHeG8sx-4cmSDr6qvEYA9g7sg",
  authDomain: "crwn-db-b8698.firebaseapp.com",
  databaseURL: "https://crwn-db-b8698.firebaseio.com",
  projectId: "crwn-db-b8698",
  storageBucket: "crwn-db-b8698.appspot.com",
  messagingSenderId: "1000763279236",
  appId: "1:1000763279236:web:3b31e9db3ba23d08007fd1",
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    console.log("Firebase file displayName", displayName);
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
