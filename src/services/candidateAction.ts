import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../utils/firebase";
import { Candidate } from "../types";
import { getCleanedData } from "../utils/otherServices/getCleanedData";
const getCandidate = async (id:string): Promise<Candidate | null> => {
  try {
    const candidateRef = doc(db, "candidates", id);

    const candidateSnap= await getDoc(candidateRef);
    if(candidateSnap.exists()) {
      console.log(candidateSnap.data())
      const candidateData = candidateSnap.data() as Candidate;
      return candidateData;
    } else {
      return null
    }

  } catch (error:any) {
    throw new Error(error.message || "Something Went Wrong")
  }
};
const saveCandidate = async (candidateData:Candidate, id:string) => {
  try {
    const cleanedData = getCleanedData(candidateData);
    const candidateRef = doc(db, "candidates", id);
    
    await setDoc(candidateRef, {...cleanedData, lastUpdated : new Date().toISOString().split('T')[0]});

    console.log("Candidate saved successfully");
  } catch (error) {
    console.error("Error saving candidate: ", error);
  }
};
const updateCandidate = async (candidateData:Candidate, id:string) => {
  try {
    const cleanedData = getCleanedData(candidateData);
    console.log(cleanedData)
    const candidateRef = doc(db, "candidates", id);

    await updateDoc(candidateRef, {...cleanedData, lastUpdated : new Date().toISOString().split('T')[0]});

    console.log("Candidate saved successfully");
  } catch (error) {
    console.error("Error saving candidate: ", error);
  }
};

export  {saveCandidate, getCandidate, updateCandidate};
