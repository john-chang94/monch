import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../config/firebase";

export const register = async (email, password, confirmPassword) => {
    try {
        if (password !== confirmPassword) {
            throw new Error("Passwords do not match");
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then((res) => {
                console.log(res.user)
                // const doc = addDoc(collection(db, "users"), user);
            })
            .catch((err) => {
                console.log(err.message);
            })
    } catch (err) {
        console.log(err);
    }
}