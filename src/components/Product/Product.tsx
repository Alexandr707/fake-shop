import { memo } from "react";
import { useSelector } from "react-redux";
import { ProductData } from "../../@types";
import { RootState } from "../../redux/store";
import AddBtn from "../AddBtn/AddBtn";
import RatingStars from "../RatingStars/RatingStars";
import st from "./Product.module.scss";

function Product({
  id,
  image,
  title,
  rating,
  price,
  description,
  category,
}: ProductData) {
  const countInCart = useSelector(
    (state: RootState) =>
      state.cart.products.find((el) => el.product.id === id)?.count || 0
  );
  return (
    <div className={st.product}>
      <div className={st.productWrap}>
        <div className={st.image}>
          <img src={image} alt={title} />
        </div>
        <h3 className={st.title} title={title}>
          {title}
        </h3>
        <p className={st.descr}>{description}</p>
        <div className={st.price}>
          Цена: <span className={st.cost}>{price}&nbsp;$</span>
          <AddBtn
            product={{
              id,
              image,
              title,
              rating,
              price,
              description,
              category,
            }}
            disableAdd={rating.count - countInCart < 1}
          />
        </div>
        <div className={st.rating}>
          <RatingStars rating={rating.rate} />{" "}
          <span>{rating.count - countInCart}</span>
        </div>
      </div>
    </div>
  );
}

export default memo(Product);
