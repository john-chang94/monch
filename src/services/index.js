import {
  createUserWithEmailAndPassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import {
  addDoc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  orderBy,
  deleteDoc,
} from "firebase/firestore";

import { auth, db, storage } from "../config/firebase";

// Get restaurant reviews to calculate the average rating
const getAverageRating = async (restaurantId) => {
  let ratingSum = 0;
  let count = 0;

  // Get reviews based on restaurantId
  const reviewsRef = collection(db, "reviews");
  const q = query(reviewsRef, where("restaurantId", "==", restaurantId));
  const querySnapshot = await getDocs(q);

  // Get the total ratings and divisor to find the average
  querySnapshot.forEach((doc) => {
    ratingSum = ratingSum + doc.data().rating;
    count = count + 1;
  });
  // Return the average rating
  return ratingSum / count;
};

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
};

// Use getDocs instead of getDoc because we don't have the actual user docId
export const getUserById = async (userId) => {
  // console.log("GET USER BY ID");
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("userId", "==", userId));

  const qSnapshot = await getDocs(q);
  // Destructure [user] because it's in another array
  const [user] = qSnapshot.docs.map((doc) => ({
    docId: doc.id,
    ...doc.data(),
  }));

  return user;
};

export const updateUser = async (docId, body) => {
  const userRef = doc(db, "users", docId);
  await updateDoc(userRef, body);
};

// Get all restaurants
export const getRestaurants = async () => {
  // console.log("GET RESTAURANTS");
  try {
    let restaurants = [];
    const restaurantsRef = collection(db, "restaurants");
    const querySnapshot = await getDocs(restaurantsRef);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      let obj = {
        docId: doc.id,
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
  // console.log("GET RESTAURANT");
  try {
    // Get restaurant
    const restaurantRef = doc(db, "restaurants", restaurantId);
    const restaurantSnap = await getDoc(restaurantRef);
    // Get restaurant average rating
    const rating = await getAverageRating(restaurantId);
    // Combine restaurant and average rating to return
    const restaurant = {
      ...restaurantSnap.data(),
      rating: rating,
    };

    return restaurant;
  } catch (err) {
    console.log(err.message);
  }
};

export const getReviews = async (restaurantId) => {
  // console.log("GET REVIEWS");
  try {
    let reviews = [];
    const reviewsRef = collection(db, "reviews");
    const q = query(
      reviewsRef,
      where("restaurantId", "==", restaurantId),
      orderBy("date", "desc")
    );
    const querySnapshot = await getDocs(q);
    // Add each review snapshot into reviews array
    querySnapshot.forEach((doc) => {
      reviews.push(doc.data());
    });

    return reviews;
  } catch (err) {
    console.log(err.message);
  }
};

export const getReviewsByUser = async (userId) => {
  // console.log("GET REVIEWS BY USER");
  try {
    let reviews = [];
    const reviewsRef = collection(db, "reviews");
    const q = query(reviewsRef, where("userId", "==", userId), orderBy("date", "desc"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      let obj = {
        docId: doc.id,
        ...doc.data(),
      };
      reviews.push(obj);
    });

    return reviews;
  } catch (err) {
    console.log(err.message);
  }
};

export const getReviewById = async (docId) => {
  try {
    // console.log("GET REVIEW BY ID");
    const reviewRef = doc(db, "reviews", docId);
    const reviewSnap = await getDoc(reviewRef);
    const review = { ...reviewSnap.data() };

    return review;
  } catch (err) {
    console.log(err.message);
  }
};

export const getRestaurantReviewImages = async (restaurantId) => {
  // console.log("GET RESTAURANT REVIEW IMAGES");
  try {
    let images = [];
    const imagesRef = collection(db, "reviewImages");
    const q = query(
      imagesRef,
      where("restaurantId", "==", restaurantId),
      orderBy("dateAdded", "desc")
    );
    const querySnapshot = await getDocs(q);
    // Add each review snapshot into images array
    querySnapshot.forEach((doc) => {
      images.push(doc.data());
    });

    return images;
  } catch (err) {
    console.log(err.message);
  }
};

// Get suggestions for search input
export const getSuggestions = async () => {
  // console.log("GET SUGGESTIONS");
  try {
    let suggestions = [];
    const suggestionsRef = collection(db, "suggestions");
    const querySnapshot = await getDocs(suggestionsRef);
    querySnapshot.forEach((doc) => {
      let obj = {
        docId: doc.id,
        ...doc.data(),
      };
      suggestions.push(obj);
    });

    return suggestions;
  } catch (err) {
    console.log(err.message);
  }
};

export const getSearchResults = async (search) => {
  // console.log("GET SEARCH RESULTS");
  try {
    let results = [];
    const restaurantsRef = collection(db, "restaurants");
    // Search for any matching restaurant name
    const q1 = query(restaurantsRef, where("name", "==", search));
    // Search for any matching category
    const q2 = query(
      restaurantsRef,
      where("categories", "array-contains", search)
    );
    const querySnapshot1 = await getDocs(q1);
    const querySnapshot2 = await getDocs(q2);
    querySnapshot1.forEach((doc) => {
      let obj = {
        docId: doc.id,
        ...doc.data(),
      };
      results.push(obj);
    });
    querySnapshot2.forEach((doc) => {
      let obj = {
        docId: doc.id,
        ...doc.data(),
      };
      results.push(obj);
    });

    return results;
  } catch (err) {
    console.log(err.message);
  }
};

export const getPriceFilteredResults = async (search, price) => {
  // console.log("GET PRICE FILTERED RESULTS");
  try {
    let results = [];
    const restaurantsRef = collection(db, "restaurants");
    // Search for a matching restaurant name price
    const q1 = query(
      restaurantsRef,
      where("name", "==", search),
      where("price", "==", price)
    );
    // Search for any matching category and matching price
    const q2 = query(
      restaurantsRef,
      where("categories", "array-contains", search),
      where("price", "==", price)
    );
    const querySnapshot1 = await getDocs(q1);
    const querySnapshot2 = await getDocs(q2);
    querySnapshot1.forEach((doc) => {
      let obj = {
        docId: doc.id,
        ...doc.data(),
      };
      results.push(obj);
    });
    querySnapshot2.forEach((doc) => {
      let obj = {
        docId: doc.id,
        ...doc.data(),
      };
      results.push(obj);
    });

    return results;
  } catch (err) {
    console.log(err.message);
  }
};

export const getRatingFilteredResults = async (search, rating) => {
  // console.log("GET RATING FILTERED RESULTS");
  try {
    let results = [];
    const restaurantsRef = collection(db, "restaurants");
    // Search for a matching restaurant name and rating
    const q1 = query(
      restaurantsRef,
      where("name", "==", search),
      where("rating", ">=", Math.floor(rating)),
      where("rating", "<=", Math.ceil(rating) - 0.01)
    );
    // Search for any matching category and matching rating
    const q2 = query(
      restaurantsRef,
      where("categories", "array-contains", search),
      where("rating", ">=", Math.floor(rating)),
      where("rating", "<=", Math.ceil(rating) - 0.01)
    );
    const querySnapshot1 = await getDocs(q1);
    const querySnapshot2 = await getDocs(q2);
    querySnapshot1.forEach((doc) => {
      let obj = {
        docId: doc.id,
        ...doc.data(),
      };
      results.push(obj);
    });
    querySnapshot2.forEach((doc) => {
      let obj = {
        docId: doc.id,
        ...doc.data(),
      };
      results.push(obj);
    });

    return results;
  } catch (err) {
    console.log(err.message);
  }
};

export const getPriceAndRatingFilteredResults = async (
  search,
  price,
  rating
) => {
  // console.log("GET PRICE AND RATING FILTERED RESULTS");
  try {
    let results = [];
    const restaurantsRef = collection(db, "restaurants");
    // Search for a matching restaurant name, price, and rating
    const q1 = query(
      restaurantsRef,
      where("name", "==", search),
      where("price", "==", price),
      where("rating", ">=", Math.floor(rating)),
      where("rating", "<=", Math.ceil(rating) - 0.01)
    );
    // Search for any matching category, matching price and rating
    const q2 = query(
      restaurantsRef,
      where("categories", "array-contains", search),
      where("price", "==", price),
      where("rating", ">=", Math.floor(rating)),
      where("rating", "<=", Math.ceil(rating) - 0.01)
    );
    const querySnapshot1 = await getDocs(q1);
    const querySnapshot2 = await getDocs(q2);
    querySnapshot1.forEach((doc) => {
      let obj = {
        docId: doc.id,
        ...doc.data(),
      };
      results.push(obj);
    });
    querySnapshot2.forEach((doc) => {
      let obj = {
        docId: doc.id,
        ...doc.data(),
      };
      results.push(obj);
    });

    return results;
  } catch (err) {
    console.log(err.message);
  }
};

export const uploadFile = async (category, file) => {
  try {
    const imageRef = ref(storage, `images/${category}/${file.name}`);
    const snapshot = await uploadBytes(imageRef, file);
    const url = await getDownloadURL(snapshot.ref);

    return url;
  } catch (err) {
    console.log(err.message);
  }
};

export const deleteFile = async (url) => {
  try {
    // Get image ref from url, does not have to be file name :')
    const imageRef = ref(storage, url);
    // Delete file from firebase
    await deleteObject(imageRef);
  } catch (err) {
    console.log(err.message);
  }
};

export const updateUserImage = async (docId, file) => {
  try {
    const userRef = doc(db, "users", docId);
    const userSnap = await getDoc(userRef);
    const userDoc = userSnap.data();

    if (userDoc) {
      const url = await uploadFile("users", file);
      // Delete old image from storage if not the default
      if (!userDoc.profileImgDefault) {
        deleteFile(userDoc.profileImg);
      }
      // Update user profile image and set default to false
      // for reference purposes used above
      await updateDoc(userRef, {
        profileImg: url,
        profileImgDefault: false,
      });
    }
  } catch (err) {
    console.log(err.message);
  }
};

export const deleteUserImage = async (docId) => {
  try {
    const userRef = doc(db, "users", docId);
    const userSnap = await getDoc(userRef);
    const userDoc = userSnap.data();

    if (userDoc) {
      // Delete old image from storage
      deleteFile(userDoc.profileImg);
      // Get default image ref
      const defaultImgRef = ref(storage, "images/users/person-blank.png");
      const url = await getDownloadURL(defaultImgRef);
      // Update user profile image and set default to true
      await updateDoc(userRef, {
        profileImg: url,
        profileImgDefault: true,
      });
    }
  } catch (err) {
    console.log(err.message);
  }
};

export const addReview = async (review, images) => {
  try {
    // Add review to firestore
    const addedReview = await addDoc(collection(db, "reviews"), review);
    // Get restaurant to update rating at the end
    const restaurantRef = doc(db, "restaurants", review.restaurantId);
    const restaurantSnap = await getDoc(restaurantRef);
    const restaurantDoc = restaurantSnap.data();

    // Get restaurant average rating
    const rating = await getAverageRating(review.restaurantId);

    // Update restaurants rating and total ratings
    await updateDoc(restaurantRef, {
      rating,
      totalRatings: restaurantDoc.totalRatings + 1,
    });

    // Run if review has any images
    if (images.length > 0) {
      // Get newly added review doc id
      const reviewRef = doc(db, "reviews", addedReview.id);
      // Repeat upload and update review process for each image provided
      for (let i = 0; i < images.length; i++) {
        // Upload image file to firebase
        const url = await uploadFile("reviews", images[i]);
        // Add image url to review images array
        await updateDoc(reviewRef, {
          images: arrayUnion(url),
        });
        // Add image to reviewImages collection for rendering all images
        const imageBody = {
          dateAdded: review.date,
          restaurantId: review.restaurantId,
          url: url,
        };
        await addDoc(collection(db, "reviewImages"), imageBody);
      }
    }
  } catch (err) {
    console.log(err.message);
  }
};

export const updateReview = async (reviewId, rating, details) => {
  try {
    const reviewRef = doc(db, "reviews", reviewId);
    await updateDoc(reviewRef, {
      rating,
      details,
    });
  } catch (err) {
    console.log(err.message);
  }
};

export const deleteReview = async (reviewId) => {
  try {
    const reviewRef = doc(db, "reviews", reviewId);
    const reviewSnap = await getDoc(reviewRef);
    const reviewDoc = reviewSnap.data();

    // Delete review images, if any
    if (reviewDoc.images.length > 0) {
      for (let i = 0; i < reviewDoc.images.length; i++) {
        await deleteReviewImage(reviewId, reviewDoc.images[i]);
      }
    }
    // Delete review
    await deleteDoc(reviewRef);
  } catch (err) {
    console.log(err.message);
  }
}

export const addReviewImage = async (reviewId, restaurantId, image) => {
  try {
    // Upload image file to firebase
    const reviewRef = doc(db, "reviews", reviewId);
    const url = await uploadFile("reviews", image);
    // Update images array in review
    await updateDoc(reviewRef, {
      images: arrayUnion(url),
    });
    // Add image to reviewImages collection
    const imageBody = {
      dateAdded: Date.now(),
      restaurantId,
      url,
    };
    await addDoc(collection(db, "reviewImages"), imageBody);
  } catch (err) {
    console.log(err.message);
  }
};

// Delete image from storage and firestore
export const deleteReviewImage = async (reviewId, image) => {
  try {
    // Delete image from review
    const reviewRef = doc(db, "reviews", reviewId);
    await updateDoc(reviewRef, {
      images: arrayRemove(image),
    });
    // Delete image from reviewImages collection
    const reviewImageRef = collection(db, "reviewImages");
    const q = query(reviewImageRef, where("url", "==", image));
    const qSnapshot = await getDocs(q);
    // Destructure [reviewImage] because it's in another array
    const [reviewImage] = qSnapshot.docs.map((doc) => ({
      docId: doc.id,
    }));
    await deleteDoc(doc(db, "reviewImages", reviewImage.docId));
    // Delete image file from firebase
    deleteFile(image);
  } catch (err) {
    console.log(err);
  }
};

export const updateUserPassword = async (currentPassword, newPassword) => {
  try {
    const user = auth.currentUser;
    // Get user's credentials
    const creds = EmailAuthProvider.credential(user.email, currentPassword);
    try {
      // Re-authenticate signed in user
      await reauthenticateWithCredential(user, creds);
      try {
        // Update user's password
        await updatePassword(user, newPassword);
      } catch (err) {
        throw new Error(err);
      }
    } catch (err) {
      throw new Error(err);
    }
  } catch (err) {
    throw new Error(err.message);
  }
};
