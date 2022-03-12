import { createUserWithEmailAndPassword } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import {
  addDoc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  arrayUnion
} from "firebase/firestore";

import { auth, db, storage } from "../config/firebase";

export const register = async (user, email, password) => {
  try {
    // Create new user in firebase
    const newUser = await createUserWithEmailAndPassword(auth, email, password);
    // Set new user id in user object
    user.userId = newUser.user.uid;
    // Add new user to firestore
    const addedUser = await addDoc(collection(db, "users"), user);
    // Set docId in firestore user object
    // MIGHT REMOVE, REFER TO getRestaurants
    await updateDoc(doc(db, "users", addedUser.id), {
      docId: addedUser.id,
    });
  } catch (err) {
    console.log(err);
  }
};

// Use getDocs instead of getDoc because we don't have the actual user docId
export const getUserById = async (userId) => {
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("userId", "==", userId));

  const qSnapshot = await getDocs(q);
  // Destructure [user] because it's in another array
  const [user] = qSnapshot.docs.map((doc) => ({
    ...doc.data(),
  }));

  return user;
};

// export const addToFirebase = async () => {
//   try {
//     const docs = await getDocs(collection(db, "restaurants"));
//     docs.forEach(async (res) => {
//       await updateDoc(doc(db, "restaurants", res.id), {
//         totalRatings: 0,
//       });
//     });
//     //   for (let i = 0; i < data.length; i++) {
//     //     let obj = data[i];
//     //     const doc = await addDoc(collection(db, "restaurants"), obj);
//     //     console.log(doc.id);
//     //   }
//   } catch (err) {
//     console.log(err);
//   }
// };

export const getRestaurants = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "restaurants"));
    let restaurants = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      let obj = {
        id: doc.id,
        ...doc.data(),
      };
      restaurants.push(obj);
    });

    return restaurants;
  } catch (err) {
    console.log(err.message);
  }
};

export const getRestaurant = async (restaurantId) => {
  try {
    const restaurantRef = doc(db, "restaurants", restaurantId);
    const restaurantSnap = await getDoc(restaurantRef);

    return restaurantSnap.data();
  } catch (err) {
    console.log(err.message);
  }
}

export const addReview = async (userDocId, restaurantId, reviewBody, images) => {
  try {
    const reviewToAdd = {
      ...reviewBody,
      userDocId,
      restaurantId
    }

    const addedReview = await addDoc(collection(db, "reviews"), reviewToAdd);

    if (images) {
      for (let i = 0; i < images.length; i++) {
        const reviewImagesRef = ref(storage, `images/reviews/${images[i].name}`);

        uploadBytes(reviewImagesRef, images[i])
          .then(async (snapshot) => {
            const url = await getDownloadURL(snapshot.ref);
            // NEED TO UPDATE REVIEW DOC AND ADD URL
          })
          .catch((err) => {
            console.log(err);
          })
      }
    }

  } catch (err) {
    console.log(err.message);
  }
}

// export const addReviewImage = async (reviewId, image) => {
//   try {
    
//   } catch (err) {
//     console.log(err.message);
//   }
// }

//   const addReview = async (id) => {
//     let review = {
//       reviewId: "12347",
//       title: "review title",
//       body: "review body",
//       images: [],
//     };
//     const restaurantRef = doc(db, "restaurants", id);
//     await updateDoc(restaurantRef, {
//       reviews: arrayRemove(review),
//     });
//   };

//   const deleteImage = async (id, uri) => {
//     const reviewRef = doc(db, "reviews", id);
//     await updateDoc(reviewRef, {
//       images: arrayRemove(uri),
//     });
//   };

//   const getReviewsByUser = async () => {
//     const reviewsRef = collection(db, "reviews");
//     const q = query(reviewsRef, where("userId", "==", "user1"));
//     const snapshot = await getDocs(q);
//     let arr = [];
//     snapshot.forEach((doc) => {
//       console.log(doc.data());
//       arr.push({ reviewId: doc.id, ...doc.data() });
//     });
//     console.log(arr);
//     setReviews(arr);
//   };

// const getReviewsByRestaurant = async () => {
//   const reviewsRef = collection(db, "reviews");
//   const q = query(reviewsRef, where("restaurantId", "==", "restaurant1"))
//   const snapshot = await getDocs(q);
//   snapshot.forEach((doc) => {
//     console.log(doc.data());
//   })
// }
