import "./Dashboard.css";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const navigate = useNavigate();
    return (
        <div className="dashboard">

            <header className="dashboard-header">
                <h2>AK SURGICAL</h2>

                <button className="logout-button">
                    Logout
                </button>
            </header>

                <main className="dashboard-content">
                    <h1>Welcome to AK Surgical</h1>

                    <div className="dashboard-cards">

                        <button
                            className="dashboard-card"
                            onClick={() => navigate("/create-bill")}
                        >
                            <h3>Create Bill</h3>
                            <p>Select surgical items and generate a bill.</p>
                        </button>

                        <button
                            className="dashboard-card"
                            onClick={() => navigate("/manage-items")}
                        >
                            <h3>Manage Items</h3>
                            <p>Add, update and manage surgical items.</p>
                        </button>

                        <button
                            className="dashboard-card"
                            onClick={() => navigate("/view-bills")}
                        >
                            <h3>View Bills</h3>
                            <p>View previously generated bills.</p>
                        </button>

                    </div>
                </main>

        </div>
    );
}

export default Dashboard;