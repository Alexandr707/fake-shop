import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { ProductData } from "../@types";
import { AddBtn, RatingStars } from "../components";
import { RootState } from "../redux";
import st from "./ProductPage.module.scss";

function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<ProductData>();
  const [error, setError] = useState<boolean>(false);
  const imageRef = useRef<HTMLDivElement>(null);
  const count = useSelector(
    (state: RootState) =>
      state.cart.products.find((p) => product && p.product.id === product.id)
        ?.count || 0
  );

  useEffect(() => {
    window.scrollTo({ behavior: "smooth", top: 0 });
  }, []);

  useEffect(() => {
    if (imageRef.current) {
      const $d = imageRef.current;
      const img = $d.children[0];
      const rect = img.getBoundingClientRect();
      $d.style.height = 400 / (rect.width / rect.height) + "px";
    }
  }, [imageRef.current]);

  useEffect(() => {
    if (id) {
      fetch(import.meta.env.VITE_STOREURL + `/products/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setProduct(data);
        })
        .catch((err) => {
          console.error(err);
          setError(true);
          const timerID = setTimeout(() => {
            navigate("/");
            clearTimeout(timerID);
          }, 10000);
        });
    }
  }, [id]);

  return (
    <div className={st.product}>
      <div className={st.wrapper}>
        {error && <h2 className={st.error}>Loading product fail</h2>}
        {product && (
          <>
            <div ref={imageRef} className={st.image}>
              <img src={product.image} alt={product.title} loading="lazy" />
            </div>
            <div className={st.content}>
              <h2 className={st.title}>{product.title}</h2>
              <div className={st.categorie}>{product.category}</div>
              <p className={st.description}>{product.description}</p>
              <table>
                <tbody>
                  <tr>
                    <td>Rate</td>
                    <td>{product.rating.rate}</td>
                  </tr>
                  <tr>
                    <td>Count</td>
                    <td>{product.rating.count - (count || 0)}</td>
                  </tr>
                  <tr>
                    <td>Price</td>
                    <td className={st.price}>{product.price}&nbsp;$</td>
                  </tr>
                </tbody>
              </table>
              <RatingStars rating={product.rating.rate} />
              <AddBtn
                product={product}
                disableAdd={Boolean(count > +product.rating.count)}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ProductPage;
