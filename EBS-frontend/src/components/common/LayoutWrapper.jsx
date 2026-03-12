import { useAuth } from "../../hooks/useAuth";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

export default function LayoutWrapper({ children }) {
  const { auth } = useAuth();
  if (!auth) return <>{children}</>;
  return (
    <div style={{ display:"flex", flexDirection:"column", minHeight:"100vh" }}>
      <Header />
      <div style={{ display:"flex", flex:1 }}>
        <Sidebar />
        <main className="layout-main">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
}
