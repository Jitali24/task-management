import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

interface SigninData {
  email: string;
  password: string;
}

export async function signinUser({ email, password }: SigninData) {
  try {
    // 1. Sign in the user
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // 2. (Optional) Fetch user data from Firestore
    const userDocRef = doc(db, "users", user.uid);
    const userSnapshot = await getDoc(userDocRef);

    const userData = userSnapshot.exists() ? userSnapshot.data() : null;

    return { success: true, uid: user.uid, userData };
  } catch (error: unknown) {
    console.error("Signin error:", error);
    throw new Error(error instanceof Error ? error.message : `${error}`);
  }
}
