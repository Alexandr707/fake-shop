import { useState, MouseEvent, useRef, memo } from "react";
// import lodash from "lodash/fp";
import st from "./RatingStars.module.scss";
import StarSvg from "./StarSvg";

type Rating = {
  rating: number;
};

function RatingStars({ rating }: Rating) {
  const [mouseRate, setMouseRate] = useState(0);
  const [isRateSelected, setIsRateSelected] = useState<boolean>(false);
  const rateRef = useRef<HTMLDivElement>(null);

  const d = Math.floor(mouseRate || rating);
  const f = (mouseRate || rating) - d;
  const ad = 5 - Math.ceil(mouseRate || rating);

  function mauseRateingHandler(e: MouseEvent<HTMLDivElement>) {
    if (rateRef.current) {
      if (e.type === "mousemove" || e.type === "click") {
        const x = getX(e.pageX, rateRef.current);

        !isRateSelected && setMouseRate(x);
        e.type === "click" && setIsRateSelected(() => true);
        e.type === "click" &&
          console.log("clicked rateselected-> ", isRateSelected);
      }
      if (e.type === "mouseleave" && !isRateSelected) {
        setMouseRate(0);
      }
    }
  }

  // const onMoveRating = lodash.debounce(50, mauseRateingHandler);

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
