import { ProdAmount } from ".";

export const totalPrice: (arr: ProdAmount[]) => number = (arr) => {
  const total = arr.reduce((acc, p) => {
    return p.product.price * p.count + acc;
  }, 0);

  return total;
};

export function saveToLs(key: string, arr: ProdAmount[]): void {
  localStorage.setItem(key, JSON.stringify(arr));
}

export function loadFromLs<T>(key: string): T {
  const res = JSON.parse(localStorage.getItem(key) || "[]");

  return res as T;
}
