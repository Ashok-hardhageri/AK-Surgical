import { Routes, Route } from "react-router-dom";

import Layout from "./components/layout/Layout";

import Dashboard from "./components/Dashboard/Dashboard";
import CreateBill from "./components/CreateBill/CreateBill";
import ManageItems from "./components/ManageItems/ManageItems";
import BillPreview from "./components/BillPreview/BillPreview";
import ViewBills from "./components/ViewBills/ViewBills";

function App() {
    return (
        <Routes>

            {/* Common application layout */}
            <Route element={<Layout />}>

                {/* Application pages */}
                <Route path="/" element={<Dashboard />} />
                <Route path="/create-bill" element={<CreateBill />} />
                <Route path="/manage-items" element={<ManageItems />} />
                <Route path="/bill-preview" element={<BillPreview />} />
                <Route path="/view-bills" element={<ViewBills />} />

            </Route>

        </Routes>
    );
}

export default App;

