import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";

function MainLayout() {
  return (
    <div className="app">
      <Header />
      <Outlet />
    </div>
  );
}

export default MainLayout;
