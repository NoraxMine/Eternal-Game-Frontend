import { Outlet } from "react-router-dom";
import User_Header from "./User/User_Header";     
import Admin_Header from "./Admin/Admin_Header";       
import Footer from "./Footer";

function Layout({ user, onLogout }) {
  return (
    <>
      {user.role === "admin" ? (
        <Admin_Header user={user} onLogout={onLogout} />
      ) : (
        <User_Header user={user} onLogout={onLogout} />
      )}

      <div>
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default Layout;