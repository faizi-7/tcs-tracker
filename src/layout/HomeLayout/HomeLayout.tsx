import Footer from "../../components/footer/footer";
import Header from "../../components/header/header";
import styles from "./HomeLayout.module.css";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <>
      <Header />
      <div className={styles.container}>
        <main className={styles.content}>
          <Outlet />
        </main>
      <Footer />
      </div>
    </>
  );
}

export default MainLayout;
