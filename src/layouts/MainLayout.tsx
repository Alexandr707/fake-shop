import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import { initCart, useAppDispatch } from "../redux";

function MainLayout() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initCart());
  }, []);

  return (
    <div className="app">
      <Header />
      <Outlet />
    </div>
  );
}

export default MainLayout;
