import { db } from "./firebase";
import { addDoc, collection, Timestamp } from "firebase/firestore";

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
