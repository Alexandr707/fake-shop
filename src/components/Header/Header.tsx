import clsx from "clsx";
import { memo, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useScrollDown } from "../../hooks/useScrollDown";
import { RootState } from "../../redux/store";
import SearchInput from "../SearchInput/SearchInput";
import st from "./Header.module.scss";

function Header({}) {
  const [isScrollDown, onScrollHandler] = useScrollDown();
  const totalPrice = useSelector((state: RootState) => state.cart.total);

  useEffect(() => {
    document.addEventListener("scroll", onScrollHandler);

    return () => {
      document.removeEventListener("scroll", onScrollHandler);
    };
  }, []);

  return (
    <div className={clsx(st.header, isScrollDown && st.scrollDown)}>
      <div className={st.logo}>
        <img src="/logo.png" alt="store logo" />
      </div>
      <SearchInput />
      <div>total: {totalPrice.toFixed(2)}</div>
    </div>
  );
}

export default memo(Header);
