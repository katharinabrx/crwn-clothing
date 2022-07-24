import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBUNSNMyr30t8yU23W0OE72QYEbJSrAfyw",
  authDomain: "crwn-clothing-db-25ca4.firebaseapp.com",
  projectId: "crwn-clothing-db-25ca4",
  storageBucket: "crwn-clothing-db-25ca4.appspot.com",
  messagingSenderId: "287056443832",
  appId: "1:287056443832:web:ed9cb69855e4e5b5a4f74d",
};

const firebaseApp = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth(firebaseApp);
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, { displayName, email, createdAt });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  return userDocRef;
};
