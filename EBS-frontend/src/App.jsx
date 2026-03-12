import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { UserProvider } from "./context/UserContext";
import AppRoutes from "./routes/AppRoutes";
import LayoutWrapper from "./components/common/LayoutWrapper";
import "./assets/styles/global.css";

export default function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <BrowserRouter>
          <LayoutWrapper>
            <AppRoutes />
          </LayoutWrapper>
        </BrowserRouter>
      </UserProvider>
    </AuthProvider>
  );
}
