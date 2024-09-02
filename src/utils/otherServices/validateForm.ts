import { Candidate } from "../../types";
interface ValidateFormProps {
  formData: Candidate;
  setFormErrors: (errors: { [key: string]: string }) => void;
}
export const validateForm = ({formData, setFormErrors} : ValidateFormProps) => {
  const errors: { [key: string]: string } = {};

  if (formData.status === "Received JL") {
    if (!formData.joiningDate) {
      errors.joiningDate = "Joining Date is required";
    }
    if (!formData.location && !formData.location?.trim()) {
      errors.location = "Location is required";
    }
  }

  if (formData.status !== "Candidate Batched") {
    if (!formData.offerLetterReceivedMonth) {
      errors.offerLetterReceivedMonth = "Offer Letter Received Month is required";
    }
  }

  setFormErrors(errors);
  return Object.keys(errors).length === 0;
};