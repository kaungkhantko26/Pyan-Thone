export type Condition = "Like New" | "Good" | "Fair";

export type Product = {
  id: string;
  title: string;
  price: number;
  condition: Condition;
  distanceKm: number;
  rating: number;
  seller: string;
  category: string;
};

export const CATEGORIES = ["All", "Electronics", "Fashion", "Home", "Sports", "More"];

export const PRODUCTS: Product[] = [
  { id: "iphone-14-pro", title: "Apple iPhone 14 Pro", price: 1_250_000, condition: "Good", distanceKm: 2.4, rating: 4.8, seller: "Ko Aung", category: "Electronics" },
  { id: "macbook-air-m1", title: "MacBook Air M1", price: 1_800_000, condition: "Like New", distanceKm: 4.1, rating: 4.8, seller: "Ko Aung", category: "Electronics" },
  { id: "sony-xm5", title: "Sony XM5 Headphones", price: 520_000, condition: "Good", distanceKm: 1.8, rating: 4.8, seller: "Hnin Ei", category: "Electronics" },
  { id: "canon-eos-m50", title: "Canon EOS M50", price: 750_000, condition: "Fair", distanceKm: 6.2, rating: 4.8, seller: "Su Su", category: "Electronics" },
  { id: "dining-chair", title: "Oak Dining Chair", price: 80_000, condition: "Fair", distanceKm: 3.0, rating: 4.7, seller: "Alex", category: "Home" },
  { id: "iphone-13", title: "iPhone 13", price: 930_000, condition: "Like New", distanceKm: 5.0, rating: 4.8, seller: "Ko Aung", category: "Electronics" },
  { id: "office-chair", title: "Ergonomic Office Chair", price: 130_000, condition: "Good", distanceKm: 2.2, rating: 4.6, seller: "Yamin", category: "Home" },
  { id: "nike-runners", title: "Nike Pegasus 40", price: 95_000, condition: "Good", distanceKm: 1.1, rating: 4.7, seller: "Ma Su", category: "Sports" },
];

export const TRUST_SCORE = {
  score: 92,
  delta: 3,
  breakdown: [
    { label: "Verification", value: "20 / 20" },
    { label: "Ratings", value: "28 / 30" },
    { label: "Successful sales", value: "23 / 25" },
    { label: "Reports", value: "10 / 10" },
  ],
  badges: ["Phone verified", "Email verified", "No active reports"],
};

export const CONVERSATIONS = [
  { id: "ko-aung", name: "Ko Aung", item: "MacBook Air M1", note: "New reply", unread: true },
  { id: "ma-su", name: "Ma Su", item: "iPhone 13", note: "Offer accepted", unread: false },
  { id: "alex", name: "Alex", item: "Dining chair", note: "Yesterday", unread: false },
];

export const DELIVERY_STEPS = [
  { title: "Order confirmed", detail: "Payment secured", state: "done" },
  { title: "Seller preparing", detail: "Item packed and checked", state: "done" },
  { title: "Picked up", detail: "Courier received the parcel", state: "done" },
  { title: "In transit", detail: "Moving through Yangon hub", state: "current" },
  { title: "Delivered", detail: "Awaiting courier delivery", state: "todo" },
  { title: "Buyer confirmation", detail: "Confirm condition after arrival", state: "todo" },
] as const;

export const CONDITION_REPORT = {
  overall: "Good",
  metrics: [
    { label: "Appearance", score: 8 },
    { label: "Functionality", score: 10 },
    { label: "Battery health", score: 8 },
  ],
  declarations: ["Fully functional", "Original charger", "No repair history", "Minor scratches"],
  diagnostics: "Battery health 89% · No repair history · All ports tested",
  photos: ["Front", "Back", "Scratch detail"],
};

export const SELLER = {
  name: "Ko Aung",
  shop: "Aung Tech Store",
  memberSince: "January 2025",
  rating: 4.8,
  sales: 24,
  success: 96,
  verifications: ["Email verified", "Phone verified", "Identity verified"],
};

export const REVIEWS = [
  { stars: 5, text: "Product matched the description.", author: "Ma Su", when: "2 weeks ago" },
  { stars: 5, text: "Fast delivery and a very responsive seller.", author: "Ko Min", when: "1 month ago" },
];

/** Completed sales shown on the seller profile as proof of track record. */
export const SOLD_LISTINGS = [
  { id: "sold-iphone-13", title: "iPhone 13 · 128GB", price: 930_000, soldWhen: "2 weeks ago", condition: "Like New" as Condition, buyer: "Ma Su", rating: 5 },
  { id: "sold-xm5", title: "Sony WH-1000XM5", price: 520_000, soldWhen: "1 month ago", condition: "Good" as Condition, buyer: "Ko Min", rating: 5 },
  { id: "sold-ipad-air", title: "iPad Air (4th gen)", price: 640_000, soldWhen: "2 months ago", condition: "Good" as Condition, buyer: "Hnin Ei", rating: 4 },
  { id: "sold-switch", title: "Nintendo Switch OLED", price: 410_000, soldWhen: "3 months ago", condition: "Like New" as Condition, buyer: "Alex", rating: 5 },
];

export const BUYER = {
  name: "Ma Su",
  phone: "+95 9 765 432 100",
  email: "ma.su@example.com",
  memberSince: "March 2025",
  city: "Yangon",
  verifications: ["Email verified", "Phone verified"],
  stats: [
    { label: "Orders", value: "6" },
    { label: "Saved items", value: "3" },
    { label: "Reviews given", value: "4" },
  ],
};

export const BUYER_ORDERS = [
  { item: "MacBook Air M1", seller: "Ko Aung", status: "In transit", ref: "PYT-20491" },
  { item: "Sony XM5 Headphones", seller: "Hnin Ei", status: "Delivered", ref: "PYT-20388" },
  { item: "Nike Pegasus 40", seller: "Ma Su", status: "Delivered", ref: "PYT-20210" },
];

export const SELLER_METRICS = [
  { label: "Revenue", value: "850,000 MMK", delta: "+12% this month" },
  { label: "Orders", value: "12", delta: "3 need action" },
  { label: "Active listings", value: "8", delta: "2 low stock" },
  { label: "Conversion", value: "9.6%", delta: "+1.4% this month" },
];

export const SELLER_ORDERS = [
  { item: "MacBook Air M1", buyer: "Ma Su", status: "Preparing" },
  { item: "iPhone 13", buyer: "Alex", status: "Shipped" },
  { item: "Sony XM5", buyer: "Hnin Ei", status: "Offer received" },
];

export const ADMIN_STATS = [
  { label: "Active buyers", value: "3,284", tone: "action" },
  { label: "Verified sellers", value: "486", tone: "trust" },
  { label: "Pending reviews", value: "18", tone: "warning" },
  { label: "Open reports", value: "7", tone: "danger" },
];

export const ADMIN_ACCOUNTS = [
  { name: "Ko Aung · Aung Tech", role: "Seller", verification: "Identity verified", status: "Active", reports: 0, action: "Email · Ban" },
  { name: "Ma Su", role: "Buyer", verification: "Phone verified", status: "Active", reports: 1, action: "Email · Ban" },
  { name: "Htet Store", role: "Seller", verification: "Review pending", status: "Restricted", reports: 3, action: "Review · Ban" },
  { name: "Kyaw Min", role: "Buyer", verification: "Phone verified", status: "Banned", reports: 5, action: "Email · Unban" },
];

export const ADMIN_NAV = [
  "Overview",
  "Users & sellers",
  "Identity reviews",
  "Chat review",
  "Reports",
  "Email center",
  "Audit log",
];

export const FLAGGED_CHATS = [
  { pair: "Ko Aung ↔ Ma Su", reason: "Payment dispute", ago: "12m" },
  { pair: "Htet Store ↔ Alex", reason: "Reported message", ago: "1h" },
  { pair: "Kyaw Min ↔ Su Su", reason: "OTP request", ago: "3h" },
];

export function conditionTone(c: Condition): string {
  if (c === "Like New") return "bg-action-soft text-action";
  if (c === "Good") return "bg-warning-soft text-warning";
  return "bg-line/60 text-ink-secondary";
}
