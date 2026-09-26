import { useLocation } from "react-router-dom";
import jsPDF from "jspdf";
import "./BillPreview.css";

function BillPreview() {
    const location = useLocation();
    const { billResponse } = location.state || {};

    const getNextBillNumber = () => {
        const lastNumber = Number(
            localStorage.getItem("akSurgicalBillNumber") || "0"
        );

        const nextNumber = lastNumber + 1;

        localStorage.setItem(
            "akSurgicalBillNumber",
            String(nextNumber)
        );

        return String(nextNumber).padStart(6, "0");
    };

    const downloadPDF = () => {
        const billNumber = getNextBillNumber();

        const doc = new jsPDF();

        const pageWidth = doc.internal.pageSize.getWidth();

        // Header
        doc.setFontSize(20);
        doc.setFont("helvetica", "bold");
        doc.text("AK SURGICAL", pageWidth / 2, 20, {
            align: "center"
        });

        doc.setFontSize(11);
        doc.setFont("helvetica", "normal");
        doc.text("Surgical Items & Supplies", pageWidth / 2, 28, {
            align: "center"
        });

        // Bill information
        doc.setFontSize(11);

        doc.text(`Bill No.: ${billNumber}`, 20, 42);

        doc.text(
            `Bill Date: ${new Date().toLocaleDateString("en-IN")}`,
            20,
            50
        );

        doc.text("GST No.: XXXXXXXX", 20, 58);

        // Title
        doc.setFontSize(16);
        doc.setFont("helvetica", "bold");
        doc.text("Bill Preview", 20, 72);

        // Line
        doc.setLineWidth(0.5);
        doc.line(20, 77, pageWidth - 20, 77);

        // Table header
        let y = 88;

        doc.setFontSize(11);
        doc.setFont("helvetica", "bold");

        doc.text("Item", 20, y);
        doc.text("Price", 95, y);
        doc.text("Quantity", 125, y);
        doc.text("Amount", 165, y);

        // Line below header
        doc.line(20, y + 4, pageWidth - 20, y + 4);

        // Items
        y += 14;

        doc.setFont("helvetica", "normal");

        billResponse?.items?.forEach((item) => {
            doc.text(String(item.itemName), 20, y);

            doc.text(`Rs. ${item.price}`, 95, y);

            doc.text(String(item.quantity), 130, y);

            doc.text(`Rs. ${item.itemTotal}`, 165, y);

            y += 10;
        });

        // Line before total
        doc.line(20, y, pageWidth - 20, y);

        y += 12;

        // Total
        doc.setFontSize(13);
        doc.setFont("helvetica", "bold");

        doc.text(
            `Total Amount: Rs. ${billResponse?.totalAmount}`,
            20,
            y
        );

        // Footer
        y += 25;

        doc.setFontSize(11);
        doc.setFont("helvetica", "normal");

        doc.text(
            "Thank you for your business!",
            pageWidth / 2,
            y,
            {
                align: "center"
            }
        );

        doc.setFont("helvetica", "bold");

        doc.text(
            "AK SURGICAL",
            pageWidth / 2,
            y + 8,
            {
                align: "center"
            }
        );

        // Download
        doc.save(`AK-Surgical-Bill-${billNumber}.pdf`);
    };

    return (
        <div className="bill-preview-page">
            <div className="bill-container">

                <div className="bill-header">
                    <h1>AK SURGICAL</h1>
                    <p>Surgical Items & Supplies</p>
                </div>

                <div className="bill-info">
                    <p>
                        <strong>Bill Date:</strong>{" "}
                        {new Date().toLocaleDateString("en-IN")}
                    </p>

                    <p>
                        <strong>GST No.:</strong> XXXXXXXX
                    </p>
                </div>

                <h2>Bill Preview</h2>

                <hr />

                <table className="bill-table">
                    <thead>
                    <tr>
                        <th>Item</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Amount</th>
                    </tr>
                    </thead>

                    <tbody>
                    {billResponse?.items?.map((item) => (
                        <tr key={item.itemId}>
                            <td>{item.itemName}</td>
                            <td>₹{item.price}</td>
                            <td>{item.quantity}</td>
                            <td>₹{item.itemTotal}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                <div className="bill-total">
                    <strong>
                        Total Amount: ₹{billResponse?.totalAmount}
                    </strong>
                </div>

                <div className="bill-actions">
                    <button onClick={downloadPDF}>
                        Download PDF
                    </button>

                    <button onClick={() => window.history.back()}>
                        Back
                    </button>
                </div>

                <div className="bill-footer">
                    <p>Thank you for your business!</p>
                    <p>AK SURGICAL</p>
                </div>

            </div>
        </div>
    );
}

export default BillPreview;