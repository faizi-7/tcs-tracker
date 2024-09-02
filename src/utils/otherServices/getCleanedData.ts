import { Candidate } from "../../types";

export const getCleanedData = (formData: Candidate) => {
  const cleanedData: Partial<Candidate> = { ...formData };
  const cleanString = (value: string) => {
    return value.toLowerCase().trim().replace(/\s+/g, ' ');
  };
  if (cleanedData.region) {
    cleanedData.region = cleanString(cleanedData.region);
    if(cleanedData.region == 'new delhi')
      cleanedData.region= 'delhi'
  }
  
  if (cleanedData.location) {
    cleanedData.location = cleanString(cleanedData.location);
    if(cleanedData.location == 'new delhi')
      cleanedData.location= 'delhi'
  }

  if (cleanedData.collegeName) {
    cleanedData.collegeName = cleanString(cleanedData.collegeName);
  }
  Object.keys(cleanedData).forEach(key => {
    const value = cleanedData[key as keyof Candidate];
    if (value === undefined || value === null || value === '') {
      delete cleanedData[key as keyof Candidate];
    }
  });

  return cleanedData;
};
