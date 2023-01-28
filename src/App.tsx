import { useEffect } from "react";
import { useSelector } from "react-redux";
import clsx from "clsx";

import { fetchProducts } from "./redux/productsSlice";
import { RootState, useAppDispatch } from "./redux/store";

import SelectCategorie from "./components/SelectCategorie/SelectCategorie";
import Product from "./components/Product/Product";
import Header from "./components/Header/Header";
import ProductLoader from "./components/Product/ProductsLoader";
import { useScrollDown } from "./hooks/useScrollDown";
import "./App.scss";
import { initCart } from "./redux/cartslice";

function App() {
  const [isScrollDown, onScrollHandler] = useScrollDown();
  const dispatch = useAppDispatch();
  const { products, cart, categorie, search } = useSelector(
    (state: RootState) => state
  );

  let filtredProd =
    search.value.length > 0
      ? products.products.filter((el) =>
          el.title.toLowerCase().includes(search.value.toLowerCase())
        )
      : products.products;

  useEffect(() => {
    dispatch(fetchProducts(import.meta.env.VITE_STOREURL + "/products"));
    dispatch(initCart());

    document.addEventListener("scroll", onScrollHandler);

    return () => {
      document.removeEventListener("scroll", onScrollHandler);
    };
  }, []);

  return (
    <div className="app">
      <Header />

      <div className={clsx("sideBar", isScrollDown && "scrolldown")}>
        <SelectCategorie />
      </div>
      <main className="main">
        <div className="app__wrapper">
          {products.status === "loading" &&
            new Array(6).fill("").map((al, i) => <ProductLoader key={i} />)}
          {products.status === "loaded" &&
            filtredProd.map((p) => <Product key={p.id} {...p} />)}
        </div>
      </main>
    </div>
  );
}

export default App;
