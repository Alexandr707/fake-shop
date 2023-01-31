import clsx from "clsx";
import { memo } from "react";
import { useSelector } from "react-redux";
import { ProductData } from "../../@types";
import {
  RootState,
  useAppDispatch,
  addProduct,
  removeProduct,
  subtractProduct,
} from "../../redux/";

import st from "./AddBtn.module.scss";

export type AddType = {
  product: ProductData;
  disableAdd?: boolean;
};

function AddBtn({ product, disableAdd = false }: AddType) {
  const dispatch = useAppDispatch();
  const prod = useSelector((state: RootState) =>
    state.cart.products.find((el) => el.product.id === product.id)
  );

  if (prod && prod.count < 1) {
    dispatch(removeProduct(product));
  }

  function onClickAddProd() {
    dispatch(addProduct(product));
  }

  function onClickSubtractProd() {
    dispatch(subtractProduct(product));
  }

  return (
    <div className={clsx(st.btnContainer, prod && st.selected)}>
      <div className={st.btn} onClick={onClickAddProd}>
        <span className={st.btnText}>Buy</span>
      </div>
      {prod && (
        <div className={st.countContainer}>
          <div
            className={clsx(st.iconBtn, st.minus)}
            onClick={onClickSubtractProd}
          >
            -
          </div>
          <div className={st.quantity}>{prod.count}</div>
          <div
            className={clsx(st.iconBtn, st.plus, disableAdd && st.disabled)}
            onClick={onClickAddProd}
          >
            +
          </div>
        </div>
      )}
    </div>
  );
}

export default memo(AddBtn);
