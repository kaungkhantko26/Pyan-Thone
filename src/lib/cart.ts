"use client";

import { useEffect, useState } from "react";
import type { Product } from "./data";

const KEY = "pyt.cart";
const EVT = "pyt.cart.change";

function read(): Product[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

function write(items: Product[]) {
  localStorage.setItem(KEY, JSON.stringify(items));
  window.dispatchEvent(new Event(EVT));
}

export function addToCart(product: Product) {
  const items = read();
  if (!items.some((i) => i.id === product.id)) write([...items, product]);
  else write(items);
}

export function removeFromCart(id: string) {
  write(read().filter((i) => i.id !== id));
}

export function clearCart() {
  write([]);
}

export function useCart() {
  const [items, setItems] = useState<Product[]>([]);
  useEffect(() => {
    const sync = () => setItems(read());
    sync();
    window.addEventListener(EVT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);
  return items;
}
