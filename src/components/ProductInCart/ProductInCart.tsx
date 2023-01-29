import clsx from "clsx";
import { ProductData } from "../../@types";
import {
  useAppDispatch,
  removeProduct,
  addProduct,
  subtractProduct,
} from "../../redux";
import st from "./ProductInCart.module.scss";

export type ProductInCartType = {
  product: ProductData;
  count: number;
};

function ProductInCart({ product, count }: ProductInCartType) {
  const dispatch = useAppDispatch();

  function onAddProduct(prod: ProductData) {
    dispatch(addProduct(prod));
  }

  function onSubtractProduct(prod: ProductData) {
    dispatch(subtractProduct(prod));
  }

  function onCloseButtonClick(prod: ProductData) {
    dispatch(removeProduct(prod));
  }

  return (
    <div className={st.product}>
      <div className={st.image}>
        <img src={product.image} alt={product.title} />
      </div>
      <div className={st.content}>
        <h3 className={st.title}>{product.title}</h3>
        <div className={st.quantity}>
          <span
            className={clsx(st.iconBtn, count < 1 && st.disabled)}
            onClick={() => onSubtractProduct(product)}
          >
            -
          </span>
          <span className={st.count}>{count}</span>
          <span
            className={clsx(
              st.iconBtn,
              count === product.rating.count && st.disabled
            )}
            onClick={() => onAddProduct(product)}
          >
            +
          </span>
        </div>
        <button
          className={st.closeIcon}
          onClick={() => onCloseButtonClick(product)}
        >
          <svg
            className={st.close}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g>
              <path d="M14.8,12l3.6-3.6c0.8-0.8,0.8-2,0-2.8c-0.8-0.8-2-0.8-2.8,0L12,9.2L8.4,5.6c-0.8-0.8-2-0.8-2.8,0   c-0.8,0.8-0.8,2,0,2.8L9.2,12l-3.6,3.6c-0.8,0.8-0.8,2,0,2.8C6,18.8,6.5,19,7,19s1-0.2,1.4-0.6l3.6-3.6l3.6,3.6   C16,18.8,16.5,19,17,19s1-0.2,1.4-0.6c0.8-0.8,0.8-2,0-2.8L14.8,12z" />
            </g>
          </svg>
        </button>
      </div>
    </div>
  );
}

export default ProductInCart;
