import { NavLink } from "react-router-dom";

function Header() {
    return (
        <header className="app-header">

            <div className="header-title">
                <h2>AK Surgical</h2>
            </div>

            <nav className="header-navigation">

                <NavLink to="/">
                    Dashboard
                </NavLink>

                <NavLink to="/manage-items">
                    Manage Items
                </NavLink>

                <NavLink to="/create-bill">
                    Create Bill
                </NavLink>

            </nav>

            <div className="header-actions">
                <span>Admin</span>
                <button>Logout</button>
            </div>

        </header>
    );
}

export default Header;

