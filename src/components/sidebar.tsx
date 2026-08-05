import { Link } from "react-router-dom";

type SidebarProps = {
    onLogout: () => void;
};

function Sidebar ({ onLogout }:
    SidebarProps){
        return (
                  <aside className="sidebar">

    <h2>KOC</h2>

    <div className="menu-section">
        <h4>MAIN</h4>

        <ul>

            <li>
                <Link className="admin-link" to="/Admin">📊 Dashboard</Link></li>

        </ul>
    </div>

    <div className="menu-section">
        <h4>WEBSITE</h4>

        <ul>

            <li>
                <Link className="admin-link" to="/features">
                    ⭐ Why Choose Us
                </Link>
            </li>

            <li>🛠 Services</li>

            <li>👥 Team</li>

            <li>🖼 Gallery</li>

            <li>💬 Testimonials</li>

            <li>❓ FAQ</li>

        </ul>

    </div>

    <div className="menu-section">

        <h4>BUSINESS</h4>

        <ul>

            <li>📨 Messages</li>

            <li>📅 Appointments</li>

        </ul>

    </div>

    <div className="menu-section">

        <h4>ACCOUNT</h4>

        <ul>

            <li>                <Link className="admin-link" to="/settings">⚙ Settings</Link></li>

            <li onClick={onLogout}>
                🚪 Logout
            </li>

        </ul>

    </div>

</aside>

        );
    }

    export default Sidebar;