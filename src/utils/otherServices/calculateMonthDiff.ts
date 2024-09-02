export const calculateMonthsDifference = (offerLetterReceivedMonth: string, joiningDate: string): number => {
  const [offerYear, offerMonth] = offerLetterReceivedMonth.split('-').map(Number);
  const [joinYear, joinMonth] = [new Date(joiningDate).getFullYear(), new Date(joiningDate).getMonth() + 1];

  const yearDifference = joinYear - offerYear;
  const monthDifference = joinMonth - offerMonth;

  const totalMonths = yearDifference * 12 + monthDifference;

  return parseFloat(totalMonths.toFixed(1));
};
