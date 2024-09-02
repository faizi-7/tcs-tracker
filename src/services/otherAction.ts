import { getDocs, collection } from "firebase/firestore";
import { db } from "../utils/firebase";
import { Candidate } from "../types";

export const fetchCollegeList = async (): Promise<string[] | null> => {
  try {
    const collegesRef = collection(db, 'candidates');
  
    const querySnapshot = await getDocs(collegesRef);

    const collegeNames = new Set<string>();
  
    querySnapshot.forEach((doc) => {
      const data = doc.data() as Candidate;
      if (data.collegeName) {
        collegeNames.add(data.collegeName);
      }
    });
  
    return Array.from(collegeNames);
  } catch (error) {
    console.error("Error getting documents: ", error);
    return null;
  }
};
export const fetchRegionList = async (): Promise<string[] | null> => {
  try {
    const regionRef = collection(db, 'candidates');
  
    const querySnapshot = await getDocs(regionRef);

    const regionNames = new Set<string>();
  
    querySnapshot.forEach((doc) => {
      const data = doc.data() as Candidate;
      if (data.collegeName) {
        regionNames.add(data.region);
      }
    });
  
    return Array.from(regionNames);
  } catch (error) {
    console.error("Error getting documents: ", error);
    return null;
  }
};
