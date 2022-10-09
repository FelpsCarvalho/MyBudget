//STYLES
import styles from "../../styles/Navbar/MobileNavbar.module.scss";
import { FaTimes, FaBars } from "react-icons/fa";

//COMPONENTS
import ListItemLink from "./ListItemLink";

//UTILS
import { useState, useEffect } from "react";

const MobileNavbar = () => {
  const [navOpen, setNavOpen] = useState(false);

  const closeNav = () => {
    setNavOpen(false);
  };

  return (
    <div className={styles.container}>
      <div>
        {/* BARS */}
        <div
          className={`${styles.iconContainer} ${styles.bars}`}
          onClick={() => setNavOpen(true)}
        >
          <FaBars />
        </div>

        {/* NAV */}
        <nav className={navOpen ? styles.navActive : undefined}>
          <ul>
            {/* TIMES */}
            <div
              className={`${styles.iconContainer} ${styles.times}`}
              onClick={() => setNavOpen(false)}
            >
              <FaTimes />
            </div>

            {/* HOME */}
            <ListItemLink
              url=""
              optionClass={styles.linkColor}
              clickHandler={closeNav}
            >
              <h3>Home</h3>
            </ListItemLink>

            {/* CATEGORIES */}
            <ListItemLink
              url="categories"
              optionClass={styles.linkColor}
              clickHandler={closeNav}
            >
              <h3>Categorias</h3>
            </ListItemLink>

            {/* TRANSACTIONS */}
            <ListItemLink
              url="transactions"
              optionClass={styles.linkColor}
              clickHandler={closeNav}
            >
              <h3>Transações</h3>
            </ListItemLink>

            {/* Wallet */}
            <ListItemLink
              url="wallet"
              optionClass={styles.linkColor}
              clickHandler={closeNav}
            >
              <h3>Carteira</h3>
            </ListItemLink>

            {/* Profile */}
            <div className={styles.mobileMenuLinks}>
              <ListItemLink
                url="profile"
                optionClass={styles.linkColor}
                clickHandler={closeNav}
              >
                <h3>Perfil</h3>
              </ListItemLink>
            </div>

            {/* Settings */}
            <div className={styles.mobileMenuLinks}>
              <ListItemLink
                url="settings"
                optionClass={styles.linkColor}
                clickHandler={closeNav}
              >
                <h3>Configurações</h3>
              </ListItemLink>
            </div>

            {/* AUTH MENU */}
            <ListItemLink url="logout" optionClass={styles.linkColor}>
              <h3>Logout</h3>
            </ListItemLink>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default MobileNavbar;