import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

export const useCategories = () => useQuery({ queryKey: ["categories"], queryFn: api.categories });

export const useBrands = () => useQuery({ queryKey: ["brands"], queryFn: api.brands });

export const useProducts = () => useQuery({ queryKey: ["products"], queryFn: api.products });

export const useProduct = (slug: string) =>
  useQuery({ queryKey: ["product", slug], queryFn: () => api.product(slug), enabled: !!slug });

export const useProductReviews = (productId: string | undefined) =>
  useQuery({
    queryKey: ["product-reviews", productId],
    queryFn: () => api.productReviews(productId as string),
    enabled: !!productId,
  });

export const useUsers = () => useQuery({ queryKey: ["users"], queryFn: api.users });

export const useOrders = () => useQuery({ queryKey: ["orders"], queryFn: api.orders });

export const useAddresses = () => useQuery({ queryKey: ["addresses"], queryFn: api.addresses });

export const useCoupons = () => useQuery({ queryKey: ["coupons"], queryFn: api.coupons });

export const useReviews = () => useQuery({ queryKey: ["reviews"], queryFn: api.reviews });

export const useTestimonials = () =>
  useQuery({ queryKey: ["testimonials"], queryFn: api.testimonials });

export const useRevenueByMonth = () =>
  useQuery({ queryKey: ["revenue-by-month"], queryFn: api.analytics.revenueByMonth });

export const useDailyRevenue = () =>
  useQuery({ queryKey: ["daily-revenue"], queryFn: api.analytics.dailyRevenue });

export const useTrafficSources = () =>
  useQuery({ queryKey: ["traffic-sources"], queryFn: api.analytics.trafficSources });
