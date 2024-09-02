// src/types/candidate.ts
export interface Candidate {
  status: 'Waiting for JL (Received Offer)' | 'Received JL' | 'Candidate Batched';
  region: string;
  collegeName: string;
  lastUpdated: string;
  joiningDate?: string;
  location?: string;
  profile?: 'Digital 😎' | 'Ninja 🥲' | 'Prime 🤑';
  offerLetterReceivedMonth?: string;
  preferredLocation?: boolean
}
