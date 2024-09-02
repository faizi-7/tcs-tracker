import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Candidate } from "../../types";
import styles from "./CreateCandidate.module.css";
import useAuth from "../../hooks/useAuth";
import { getCandidate, saveCandidate } from "../../services/candidateAction";
import { useFormLogic } from "../../hooks/useFormLogic";
import Loader from "../../components/Loader/Loader";
import { validateForm } from "../../utils/otherServices/validateForm";

const CreateCandidateForm: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser, loading } = useAuth();
  const [candidateFetched, setCandidateFetched] = useState(false);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const { formData, handleInputChange } = useFormLogic({
    status: "Waiting for JL (Received Offer)",
    region: "",
    collegeName: "",
    lastUpdated: new Date().toISOString().split("T")[0],
  });
  const [candidateAdded, setCandidateAdded] = useState<boolean>(false);
  const [existingProfile, setExistingProfile] = useState<Candidate | null>(
    null
  );

  useEffect(() => {
    const fetchProfile = async () => {
      console.log(loading);
      if (currentUser) {
        try {
          const profile = await getCandidate(currentUser.uid);
          if (profile) {
            setExistingProfile(profile);
          }
        } catch (error) {
          console.error("Error fetching candidate profile:", error);
        }
      }
      {
        !loading && setCandidateFetched(true);
      }
    };

    fetchProfile();
  }, [currentUser, loading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentUser) {
      console.error("User must be logged in to create a candidate profile.");
      return;
    }
    if (!validateForm({ formData, setFormErrors })) return;

    setCandidateAdded(true);

    try {
      await saveCandidate(formData, currentUser.uid);
      navigate("/");
    } catch (error) {
      console.error("Error creating candidate profile:", error);
    } finally {
      setCandidateAdded(false);
    }
  };

  if (existingProfile) {
    return (
      <div>
        <p>You already have a candidate profile.</p>
        <Link to={`/update`}>
          Update your profile here
        </Link>
      </div>
    );
  }
  if (loading) {
    return <Loader />;
  }
  return (
    candidateFetched && (
      <div className={styles.container}>
        {!currentUser && (
          <div className={styles.loginWarning}>
            Hey 👁️,{" "}
            <Link to="/login" className="link">
              <b>Login</b>
            </Link>{" "}
            to Create Candidate Status
          </div>
        )}
        <form
          onSubmit={(e) => handleSubmit(e)}
          className={styles.formContainer}
        >
          <div className={styles.formGroup}>
            <label htmlFor="status" className={styles.label}>
              Status:
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className={styles.select}
            >
              <option value="Waiting for JL (Received Offer)">
                Waiting for Joining (Received Offer)
              </option>
              <option value="Received JL">Received Joining Letter</option>
              <option value="Candidate Batched">Candidate Batched</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="region" className={styles.label}>
              Location:
            </label>
            <input
              type="text"
              id="region"
              name="region"
              value={formData.region}
              onChange={handleInputChange}
              required
              className={styles.input}
              placeholder="eg : varanasi"
            />
          </div>

          {formData.status === "Received JL" && (
            <>
              <div className={styles.formGroup}>
                <label htmlFor="joiningDate" className={styles.label}>
                  Joining Date:
                </label>
                <input
                  type="date"
                  id="joiningDate"
                  name="joiningDate"
                  value={formData.joiningDate || ""}
                  onChange={handleInputChange}
                  className={styles.input}
                />
              </div>
              {formErrors.joiningDate && (
                <p className={styles.error}>{formErrors.joiningDate}</p>
              )}

              <div className={styles.formGroup}>
                <label htmlFor="location" className={styles.label}>
                  Joining Location:
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location || ""}
                  onChange={handleInputChange}
                  className={styles.input}
                  placeholder="eg : varanasi"
                />
              </div>
              {formErrors.location && (
                <p className={styles.error}>{formErrors.location}</p>
              )}

              <div className={styles.formGroup}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    id="preferredLocation"
                    name="preferredLocation"
                    checked={formData.preferredLocation}
                    onChange={handleInputChange}
                    className={styles.checkbox}
                  />
                  Got Preferred Location ?
                </label>
              </div>
            </>
          )}

          <div className={styles.formGroup}>
            <label htmlFor="collegeName" className={styles.label}>
              College Name:
            </label>
            <input
              type="text"
              id="collegeName"
              name="collegeName"
              value={formData.collegeName}
              onChange={handleInputChange}
              required
              className={styles.input}
              placeholder="eg : Jamia Millia Islamia"
            />
          </div>

          {formData.status !== "Candidate Batched" && (
            <>
              <div className={styles.formGroup}>
                <label htmlFor="profile" className={styles.label}>
                  Profile:
                </label>
                <select
                  id="profile"
                  name="profile"
                  value={formData.profile}
                  onChange={handleInputChange}
                  className={styles.select}
                >
                  <option value="Digital 😎">Digital 😎</option>
                  <option value="Ninja 🥲">Ninja 🥲</option>
                  <option value="Prime 🤑">Prime 🤑</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label
                  htmlFor="offerLetterReceivedMonth"
                  className={styles.label}
                >
                  Offer Letter Received Month:
                </label>
                <input
                  type="month"
                  id="offerLetterReceivedMonth"
                  name="offerLetterReceivedMonth"
                  value={formData.offerLetterReceivedMonth || ""}
                  onChange={handleInputChange}
                  className={styles.input}
                />
              </div>
              {formErrors.offerLetterReceivedMonth && (
                <p className={styles.error}>
                  {formErrors.offerLetterReceivedMonth}
                </p>
              )}
            </>
          )}

          <button
            type="submit"
            className="button"
            disabled={candidateAdded || !currentUser}
          >
            {candidateAdded ? "Creating Profile..." : "Create Profile"}
          </button>
        </form>
      </div>
    )
  );
};

export default CreateCandidateForm;
