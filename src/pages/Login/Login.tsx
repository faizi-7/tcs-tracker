import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GoogleSignIn from '../../components/GoogleLogin/GoogleLogin';
import AnonymousSignIn from '../../components/AnonymousLogin/AnonymousLogin';
import useAuth from '../../hooks/useAuth';
import styles from './Login.module.css';
import Loader from '../../components/Loader/Loader';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (currentUser) {
    navigate('/');
    return null;
  }

  const handleSuccess = () => {
    navigate('/');
  };

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
  };

  const handleLoading = (isLoading: boolean) => {
    setLoading(isLoading);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.headings}>
          <h1 className={styles.title}>Sign In</h1>
          <p className={styles.body}>Sign In with Google is Preferred!</p>
        </div>
        {loading && <Loader/>} 
        {error && <div className={styles.error}>{error}</div>}
        <div className={styles.googleButton}>
          <GoogleSignIn onSuccess={handleSuccess} onError={handleError} onLoading={handleLoading} />
        </div>
        <p>or</p>
        <div className={styles.anonymousButton}>
          <AnonymousSignIn onSuccess={handleSuccess} onError={handleError} onLoading={handleLoading} />
        </div>
      </div>
    </div>
  );
};

export default Login;
