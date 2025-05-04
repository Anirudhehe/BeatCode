import { db } from "./firebase";
import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
  Timestamp,
} from "firebase/firestore";

// Save user's solution to Firestore
export const saveUserSolution = async (
  userEmail: string,
  title: string,
  code: string,
  optimizedCode: string
) => {
  try {
    const docRef = await addDoc(collection(db, "solutions"), {
      userEmail,
      title,
      solution: code,
      optimizedSolution: optimizedCode,
      timestamp: Timestamp.now(),
    });

    console.log("Saved solution with ID:", docRef.id);
  } catch (error) {
    console.error("Error saving to Firestore:", error);
    throw error;
  }
};

// Fetch all solutions saved by a user
export const getUserSolutions = async (userEmail: string) => {
  try {
    const q = query(
      collection(db, "solutions"),
      where("userEmail", "==", userEmail)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching user solutions:", error);
    throw error;
  }
};
