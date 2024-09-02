import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useFetchCandidateStats } from "../../../hooks/useFetchCandidateStats";
import styles from "./RegionStats.module.css";
import Loader from "../../Loader/Loader";
import { fetchRegionList } from "../../../services/otherAction";

export default function RegionStats() {
  const [regionList, setRegionList] = useState<string[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<string>("All Regions");
  const { data, dataFetched } = useFetchCandidateStats(
    undefined,
    selectedRegion === "All Regions" ? undefined : selectedRegion
  );
  useEffect(() => {
    async function fetch() {
      const regionList = await fetchRegionList();
      if (regionList) setRegionList(["All Regions", ...regionList]);
    }
    fetch();
  }, []);
  if (!dataFetched) {
    return <Loader />; // Display a loading message or spinner
  }

  return (
    <div className={styles.container}>
      <h2>Region Wise Stats</h2>
      <div className="card">
        <label htmlFor="college-select" className={styles.label}>
          Select Region:{" "}
        </label>
        <div className={styles.selectWrapper}>
          <select
            id="college-select"
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className={styles.select}
          >
            {regionList.map((region) => (
              <option key={region} value={region} className={styles.option}>
                {region}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.numberStats}>
        <div className="card">
          Total Candidates : <b>{data.total}</b>
        </div>
        <div className="card">
          Average Waiting : <b>{data.averageWaiting}</b> Months
        </div>
      </div>
      <div className={styles.chartContainer}>
        <div className={styles.chart}>
          <p className={styles.subHeading}>Distribution by Profile</p>
          <ResponsiveContainer width={300} height={300}>
            <PieChart>
              <Pie
                dataKey="value"
                isAnimationActive={false}
                data={data.profiles}
                cx="50%"
                cy="50%"
                outerRadius={80}
                className={styles.pieChart}
                label
              />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className={styles.chart}>
          <p className={styles.subHeading}>Distribution by Status</p>
          <ResponsiveContainer width={300} height={300}>
            <PieChart>
              <Pie
                dataKey="value"
                isAnimationActive={false}
                data={data.statuses}
                cx="50%"
                cy="50%"
                outerRadius={80}
                className={styles.pieChart}
                label
              />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className={styles.chart}>
        <p className={styles.subHeading}>Monthly Onboarding</p>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data.monthlyJoinings}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend className={styles.pieChart} />
            <Bar dataKey="count" fill="#FFC55A" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      {/* <div className="divider"></div> */}
    </div>
  );
}
