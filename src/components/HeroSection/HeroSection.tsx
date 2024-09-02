import { useEffect, useState } from "react";
import styles from "./HeroSection.module.css";
import useAuth from "../../hooks/useAuth";
import Loader from "../../components/Loader/Loader";
import { Link } from "react-router-dom";
import { getCandidate } from "../../services/candidateAction";

const HeroSection: React.FC = () => {
  const { currentUser, loading } = useAuth();
  const [hasProfile, setHasProfile] = useState(false);
  const [wait, setWait] = useState(true);

  useEffect(() => {
    if (!loading) {
      async function fetchProfile() {
        if (currentUser) {
          try {
            const profile = await getCandidate(currentUser.uid);
            if (profile) setHasProfile(true);
          } catch (error) {
            console.log(error);
          }
        }
        setWait(false);
      }
      fetchProfile();
    }
  }, [currentUser, loading]);
  if (wait) return <Loader />;
  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        {currentUser ? (
          <>
            <h1 className={styles.title}>
              Welcome, {currentUser.displayName || "Guest 👤"}!
            </h1>
            {hasProfile ? (
              <h3 className={styles.body}>
                Got an Update from TCS ? Update it Here too 👁️
              </h3>
            ) : (
              <h3>Part of TCS Hiring ? Create Your Profile Now ✨</h3>
            )}
            {hasProfile ? (
              <button className="button"><Link to='/update' className="link">Update your Profile</Link></button>
            ) : (
              <button className="button">
                <Link to="/create" className="link">
                  Create Profile ✍🏻
                </Link>
              </button>
            )}
          </>
        ) : (
          <>
            <h1 className={styles.title}>
              Welcome Guest! Login (with Google or Anonymous) & Add your
              Application Status
            </h1>
            <h3 className={styles.body}>
              Login only if you have participated in TCS Recruitment
            </h3>
            <button className="button">
              <Link to="/login" className="link">
                Login Now ✨
              </Link>
            </button>
          </>
        )}
      </div>
      <div className="divider"></div>
    </div>
  );
};

export default HeroSection;
