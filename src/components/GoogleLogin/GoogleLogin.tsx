import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../utils/firebase";
import React from "react";

interface GoogleSignInProps {
  onSuccess: () => void;
  onError: (error: string) => void;
  onLoading: (isLoading: boolean) => void;
}

const GoogleSignIn: React.FC<GoogleSignInProps> = ({ onSuccess, onError, onLoading }) => {
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    onLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Google User Info:", user, user.uid);
      onSuccess();
    } catch (error) {
      console.error("Error during Google sign-in:", error);
      onError("Failed to sign in with Google. Please try again.");
    } finally {
      onLoading(false);
    }
  };

  return (
    <div onClick={handleGoogleSignIn} className="google-sign-in-button">
      Sign in with Google
    </div>
  );
};

export default GoogleSignIn;
