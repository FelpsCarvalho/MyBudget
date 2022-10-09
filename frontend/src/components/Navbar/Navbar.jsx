//STYLES
import styles from "../../styles/Navbar/Navbar.module.scss";

//COMPONENTS
import ListItemLink from "./ListItemLink";

//UTILS
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div className={styles.container}>
            <div className={styles.logo}>
                <Link to="/">
                    <div>MyBudget</div>
                </Link>
            </div>

            {/* NAV */}
            <nav>
                <ul>
                    {/* HOME */}
                    <ListItemLink url="">
                        <h3>Home</h3>
                    </ListItemLink>

                    {/* CATEGORIES */}
                    <ListItemLink url="categories">
                        <h3>Categorias</h3>
                    </ListItemLink>

                    {/* TRANSACTIONS */}
                    <ListItemLink url="transactions">
                        <h3>Transações</h3>
                    </ListItemLink>

                    {/* Wallet */}
                    <ListItemLink url="wallet">
                        <h3>Carteira</h3>
                    </ListItemLink>

                    {/* Profile */}
                    <div className={styles.mobileMenuLinks}>
                        <ListItemLink url="profile">
                            <h3>Perfil</h3>
                        </ListItemLink>
                    </div>

                    {/* Settings */}
                    <div className={styles.mobileMenuLinks}>
                        <ListItemLink url="settings">
                            <h3>Configurações</h3>
                        </ListItemLink>
                    </div>
                    <ListItemLink url="logout">
                        <h3>Logout</h3>
                    </ListItemLink>
                </ul>
            </nav>
        </div>
    );
};

export default Navbar;