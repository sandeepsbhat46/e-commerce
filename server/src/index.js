import cors from "cors";
import express from "express";
import {
  addresses,
  approvedReviewsFor,
  brands,
  categories,
  coupons,
  dailyRevenue,
  findProductBySlug,
  findUserByEmail,
  orders,
  products,
  reviews,
  revenueByMonth,
  testimonials,
  trafficSources,
  users,
} from "./data.js";

const PORT = process.env.PORT || 4000;

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => res.json({ ok: true }));

app.get("/api/categories", (req, res) => res.json(categories));
app.get("/api/brands", (req, res) => res.json(brands));

app.get("/api/products", (req, res) => res.json(products));
app.get("/api/products/:slug", (req, res) => {
  const product = findProductBySlug(req.params.slug);
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
});
app.get("/api/products/:productId/reviews", (req, res) => {
  res.json(approvedReviewsFor(req.params.productId));
});

app.get("/api/users", (req, res) => res.json(users));

app.post("/api/auth/login", (req, res) => {
  const { email, role = "customer" } = req.body ?? {};
  if (!email) return res.status(400).json({ message: "Email is required" });

  const known = findUserByEmail(email);
  if (known) return res.json(known);

  res.json({
    id: "u-local",
    name: email.split("@")[0].replace(/^\w/, (c) => c.toUpperCase()),
    email,
    role,
    status: "active",
    avatar: `https://picsum.photos/seed/${encodeURIComponent(email)}/200/200`,
    joinedAt: new Date().toISOString(),
  });
});

app.get("/api/orders", (req, res) => res.json(orders));
app.get("/api/addresses", (req, res) => res.json(addresses));
app.get("/api/coupons", (req, res) => res.json(coupons));
app.get("/api/reviews", (req, res) => res.json(reviews));
app.get("/api/testimonials", (req, res) => res.json(testimonials));

app.get("/api/analytics/revenue-by-month", (req, res) => res.json(revenueByMonth));
app.get("/api/analytics/daily-revenue", (req, res) => res.json(dailyRevenue));
app.get("/api/analytics/traffic-sources", (req, res) => res.json(trafficSources));

app.listen(PORT, () => {
  console.log(`bloom-commerce API listening on http://localhost:${PORT}`);
});
