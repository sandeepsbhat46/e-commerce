// Static, in-memory demo data for the marketplace. No database — this is the
// single source of truth and is regenerated fresh every time the server boots.

const productImage = (seed) => `https://picsum.photos/seed/${seed}/800/800`;
const avatarImage = (seed) => `https://picsum.photos/seed/${seed}/200/200`;

export const categories = [
  {
    id: "c1",
    name: "Electronics",
    slug: "electronics",
    icon: "Laptop",
    image:
      "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&h=600&fit=crop&auto=format",
    children: [
      { id: "c1a", name: "Audio", slug: "audio" },
      { id: "c1b", name: "Wearables", slug: "wearables" },
    ],
  },
  {
    id: "c2",
    name: "Clothing",
    slug: "clothing",
    icon: "Shirt",
    image:
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&h=600&fit=crop&auto=format",
    children: [
      { id: "c2a", name: "Men", slug: "men" },
      { id: "c2b", name: "Women", slug: "women" },
    ],
  },
  {
    id: "c3",
    name: "Home & Garden",
    slug: "home-garden",
    icon: "Sofa",
    image:
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&h=600&fit=crop&auto=format",
    children: [
      { id: "c3a", name: "Kitchen", slug: "kitchen" },
      { id: "c3b", name: "Decor", slug: "decor" },
    ],
  },
  {
    id: "c4",
    name: "Books",
    slug: "books",
    icon: "BookOpen",
    image:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&h=600&fit=crop&auto=format",
    children: [
      { id: "c4a", name: "Fiction", slug: "fiction" },
      { id: "c4b", name: "Business", slug: "business" },
    ],
  },
  {
    id: "c5",
    name: "Sports",
    slug: "sports",
    icon: "Dumbbell",
    image:
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&h=600&fit=crop&auto=format",
    children: [
      { id: "c5a", name: "Fitness", slug: "fitness" },
      { id: "c5b", name: "Outdoor", slug: "outdoor" },
    ],
  },
  {
    id: "c6",
    name: "Beauty",
    slug: "beauty",
    icon: "Sparkles",
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&h=600&fit=crop&auto=format",
    children: [{ id: "c6a", name: "Skincare", slug: "skincare" }],
  },
];

export const brands = ["Aurora", "Northwind", "Kestrel", "Bellhaus", "Vantage", "Loomis"];

const productSeed = [
  ["Aurora Wireless Headphones", "Electronics", "Aurora", 189, 249, 42],
  ["Kestrel Smartwatch Series 5", "Electronics", "Kestrel", 249, undefined, 18],
  ["Vantage 4K Action Camera", "Electronics", "Vantage", 329, 399, 7],
  ["Northwind Bluetooth Speaker", "Electronics", "Northwind", 79, 99, 120],
  ["Loomis Merino Wool Sweater", "Clothing", "Loomis", 118, undefined, 34],
  ["Bellhaus Oxford Shirt", "Clothing", "Bellhaus", 64, 85, 3],
  ["Aurora Running Jacket", "Clothing", "Aurora", 145, undefined, 22],
  ["Loomis Everyday Denim", "Clothing", "Loomis", 92, 120, 0],
  ["Bellhaus Ceramic Cookware Set", "Home & Garden", "Bellhaus", 210, 275, 15],
  ["Northwind Linen Bedding", "Home & Garden", "Northwind", 139, undefined, 48],
  ["Kestrel Espresso Machine", "Home & Garden", "Kestrel", 449, 529, 5],
  ["Vantage Indoor Planter Trio", "Home & Garden", "Vantage", 58, undefined, 90],
  ["The Quiet Algorithm", "Books", "Loomis", 24, 32, 200],
  ["Building Better Systems", "Books", "Northwind", 29, undefined, 150],
  ["Atlas of Small Places", "Books", "Aurora", 38, 45, 60],
  ["Midnight in Calder Bay", "Books", "Bellhaus", 19, undefined, 80],
  ["Vantage Carbon Yoga Mat", "Sports", "Vantage", 76, 95, 27],
  ["Kestrel Adjustable Dumbbells", "Sports", "Kestrel", 289, 349, 11],
  ["Aurora Trail Backpack 32L", "Sports", "Aurora", 132, undefined, 40],
  ["Northwind Cycling Helmet", "Sports", "Northwind", 98, 129, 2],
];

export const products = productSeed.map(([name, category, brand, price, compareAt, stock], i) => {
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  return {
    id: `p${i + 1}`,
    name,
    slug,
    brand,
    sku: `SKU-${1000 + i}`,
    category,
    sellerId: i % 2 === 0 ? "u2" : "u3",
    sellerName: i % 2 === 0 ? "Mara Ellis" : "Devon Park",
    price,
    compareAt,
    rating: Math.round((3.6 + ((i * 7) % 14) / 10) * 10) / 10,
    reviewCount: 12 + ((i * 13) % 180),
    stock,
    status: i === 7 ? "draft" : "active",
    images: [
      productImage(`${slug}-1`),
      productImage(`${slug}-2`),
      productImage(`${slug}-3`),
      productImage(`${slug}-4`),
    ],
    description: `${name} by ${brand}. Built for everyday use with a focus on durable materials, considered detailing, and a clean silhouette that fits into any setup. Backed by a two-year warranty and free returns within 30 days.`,
    specs: {
      Brand: brand,
      Category: category,
      Material: "Premium composite",
      Warranty: "2 years",
      "Ships from": "Portland, OR",
    },
    sizes: category === "Clothing" ? ["XS", "S", "M", "L", "XL"] : undefined,
    colors: [
      { name: "Midnight", hex: "#0f172a" },
      { name: "Indigo", hex: "#6366f1" },
      { name: "Sand", hex: "#d6cbb8" },
    ],
    createdAt: new Date(2026, 5, ((i * 3) % 28) + 1).toISOString(),
  };
});

export const users = [
  {
    id: "u1",
    name: "Ada Whitfield",
    email: "admin@marketplace.test",
    role: "admin",
    status: "active",
    avatar: avatarImage("avatar-ada"),
    joinedAt: "2025-01-12",
  },
  {
    id: "u2",
    name: "Mara Ellis",
    email: "mara@sellers.test",
    role: "seller",
    status: "active",
    avatar: avatarImage("avatar-mara"),
    joinedAt: "2025-03-04",
  },
  {
    id: "u3",
    name: "Devon Park",
    email: "devon@sellers.test",
    role: "seller",
    status: "active",
    avatar: avatarImage("avatar-devon"),
    joinedAt: "2025-06-21",
  },
  {
    id: "u4",
    name: "Jules Navarro",
    email: "jules@shoppers.test",
    role: "customer",
    status: "active",
    avatar: avatarImage("avatar-jules"),
    joinedAt: "2026-01-08",
  },
  {
    id: "u5",
    name: "Rin Takeda",
    email: "rin@shoppers.test",
    role: "customer",
    status: "banned",
    avatar: avatarImage("avatar-rin"),
    joinedAt: "2026-02-19",
  },
];

export const addresses = [
  {
    id: "a1",
    label: "Home",
    fullName: "Jules Navarro",
    phone: "+1 503 555 0142",
    line1: "1180 SE Ash Street",
    line2: "Apt 4B",
    city: "Portland",
    state: "OR",
    zip: "97214",
    country: "United States",
    isDefault: true,
  },
  {
    id: "a2",
    label: "Work",
    fullName: "Jules Navarro",
    phone: "+1 503 555 0199",
    line1: "44 NW Broadway",
    city: "Portland",
    state: "OR",
    zip: "97209",
    country: "United States",
    isDefault: false,
  },
];

const orderStatuses = [
  "pending",
  "processing",
  "shipped",
  "delivered",
  "delivered",
  "cancelled",
  "pending",
  "delivered",
  "shipped",
  "processing",
];

export const orders = orderStatuses.map((status, i) => {
  const items = [products[i % products.length], products[(i + 5) % products.length]].map((p) => ({
    productId: p.id,
    name: p.name,
    image: p.images[0],
    variant: p.sizes ? "Size M / Indigo" : "Indigo",
    price: p.price,
    qty: (i % 2) + 1,
  }));
  const subtotal = items.reduce((s, it) => s + it.price * it.qty, 0);
  const shipping = subtotal > 200 ? 0 : 9.99;
  const tax = Math.round(subtotal * 0.08 * 100) / 100;
  return {
    id: `ORD-${2401 + i}`,
    customer: i % 2 === 0 ? "Jules Navarro" : "Rin Takeda",
    email: i % 2 === 0 ? "jules@shoppers.test" : "rin@shoppers.test",
    date: new Date(2026, 6, ((i * 2) % 28) + 1).toISOString(),
    status,
    items,
    subtotal,
    shipping,
    tax,
    total: Math.round((subtotal + shipping + tax) * 100) / 100,
    address: addresses[0],
    payment: "Visa •••• 4242",
    tracking: status === "shipped" || status === "delivered" ? `1Z999AA${i}0123456` : undefined,
  };
});

const reviewSeed = [
  ["Exactly what I hoped for", "Great build quality and it arrived two days early."],
  ["Solid, with one caveat", "Works well overall, though the manual is thin."],
  ["Would buy again", "Second one I've purchased. Consistent quality."],
  ["Good value", "Comparable to options twice the price."],
  ["Nearly perfect", "Only wish it came in more colors."],
];

export const reviews = Array.from({ length: 15 }, (_, i) => {
  const [title, body] = reviewSeed[i % reviewSeed.length];
  return {
    id: `r${i + 1}`,
    productId: products[i % products.length].id,
    author: ["Jules Navarro", "Rin Takeda", "Sam Oyelaran", "Priya Raman"][i % 4],
    avatar: avatarImage(`rev-${i}`),
    rating: 5 - (i % 3),
    title,
    body,
    date: new Date(2026, 6, (i % 28) + 1).toISOString(),
    helpful: (i * 3) % 24,
    status: ["approved", "approved", "pending", "rejected"][i % 4],
    sellerReply: i % 5 === 0 ? "Thanks for the thoughtful feedback!" : undefined,
  };
});

export const coupons = [
  {
    id: "d1",
    code: "WELCOME10",
    type: "percent",
    value: 10,
    minOrder: 50,
    used: 214,
    maxUses: 1000,
    expiry: "2026-12-31",
    active: true,
  },
  {
    id: "d2",
    code: "FREESHIP",
    type: "fixed",
    value: 9.99,
    minOrder: 0,
    used: 88,
    maxUses: 500,
    expiry: "2026-09-30",
    active: true,
  },
  {
    id: "d3",
    code: "SUMMER25",
    type: "percent",
    value: 25,
    minOrder: 120,
    used: 460,
    maxUses: 500,
    expiry: "2026-08-31",
    active: true,
  },
  {
    id: "d4",
    code: "VIP50",
    type: "fixed",
    value: 50,
    minOrder: 300,
    used: 12,
    maxUses: 100,
    expiry: "2026-10-15",
    active: false,
  },
  {
    id: "d5",
    code: "BOOKS15",
    type: "percent",
    value: 15,
    minOrder: 25,
    used: 130,
    maxUses: 400,
    expiry: "2026-11-01",
    active: true,
  },
];

export const revenueByMonth = [
  { month: "Aug", revenue: 42100, orders: 310 },
  { month: "Sep", revenue: 38400, orders: 288 },
  { month: "Oct", revenue: 51200, orders: 372 },
  { month: "Nov", revenue: 68900, orders: 501 },
  { month: "Dec", revenue: 92400, orders: 690 },
  { month: "Jan", revenue: 57300, orders: 411 },
  { month: "Feb", revenue: 49800, orders: 366 },
  { month: "Mar", revenue: 61500, orders: 430 },
  { month: "Apr", revenue: 58200, orders: 402 },
  { month: "May", revenue: 71100, orders: 495 },
  { month: "Jun", revenue: 76400, orders: 522 },
  { month: "Jul", revenue: 84300, orders: 578 },
];

export const dailyRevenue = Array.from({ length: 30 }, (_, i) => ({
  day: `${i + 1}`,
  revenue: 1200 + Math.round(Math.sin(i / 3) * 400 + i * 28),
  orders: 8 + ((i * 5) % 14),
}));

export const trafficSources = [
  { name: "Organic", value: 42 },
  { name: "Direct", value: 24 },
  { name: "Social", value: 19 },
  { name: "Referral", value: 15 },
];

export const testimonials = [
  {
    name: "Priya Raman",
    role: "Verified buyer",
    quote:
      "Checkout took under a minute and the order landed in two days. This is how online shopping should feel.",
  },
  {
    name: "Sam Oyelaran",
    role: "Verified buyer",
    quote: "The product pages actually tell you what you need. No guesswork, no surprise fees.",
  },
  {
    name: "Elena Marsh",
    role: "Seller since 2025",
    quote:
      "Listing products is quick and the analytics are genuinely useful for planning inventory.",
  },
];

export const findProductBySlug = (slug) => products.find((p) => p.slug === slug);

export const approvedReviewsFor = (productId) =>
  reviews.filter((r) => r.productId === productId && r.status === "approved");

export const findUserByEmail = (email) =>
  users.find((u) => u.email.toLowerCase() === email.toLowerCase());
