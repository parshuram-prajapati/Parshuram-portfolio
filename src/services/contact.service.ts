import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

export const saveContactMessage = async (
  name: string,
  email: string,
  message: string
) => {
  await addDoc(collection(db, "contacts"), {
    name,
    email,
    message,
    createdAt: serverTimestamp(),
  });
};
