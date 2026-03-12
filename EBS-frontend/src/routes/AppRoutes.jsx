import { Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

import Landing from "../pages/Landing";
import Login from "../pages/auth/Login";
import Logout from "../pages/auth/Logout";
import VirtualATM from "../pages/atm/VirtualATM";
import Dashboard from "../pages/dashboard/Dashboard";
import AccountSummaryPage from "../pages/accounts/AccountSummaryPage";
import AccountDetails from "../pages/accounts/AccountDetails";
import TransactionHistory from "../pages/transactions/TransactionHistory";
import TransactionDetail from "../pages/transactions/TransactionDetail";
import FundTransfer from "../pages/transfers/FundTransfer";
import BeneficiaryListPage from "../pages/beneficiaries/BeneficiaryListPage";
import AddBeneficiary from "../pages/beneficiaries/AddBeneficiary";
import FixedDeposit from "../pages/deposits/FixedDeposit";
import AccountStatement from "../pages/statements/AccountStatement";
import UpdatePassword from "../pages/profile/UpdatePassword";
import UpdateProfile from "../pages/profile/UpdateProfile";
import CreateCustomer from "../pages/admin/CreateCustomer";
import ForgotPassword from "../pages/auth/ForgotPassword";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Logout />} />

      {/* Protected — Customer */}
      <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      <Route path="/accounts" element={<PrivateRoute><AccountSummaryPage /></PrivateRoute>} />
      <Route path="/accounts/:accountId" element={<PrivateRoute><AccountDetails /></PrivateRoute>} />
      <Route path="/transactions" element={<PrivateRoute><TransactionHistory /></PrivateRoute>} />
      <Route path="/transactions/:transactionId" element={<PrivateRoute><TransactionDetail /></PrivateRoute>} />
      <Route path="/transfer" element={<PrivateRoute><FundTransfer /></PrivateRoute>} />
      <Route path="/beneficiaries" element={<PrivateRoute><BeneficiaryListPage /></PrivateRoute>} />
      <Route path="/beneficiaries/add" element={<PrivateRoute><AddBeneficiary /></PrivateRoute>} />
      <Route path="/deposits" element={<PrivateRoute><FixedDeposit /></PrivateRoute>} />
      <Route path="/statements" element={<PrivateRoute><AccountStatement /></PrivateRoute>} />
      <Route path="/profile/password" element={<PrivateRoute><UpdatePassword /></PrivateRoute>} />
      <Route path="/profile/update" element={<PrivateRoute><UpdateProfile /></PrivateRoute>} />
      <Route path="/atm" element={<PrivateRoute><VirtualATM /></PrivateRoute>} />
      <Route path="/" element={<Landing />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Protected — Admin only (role guard is inside the page) */}
      <Route path="/admin/customers/create" element={<PrivateRoute><CreateCustomer /></PrivateRoute>} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
