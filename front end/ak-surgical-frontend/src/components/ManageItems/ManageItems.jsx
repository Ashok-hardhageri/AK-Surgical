import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ManageItems.css";

function ManageItems() {

    const navigate = useNavigate();

    const [showForm, setShowForm] = useState(false);

    const [itemCode, setItemCode] = useState("");
    const [itemName, setItemName] = useState("");
    const [price, setPrice] = useState("");

    const [selectedItems, setSelectedItems] = useState([]);
    const [editingItemId, setEditingItemId] = useState(null);

    const [items, setItems] = useState([]);

    const [searchTerm, setSearchTerm] = useState("");


    // Load surgical items from backend
    useEffect(() => {

        fetch("http://localhost:8080/surgical-items")
            .then((response) => {

                if (!response.ok) {
                    throw new Error("Failed to fetch surgical items");
                }

                return response.json();
            })
            .then((data) => {

                const formattedItems = data.map((item) => ({
                    id: item.id,
                    itemCode: item.itemCode,
                    itemName: item.name,
                    price: item.price
                }));

                setItems(formattedItems);
            })
            .catch((error) => {

                console.error(
                    "Error fetching surgical items:",
                    error
                );

            });

    }, []);


    // Edit button
    const handleEditItem = (item) => {

        setItemCode(item.itemCode);
        setItemName(item.itemName);
        setPrice(item.price);

        setEditingItemId(item.id);
        setShowForm(true);
    };


    // Delete button
    const handleDeleteItem = (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this surgical item?"
        );

        if (!confirmDelete) {
            return;
        }

        fetch(`http://localhost:8080/surgical-items/${id}`, {
            method: "DELETE"
        })
            .then((response) => {

                if (!response.ok) {
                    throw new Error("Failed to delete item");
                }

                setItems((previousItems) =>
                    previousItems.filter(
                        (item) => item.id !== id
                    )
                );

                // Remove deleted item from selected items
                setSelectedItems((previousSelectedItems) =>
                    previousSelectedItems.filter(
                        (item) => item.id !== id
                    )
                );

            })
            .catch((error) => {

                console.error(
                    "Error deleting surgical item:",
                    error
                );

            });
    };


    // Save / Update item
    const handleSaveItem = () => {

        if (
            itemCode.trim() === "" ||
            itemName.trim() === "" ||
            price === ""
        ) {
            alert("Please fill in all fields before saving.");
            return;
        }

        const itemData = {
            itemCode: itemCode,
            name: itemName,
            price: Number(price)
        };


        // UPDATE existing item
        if (editingItemId !== null) {

            fetch(
                `http://localhost:8080/surgical-items/${editingItemId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(itemData)
                }
            )
                .then((response) => {

                    if (!response.ok) {
                        throw new Error("Failed to update item");
                    }

                    return response.json();
                })
                .then((updatedItem) => {

                    const formattedItem = {
                        id: updatedItem.id,
                        itemCode: updatedItem.itemCode,
                        itemName: updatedItem.name,
                        price: updatedItem.price
                    };

                    setItems((previousItems) =>
                        previousItems.map((item) =>
                            item.id === editingItemId
                                ? formattedItem
                                : item
                        )
                    );

                    // Also update the selected item if it exists
                    setSelectedItems((previousSelectedItems) =>
                        previousSelectedItems.map((item) =>
                            item.id === editingItemId
                                ? formattedItem
                                : item
                        )
                    );

                    setItemCode("");
                    setItemName("");
                    setPrice("");

                    setEditingItemId(null);
                    setShowForm(false);
                })
                .catch((error) => {

                    console.error(
                        "Error updating surgical item:",
                        error
                    );

                });

            return;
        }


        // ADD new item
        fetch("http://localhost:8080/surgical-items", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(itemData)
        })
            .then((response) => {

                if (!response.ok) {
                    throw new Error("Failed to save item");
                }

                return response.json();
            })
            .then((savedItem) => {

                const formattedItem = {
                    id: savedItem.id,
                    itemCode: savedItem.itemCode,
                    itemName: savedItem.name,
                    price: savedItem.price
                };

                setItems((previousItems) => [
                    ...previousItems,
                    formattedItem
                ]);

                setItemCode("");
                setItemName("");
                setPrice("");

                setShowForm(false);
            })
            .catch((error) => {

                console.error(
                    "Error saving surgical item:",
                    error
                );

            });
    };


    // Cancel form
    const handleCancel = () => {

        setItemCode("");
        setItemName("");
        setPrice("");

        setEditingItemId(null);
        setShowForm(false);
    };


    // Open Add Item form
    const handleAddItem = () => {

        setItemCode("");
        setItemName("");
        setPrice("");

        setEditingItemId(null);
        setShowForm(true);
    };


    // Select item
    const handleSelectItem = (item) => {

        setSelectedItems((previousSelectedItems) => {

            // Prevent duplicate selection
            const alreadySelected = previousSelectedItems.some(
                (selectedItem) => selectedItem.id === item.id
            );

            if (alreadySelected) {
                return previousSelectedItems;
            }

            return [
                ...previousSelectedItems,
                item
            ];
        });
    };


    // Remove selected item
    const handleRemoveSelectedItem = (id) => {

        setSelectedItems((previousSelectedItems) =>
            previousSelectedItems.filter(
                (item) => item.id !== id
            )
        );
    };


    // Search operation
    const filteredItems = items.filter((item) => {

        const search = searchTerm.toLowerCase();

        return (
            item.itemCode.toLowerCase().includes(search) ||
            item.itemName.toLowerCase().includes(search)
        );
    });


    return (
        <div className="manage-items-page">


            {/* Header */}
            <div className="manage-items-header">

                <div>

                    <h1>
                        Manage Surgical Items
                    </h1>

                    <p>
                        Add, update and manage your surgical items.
                    </p>

                </div>


                <button
                    className="add-item-btn"
                    onClick={handleAddItem}
                >
                    + Add Item
                </button>

            </div>


            {/* Add / Edit Item Form */}
            {showForm && (

                <div className="add-item-form">

                    <h2>
                        {editingItemId !== null
                            ? "Edit Surgical Item"
                            : "Add Surgical Item"
                        }
                    </h2>


                    {/* Item Code */}
                    <div className="form-group">

                        <label>
                            Item Code
                        </label>

                        <input
                            type="text"
                            placeholder="Enter item code"
                            value={itemCode}
                            onChange={(e) =>
                                setItemCode(e.target.value)
                            }
                        />

                    </div>


                    {/* Item Name */}
                    <div className="form-group">

                        <label>
                            Item Name
                        </label>

                        <input
                            type="text"
                            placeholder="Enter item name"
                            value={itemName}
                            onChange={(e) =>
                                setItemName(e.target.value)
                            }
                        />

                    </div>


                    {/* Price */}
                    <div className="form-group">

                        <label>
                            Price
                        </label>

                        <input
                            type="number"
                            placeholder="Enter price"
                            value={price}
                            onChange={(e) =>
                                setPrice(e.target.value)
                            }
                        />

                    </div>


                    {/* Form Buttons */}
                    <div className="form-actions">

                        <button
                            className="cancel-btn"
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>


                        <button
                            className="save-btn"
                            onClick={handleSaveItem}
                        >
                            {editingItemId !== null
                                ? "Update Item"
                                : "Save Item"
                            }
                        </button>

                    </div>

                </div>
            )}


            {/* Search */}
            <div className="search-container">

                <input
                    type="text"
                    placeholder="Search by item code or item name"
                    value={searchTerm}
                    onChange={(e) =>
                        setSearchTerm(e.target.value)
                    }
                />

            </div>


            {/* Items Table */}
            <div className="items-table-container">

                <table className="items-table">

                    <thead>

                    <tr>

                        <th>
                            ID
                        </th>

                        <th>
                            Item Code
                        </th>

                        <th>
                            Item Name
                        </th>

                        <th>
                            Price
                        </th>

                        <th>
                            Action
                        </th>

                    </tr>

                    </thead>


                    <tbody>

                    {filteredItems.map((item) => (

                        <tr key={item.id}>

                            <td>
                                {item.id}
                            </td>

                            <td>
                                {item.itemCode}
                            </td>

                            <td>
                                {item.itemName}
                            </td>

                            <td>
                                ₹{item.price}
                            </td>

                            <td>

                                {/* Select */}
                                <button
                                    onClick={() =>
                                        handleSelectItem(item)
                                    }
                                >
                                    Select
                                </button>


                                {/* Edit */}
                                <button
                                    className="edit-btn"
                                    onClick={() =>
                                        handleEditItem(item)
                                    }
                                >
                                    Edit
                                </button>


                                {/* Delete */}
                                <button
                                    className="delete-btn"
                                    onClick={() =>
                                        handleDeleteItem(item.id)
                                    }
                                >
                                    Delete
                                </button>

                            </td>

                        </tr>

                    ))}

                    </tbody>

                </table>


                {/* Selected Items */}
                {selectedItems.length > 0 && (

                    <div>

                        <h3>
                            Selected Items
                        </h3>

                        {selectedItems.map((item) => (

                            <div key={item.id}>

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

                                <button
                                    onClick={() =>
                                        handleRemoveSelectedItem(item.id)
                                    }
                                >
                                    Remove
                                </button>

                                <hr />

                            </div>

                        ))}

                    </div>

                )}
                {selectedItems.length > 0 && (
                    <button
                        className="create-bill-btn"
                        onClick={() =>
                            navigate("/create-bill", {
                                state: {
                                    selectedItems: selectedItems
                                }
                            })
                        }
                    >
                        Create Bill
                    </button>
                )}
            </div>

        </div>
    );
}

export default ManageItems;