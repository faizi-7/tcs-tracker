import { useState } from 'react';
import { Candidate } from '../types';

export const useFormLogic = (initialState: Candidate) => {
  const [formData, setFormData] = useState<Candidate>(initialState);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    console.log('Input Change:', { name, value, type }); // Debugging

    if (name === "status") {
      if (value === "Candidate Batched") {
        console.log('Setting Candidate Batched'); // Debugging
        setFormData(prevData => ({
          ...prevData,
          status: value,
          joiningDate: undefined,
          location: undefined,
          preferredLocation: undefined,
          offerLetterReceivedMonth: undefined,
          profile: undefined
        }));
      } else if (value === "Waiting for JL (Received Offer)") {
        console.log('Setting Waiting for JL'); // Debugging
        setFormData(prevData => ({
          ...prevData,
          status: value,
          joiningDate: undefined,
          preferredLocation: undefined,
          profile: 'Digital 😎'
        }));
      } else if (value === "Received JL") {
        console.log('Setting Received JL'); // Debugging
        setFormData(prevData => ({
          ...prevData,
          status: value,
          profile: prevData.profile ? prevData.profile : 'Digital 😎'
        }));
      }
    } else if (type === 'checkbox') {
      const target = e.target as HTMLInputElement;
      console.log('Setting Checkbox:', { name, checked: target.checked }); // Debugging
      setFormData(prevData => ({
        ...prevData,
        [name]: target.checked,
      }));
    } else {
      console.log('Setting Input:', { name, value }); // Debugging
      setFormData(prevData => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  return { formData, setFormData, handleInputChange };
};
