import "./ViewBills.css";

function ViewBills() {
    return (
        <div className="view-bills-page">

            <div className="view-bills-header">
                <h1>View Bills</h1>
                <p> </p>
                <p>Previously generated bills</p>
            </div>

            <div className="bills-table-container">

                <table className="bills-table">
                    <thead>
                    <tr>
                        <th>Bill No.</th>
                        <th>Bill Date</th>
                        <th>Total Amount</th>
                        <th>Actions</th>
                    </tr>
                    </thead>

                    <tbody>
                    <tr>
                        <td>000001</td>
                        <td>23/09/2026</td>
                        <td>₹268</td>
                        <td>
                            <button>View</button>
                            <button>Download</button>
                            <button>Edit</button>
                        </td>
                    </tr>
                    </tbody>
                </table>

            </div>

        </div>
    );
}

export default ViewBills;