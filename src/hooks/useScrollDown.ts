import { useRef, useState } from "react";

export function useScrollDown(): [boolean, () => void] {
  const anchor = useRef<number>(0);
  const [isScrollDown, setIsScrollDown] = useState<boolean>(false);

  function onScrollHandler() {
    if (window.scrollY > anchor.current) {
      anchor.current = window.scrollY;
      setIsScrollDown(true);
    } else if (window.scrollY < anchor.current) {
      anchor.current = window.scrollY;
      setIsScrollDown(false);
    }
  }
  return [isScrollDown, onScrollHandler];
}
