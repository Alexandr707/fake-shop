// import StarSvg from "../../assets/star.svg";
import { useEffect, useState, MouseEvent, useRef, memo } from "react";
import lodash from "lodash/fp";
import st from "./RatingStars.module.scss";
import StarSvg from "./StarSvg";

type Rating = {
  rating: number;
};

function RatingStars({ rating }: Rating) {
  const [rate, setRate] = useState<number>(0);
  const [mouseRate, setMouseRate] = useState(0);
  const [isRateSelected, setIsRateSelected] = useState<boolean>(false);
  const rateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setRate(rating);
  }, [rating]);

  const d = Math.floor(mouseRate || rate);
  const f = (mouseRate || rate) - d;
  const ad = 5 - Math.ceil(mouseRate || rate);

  function mauseRateingHandler(e: MouseEvent<HTMLDivElement>) {
    if (rateRef.current) {
      if (e.type === "mousemove" || e.type === "click") {
        const x = getX(e.pageX, rateRef.current);
        setMouseRate(x);
        e.type === "click" && setIsRateSelected(true);
      }
      if (e.type === "mouseleave" && !isRateSelected) {
        setMouseRate(0);
      }
    }
  }

  const onMoveRating = lodash.debounce(50, mauseRateingHandler);

  return (
    <div
      ref={rateRef}
      className={st.rating}
      onClick={mauseRateingHandler}
      onMouseMove={mauseRateingHandler}
      onMouseLeave={mauseRateingHandler}
    >
      {d > 0 &&
        new Array(d).fill("").map((_, i) => <StarSvg key={i} percent={1} />)}
      {f > 0 && <StarSvg percent={f} />}
      {ad > 0 &&
        new Array(ad).fill("").map((_, i) => <StarSvg key={i} percent={0} />)}
    </div>
  );
}

export default memo(RatingStars);

function getX(
  pageX: number,
  node: HTMLElement,
  starsCount: number = 5
): number {
  const rect = node.getBoundingClientRect();
  let x = pageX - rect.left - window.pageXOffset;
  x < 0 && (x = 0);

  return Math.ceil((starsCount * x) / rect.width);
}
