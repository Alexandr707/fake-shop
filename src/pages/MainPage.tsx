import { useEffect } from "react";
import { useSelector } from "react-redux";
import clsx from "clsx";

import { fetchProducts, RootState, useAppDispatch } from "../redux";
import { SelectCategorie, Product, ProductLoader } from "../components";
import { useScrollDown } from "../hooks/useScrollDown";
import "./MainPage.scss";

function MainPage() {
  const [isScrollDown, onScrollHandler] = useScrollDown();
  const dispatch = useAppDispatch();
  const { products, search } = useSelector((state: RootState) => state);

  let filtredProd =
    search.value.length > 0
      ? products.products.filter((el) =>
          el.title.toLowerCase().includes(search.value.toLowerCase())
        )
      : products.products;

  useEffect(() => {
    !products.products.length &&
      dispatch(fetchProducts(import.meta.env.VITE_STOREURL + "/products"));

    document.addEventListener("scroll", onScrollHandler);

    return () => {
      document.removeEventListener("scroll", onScrollHandler);
    };
  }, []);

  return (
    <>
      <div className={clsx("sideBar", isScrollDown && "scrolldown")}>
        <SelectCategorie />
      </div>
      <main className="main">
        <div className="app__wrapper">
          {products.status === "error" && (
            <h2 style={{ textAlign: "center" }}>
              Failed loading, code: {products.error}
            </h2>
          )}
          {products.status === "loading" &&
            new Array(6).fill("").map((al, i) => <ProductLoader key={i} />)}
          {products.status === "loaded" &&
            filtredProd.map((p) => <Product key={p.id} {...p} />)}
        </div>
      </main>
    </>
  );
}

export default MainPage;
