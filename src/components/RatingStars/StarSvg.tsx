import { useEffect, useRef, useState } from "react";
import { nanoid } from "nanoid";
import st from "./Star.module.scss";

type StarOptions = {
  percent: number;
  width?: number;
  height?: number;
};

function StarSvg({ percent, width = 20, height = 20 }: StarOptions) {
  const [id] = useState(() => nanoid());
  const starRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (starRef.current) {
      starRef.current.style.width = width + "px";
      starRef.current.style.height = height + "px";
    }
  }, []);

  return (
    <div ref={starRef} className={st.star}>
      <svg
        className={st.starContur}
        viewBox="0 0 35 35"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M32,10H20L16,0l-4,10H0l8,10L4,32l12-7l12,7l-4-12L32,10 Z" />
      </svg>
      {percent > 0 && (
        <svg
          className={st.starFill}
          viewBox="0 0 35 35"
          xmlns="http://www.w3.org/2000/svg"
        >
          <clipPath id={id}>
            <path d="M32,10H20L16,0l-4,10H0l8,10L4,32l12-7l12,7l-4-12L32,10 Z" />
          </clipPath>
          <rect clipPath={`url(#${id})`} width={35 * percent} height="35" />
        </svg>
      )}
    </div>
  );
}

export default StarSvg;
