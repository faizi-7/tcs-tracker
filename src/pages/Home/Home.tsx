import HeroSection from '../../components/HeroSection/HeroSection'
import CandidateStats from '../../components/Stats/CandidateStats/CandidateStats'
import CollegeStats from '../../components/Stats/CollegeStats/CollegeStats'
import RegionStats from '../../components/Stats/RegionStats/RegionStats'
import styles from './Home.module.css'
export default function Home() {
  return <div className={styles.container}>
    <HeroSection/>
    
    <CandidateStats/>
    <CollegeStats/>
    <RegionStats/>
  </div>
}