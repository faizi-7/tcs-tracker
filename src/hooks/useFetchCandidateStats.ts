import { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../utils/firebase';
import { Candidate } from '../types';
import { calculateMonthsDifference } from '../utils/otherServices/calculateMonthDiff';
import { formatDateToMonth } from '../utils/otherServices/formatDate';

export const useFetchCandidateStats = (selectedCollege?: string, selectedRegion?:string) => {
  const [data, setData] = useState<{ profiles: any[]; statuses: any[]; total: any; monthlyJoinings: any[], averageWaiting: number }>({
    profiles: [],
    statuses: [],
    total: 0,
    monthlyJoinings: [],
    averageWaiting : 0
  });
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const candidatesCollection = collection(db, 'candidates');
          let q;

          if (selectedCollege) {
            q = query(candidatesCollection, where('collegeName', '==', selectedCollege));
          } else if (selectedRegion) {
            q = query(candidatesCollection, where('region', '==', selectedRegion));
          } else {
            q = candidatesCollection;
          }
        const snapshot = await getDocs(q);
        const candidates: Candidate[] = snapshot.docs.map((doc) => doc.data() as Candidate);

        let totalCandidate = 0;
        let waitingMonths= 0
        const profileCounts = {
          Ninja: 0,
          Digital: 0,
          Prime: 0,
        };

        const monthlyJoinings: Record<string, number> = {}

        const statusCounts = {
          'Waiting for JL (Received Offer)': 0,
          'Received JL': 0,
          'Candidate Batched': 0,
        };

        candidates.forEach((candidate) => {
          totalCandidate++;

          if (candidate.profile) {
            if (candidate.profile.includes('Ninja')) profileCounts.Ninja++;
            if (candidate.profile.includes('Digital')) profileCounts.Digital++;
            if (candidate.profile.includes('Prime')) profileCounts.Prime++;
          }

          if (candidate.status) {
            statusCounts[candidate.status]++;
          }

          if (candidate.joiningDate) {
            const joiningMonth = formatDateToMonth(candidate.joiningDate); // e.g., "Jan 2024"
            if (monthlyJoinings[joiningMonth]) {
              monthlyJoinings[joiningMonth]++;
            } else {
              monthlyJoinings[joiningMonth] = 1;
            }
          }
          if (candidate.joiningDate && candidate.offerLetterReceivedMonth) {
            waitingMonths += calculateMonthsDifference(candidate.offerLetterReceivedMonth, candidate.joiningDate);
          }
        });
        const averageDurationInMonths = statusCounts['Received JL'] > 0 ? waitingMonths / statusCounts['Received JL'] : 0;

        setData({
          profiles: [
            { name: 'Ninja 🥲', value: profileCounts.Ninja },
            { name: 'Digital 😎', value: profileCounts.Digital },
            { name: 'Prime 🤑', value: profileCounts.Prime },
          ],
          statuses: [
            { name: 'Offer Letter Received', value: statusCounts['Waiting for JL (Received Offer)'] },
            { name: 'Joining Letter Received', value: statusCounts['Received JL'] },
            { name: 'Candidate Batched', value: statusCounts['Candidate Batched'] },
          ],
          total: totalCandidate,
          monthlyJoinings: Object.entries(monthlyJoinings).map(([month, count]) => ({
            month,
            count,
          })),
          averageWaiting : averageDurationInMonths
        });
      } catch (err) {
        console.log(err);
      } finally {
        setDataFetched(true);
      }
    };

    fetchData();
  }, [selectedCollege, selectedRegion]); // Depend on selectedCollege to re-fetch when college changes

  return { data, dataFetched };
};
