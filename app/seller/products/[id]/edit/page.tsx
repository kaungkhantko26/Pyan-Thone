import { notFound } from "next/navigation";
import { SellerProductForm } from "@/components/SellerProductForm";
import { PRODUCTS } from "@/lib/data";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ id: p.id }));
}
export const dynamicParams = false;

export default function EditProduct({ params }: { params: { id: string } }) {
  const product = PRODUCTS.find((p) => p.id === params.id);
  if (!product) notFound();
  return <SellerProductForm mode="edit" product={product} />;
}
