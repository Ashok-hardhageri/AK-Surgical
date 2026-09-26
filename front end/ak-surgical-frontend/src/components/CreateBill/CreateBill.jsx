import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./CreateBill.css";

function CreateBill() {
    const navigate = useNavigate();
    const location = useLocation();

    const selectedItems =
        location.state?.selectedItems || [];


    // Store quantity for each item
    const [quantities, setQuantities] = useState(
        () => {
            const initialQuantities = {};

            selectedItems.forEach((item) => {
                initialQuantities[item.id] = 1;
            });

            return initialQuantities;
        }
    );


    const [billResponse, setBillResponse] = useState(null);


    // Handle quantity change
    const handleQuantityChange = (itemId, value) => {

        setQuantities((previousQuantities) => ({
            ...previousQuantities,
            [itemId]: value
        }));

    };


    // Calculate Bill
    const handleCalculateBill = () => {

        const billRequest = {
            items: selectedItems.map((item) => ({
                itemId: item.id,
                quantity: Number(quantities[item.id])
            }))
        };


        console.log("Bill Request:", billRequest);


        fetch("http://localhost:8080/bills", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(billRequest)
        })
            .then((response) => {

                if (!response.ok) {
                    throw new Error("Failed to calculate bill");
                }

                return response.json();
            })
            .then((data) => {

                console.log("Bill Response:", data);

                setBillResponse(data);

            })
            .catch((error) => {

                console.error(
                    "Error calculating bill:",
                    error
                );

            });
    };


    return (

        <div>

            <h2>Create Bill</h2>


            {selectedItems.length > 0 ? (

                <div>

                    <div className="selected-items-section">

                        <h3>Selected Items</h3>


                        {selectedItems.map((item) => (

                            <div
                                key={item.id}
                                className="selected-item-card"
                            >

                            <p>
                                <strong>Item Code:</strong>{" "}
                                {item.itemCode}
                            </p>


                            <p>
                                <strong>Item Name:</strong>{" "}
                                {item.itemName}
                            </p>


                            <p>
                                <strong>Price:</strong>{" "}
                                ₹{item.price}
                            </p>


                            <div>

                                <label>
                                    <strong>
                                        Quantity:
                                    </strong>{" "}
                                </label>


                                <input
                                    type="number"
                                    min="1"
                                    value={quantities[item.id]}
                                    onChange={(e) =>
                                        handleQuantityChange(
                                            item.id,
                                            e.target.value
                                        )
                                    }
                                />

                            </div>


                            <hr />

                        </div>

                    ))}
                    </div>

                    <button
                        className="calculate-bill-btn"
                        onClick={handleCalculateBill}>
                        Calculate Bill
                    </button>


                    {billResponse && (

                        <div>

                            <div className="bill-details-section">

                                <h3>Bill Details</h3>


                            {billResponse.items.map((item) => (

                                <div key={item.itemId}>

                                    <p>
                                        <strong>
                                            Item:
                                        </strong>{" "}
                                        {item.itemName}
                                    </p>


                                    <p>
                                        <strong>
                                            Price:
                                        </strong>{" "}
                                        ₹{item.price}
                                    </p>


                                    <p>
                                        <strong>
                                            Quantity:
                                        </strong>{" "}
                                        {item.quantity}
                                    </p>


                                    <p>
                                        <strong>
                                            Item Total:
                                        </strong>{" "}
                                        ₹{item.itemTotal}
                                    </p>

                                </div>

                            ))}


                            <hr />


                            <h3>
                                Grand Total: ₹
                                {billResponse.totalAmount}
                            </h3>
                            </div>
                        </div>

                    )}

                </div>

            ) : (

                <p>
                    No items selected.
                </p>

            )}
            <button
                className="bill-preview-btn"
                onClick={() => navigate("/bill-preview", { state: { billResponse } })}
            >
                Bill Preview
            </button>
            <button
                className="back-btn"
                onClick={() => navigate("/manage-items")}
            >
                Back to Manage Items
            </button>

        </div>

    );
}

export default CreateBill;