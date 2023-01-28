import { memo, useEffect } from "react";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { fetchCategories, setCategorie } from "../../redux/categories";
import { RootState, useAppDispatch } from "../../redux/store";
import { fetchProducts } from "../../redux/productsSlice";
import { clearSearchValue } from "../../redux/searchSlice";

import st from "./SelectCategorie.module.scss";

function SelectCategorie() {
  const dispatch = useAppDispatch();
  const categories = useSelector((state: RootState) => state.categorie);

  useEffect(() => {
    dispatch(
      fetchCategories(import.meta.env.VITE_STOREURL + "/products/categories")
    );
  }, []);

  function onCategorieChange(c: number) {
    if (c !== categories.current) {
      dispatch(setCategorie(c));
      dispatch(clearSearchValue());

      if (categories.list[c] === "All") {
        dispatch(
          fetchProducts(
            `
            ${import.meta.env.VITE_STOREURL}/products
            `.trim()
          )
        );
      } else {
        dispatch(
          fetchProducts(
            `
            ${import.meta.env.VITE_STOREURL}/products/category/${
              categories.list[c]
            }
            `
              .trim()
              .replaceAll(" ", "%20")
          )
        );
      }
    }
  }

  return (
    <div className={st.categorie}>
      <h2 className={st.title}>Categories</h2>
      {categories.list.length === 0 && (
        <div className={st.loading}>Loading ...</div>
      )}
      <ul>
        {categories.list.map((el, i) => (
          <li
            key={el}
            className={clsx(
              st.categoryItem,
              i === categories.current && st.active
            )}
            onClick={() => {
              onCategorieChange(i);
            }}
          >
            {el}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default memo(SelectCategorie);
