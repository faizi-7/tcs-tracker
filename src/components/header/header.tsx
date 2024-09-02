import styles from './header.module.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const Header: React.FC = () => {
  const {currentUser, logout, loading}= useAuth()
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.brand}><Link to='/' className='link'>Track TCS Status</Link></div>
      <button
        className={styles.toggle}
        aria-label="Toggle navigation"
        onClick={toggleMenu}
      >
        ☰
      </button>
      {!loading &&

        <ul className={`${styles.menu} ${isOpen ? styles.menuOpen : ''}`}>
          <li className={styles.item}><Link to="/">Home</Link></li>
          <li className={styles.item}><Link to="/search">Search</Link></li>
          <li className={styles.item}><Link to="/create">Add Candidate Status</Link></li>
          {currentUser && <li className={styles.item}><Link to="/update">Update Candidate</Link></li>}
          {!currentUser ? <li className={styles.item}><Link to="/login">Login</Link></li> : <button onClick={() => logout()} className={styles.item + " logout"}>Logout</button>}
        </ul>
      }
    </nav>
  );
};

export default Header;