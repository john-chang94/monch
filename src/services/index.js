import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, getDoc, collection, query, where, getDocs, doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase";

export const register = async (user, email, password) => {
    try {
        // Create new user in firebase
        const newUser = await createUserWithEmailAndPassword(auth, email, password);
        // Set new user id in user object
        user.userId = newUser.user.uid;
        // Add new user to firestore
        const addedUser = await addDoc(collection(db, "users"), user);
        // Set docId in firestore user object
        await updateDoc(doc(db, "users", addedUser.id), {
            docId: addedUser.id
        })
    } catch (err) {
        console.log(err);
    }
}

// Use getDocs instead of getDoc because we don't have the actual user docId
export const getUserById = async (userId) => {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("userId", "==", userId));
    
    const qSnapshot = await getDocs(q);
    const [user] = qSnapshot.docs.map((doc) => ({
        ...doc.data(),
        docId: doc.id // Set doc id for fetched user
    }));

    return user;
}