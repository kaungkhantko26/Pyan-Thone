import { SellerProfile } from "@/components/SellerProfile";

export function generateStaticParams() {
  return [{ id: "ko-aung" }];
}
export const dynamicParams = false;

export default function Page() {
  return <SellerProfile />;
}
