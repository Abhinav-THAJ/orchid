export const WOOCOMMERCE_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL || "";
const CONSUMER_KEY = process.env.WC_CONSUMER_KEY || "";
const CONSUMER_SECRET = process.env.WC_CONSUMER_SECRET || "";

/**
 * Helper to fetch data from WooCommerce REST API
 */
export async function fetchWooCommerceAPI(endpoint: string, queryParams: Record<string, string> = {}) {
  if (!WOOCOMMERCE_URL || !CONSUMER_KEY || !CONSUMER_SECRET) {
    console.warn("WooCommerce credentials missing. Please check your .env.local file.");
    return null;
  }

  const url = new URL(`${WOOCOMMERCE_URL}/wp-json/wc/v3/${endpoint}`);
  
  // Add Consumer Keys for Basic Auth (Note: In production, ensure you use HTTPS)
  url.searchParams.append("consumer_key", CONSUMER_KEY);
  url.searchParams.append("consumer_secret", CONSUMER_SECRET);

  // Add any additional query parameters
  Object.keys(queryParams).forEach(key => {
    url.searchParams.append(key, queryParams[key]);
  });

  try {
    const response = await fetch(url.toString(), {
      // Next.js App Router caching options
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    });

    if (!response.ok) {
      throw new Error(`WooCommerce API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching from WooCommerce:", error);
    return null;
  }
}

/**
 * Fetch all products from WooCommerce
 */
export async function getProducts(params = {}) {
  const data = await fetchWooCommerceAPI('products', params);
  return data;
}

/**
 * Fetch a single product by its slug
 */
export async function getProductBySlug(slug: string) {
  const data = await fetchWooCommerceAPI('products', { slug });
  return data && data.length > 0 ? data[0] : null;
}

/**
 * Fetch product categories
 */
export async function getCategories() {
  const data = await fetchWooCommerceAPI('products/categories');
  return data;
}
