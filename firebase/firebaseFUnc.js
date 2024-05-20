import { auth, db } from "@/app/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export const signUpAndCreateCompany = (email, password, companyName) => {
    return new Promise(async (resolve, reject) => {
      try {
        // Create user in Firebase Authentication
        const { user } = await createUserWithEmailAndPassword(auth, email, password);
  
        // Create document in the "companies" collection with the user's UID and companyName
        const companyDocRef = doc(db, 'companies', user.uid);
        await setDoc(companyDocRef, {
          uid: user.uid,
          companyName: companyName,
        });
  
        // Resolve with the user object
        resolve(user);
      } catch (error) {
        reject(error);
      }
    });
  };