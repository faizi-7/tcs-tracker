import { signInAnonymously } from "firebase/auth";
import { auth } from "../../utils/firebase";
import React from "react";

interface AnonymousSignInProps {
  onSuccess: () => void;
  onError: (error: string) => void;
  onLoading: (isLoading: boolean) => void;
}

const AnonymousSignIn: React.FC<AnonymousSignInProps> = ({ onSuccess, onError, onLoading }) => {
  const handleAnonymousSignIn = async () => {
    onLoading(true);
    try {
      const result = await signInAnonymously(auth);
      const user = result.user;
      console.log("Anonymous User Info:", user.uid);
      onSuccess();
    } catch (error) {
      console.error("Error during anonymous sign-in:", error);
      onError("Failed to sign in anonymously. Please try again.");
    } finally {
      onLoading(false);
    }
  };

  return (
    <div onClick={handleAnonymousSignIn} className="anonymous-sign-in-button">
      Continue as Guest
    </div>
  );
};

export default AnonymousSignIn;
