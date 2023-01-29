import { useSelector } from "react-redux";
import { ProductInCart } from "../components";
import { RootState } from "../redux";
import st from "./CartPage.module.scss";

function CartPage() {
  const cart = useSelector((state: RootState) => state.cart);
  const products = cart.products;

  return (
    <div className={st.cart}>
      {products.map((pr) => (
        <ProductInCart
          key={pr.product.id}
          product={pr.product}
          count={pr.count}
        />
      ))}
    </div>
  );
}

export default CartPage;
