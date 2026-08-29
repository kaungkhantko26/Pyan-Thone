"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Product } from "@/lib/data";
import { addToCart } from "@/lib/cart";
import { Button } from "./ui";

export function AddToCart({ product }: { product: Product }) {
  const router = useRouter();
  const [added, setAdded] = useState(false);

  return (
    <div className="space-y-3">
      <Button
        full
        onClick={() => {
          addToCart(product);
          setAdded(true);
        }}
      >
        {added ? "✓ Added to cart" : "Add to cart"}
      </Button>
      <Button full variant="secondary" onClick={() => router.push("/buyer/chat")}>
        Make an offer
      </Button>
      <Button full variant="ghost" onClick={() => setAdded(true)}>
        ♡ Save item
      </Button>
      {added && (
        <Button full variant="secondary" href="/buyer/checkout">
          Go to checkout
        </Button>
      )}
    </div>
  );
}
