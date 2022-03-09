import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../config/firebase";

export const register = async (user, email, password) => {
    try {
        // Create new user in firebase
        const newUser = await createUserWithEmailAndPassword(auth, email, password);
        // Set new user id in user object
        user.userId = newUser.user.uid;
        // Add new user to firestore
        await addDoc(collection(db, "users"), user);
    } catch (err) {
        console.log(err);
    }
}