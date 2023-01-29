import clsx from "clsx";
import { memo, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useScrollDown } from "../../hooks/useScrollDown";
import { RootState } from "../../redux/";
import { CartBtn, SearchInput } from "..";
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
      <Link to="/">
        <div className={st.logo}>
          <img src="/logo.png" alt="store logo" />
        </div>
      </Link>
      <SearchInput />
      <CartBtn>{totalPrice}</CartBtn>
    </div>
  );
}

export default memo(Header);
