import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./UpdateCandidate.module.css";
import useAuth from "../../hooks/useAuth";
import { getCandidate, updateCandidate } from "../../services/candidateAction";
import { useFormLogic } from "../../hooks/useFormLogic";
import Loader from "../../components/Loader/Loader";
import { validateForm } from "../../utils/otherServices/validateForm";

const UpdateCandidateForm: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [formLoading, setFormLoading] = useState<boolean>(true);
  const [err, setErr] = useState(false);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const { formData, setFormData, handleInputChange } = useFormLogic({
    status: "Waiting for JL (Received Offer)",
    region: "",
    collegeName: "",
    lastUpdated: new Date().toISOString().split("T")[0],
  });

  useEffect(() => {
    const fetchProfile = async () => {
      if (currentUser) {
        try {
          const profile = await getCandidate(currentUser.uid);
          if (profile) {
            setErr(false);
            console.log(profile);
            setFormData(profile);
          } else {
            setErr(true);
          }
        } catch (error) {
          console.error("Error fetching candidate profile:", error);
          setErr(true);
        } finally {
          setFormLoading(false);
        }
      } else {
        setErr(true);
      }
    };

    fetchProfile();
  }, [currentUser, navigate]);

  if (formLoading) {
    return <Loader />;
  }
  if (err) {
    return (
      <div>
        Profile Can Only be updated after Candidate Creation!{" "}
        <Link to="/create">Create Candidate</Link>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentUser || !formData) {
      console.error(
        "User must be logged in and form data must be filled to update a candidate profile."
      );
      return;
    }
    if (!validateForm({ formData, setFormErrors })) return;

    setFormLoading(true);

    try {
      await updateCandidate(formData, currentUser.uid);
      navigate("/");
    } catch (error) {
      console.error("Error updating candidate profile:", error);
    } finally {
      setFormLoading(false);
    }
  };
  return (
    <div className={styles.container}>
      {formData && (
        <form onSubmit={handleSubmit} className={styles.formContainer}>
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

          <button type="submit" className="button" disabled={formLoading}>
            {formLoading ? "Updating Profile..." : "Update Profile"}
          </button>
        </form>
      )}
    </div>
  );
};

export default UpdateCandidateForm;
