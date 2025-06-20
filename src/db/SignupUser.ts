import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase";

interface SignupData {
  email: string;
  password: string;
  name: string;
}

export async function SignupUser({ email, password, name }: SignupData) {
  try {
    // 1. Create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // 2. Add user info to Firestore
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      name,
      email,
      createdAt: serverTimestamp(),
    });

    return { success: true, uid: user.uid };
  } catch (error: unknown) {
    console.error("Signup error:", error);
    throw new Error(error instanceof Error ? error.message : `${error}`);
  }
}
