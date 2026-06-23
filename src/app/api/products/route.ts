import { NextResponse } from 'next/server';
import { getProducts } from '@/lib/woocommerce';

export async function GET() {
  try {
    const wcProducts = await getProducts({ per_page: '50' });
    
    if (!wcProducts || wcProducts.length === 0) {
      return NextResponse.json([]);
    }

    // Map WooCommerce products to match the shape expected by the frontend
    const mappedProducts = wcProducts.map((p: any) => ({
      id: p.id,
      name: p.name,
      price: parseFloat(p.price) || 0,
      originalPrice: parseFloat(p.regular_price) || parseFloat(p.price) || 0,
      img: p.images?.[0]?.src || "/images/category_womens_sarees_1780477985126.png", // fallback
      images: p.images && p.images.length > 0 ? p.images.map((i: any) => i.src) : [],
      description: p.description?.replace(/<[^>]*>?/gm, '') || "", // stripped html
      tag: p.categories?.[0]?.name || "General",
      category: p.categories?.[0]?.slug || "general",
      occasion: "Casual", 
      color: "Blue", 
      rating: parseFloat(p.average_rating) || 0,
      reviews: p.rating_count || 0,
      isNew: false, 
      isBest: p.featured || false,
      stockCount: p.stock_quantity || 10,
    }));

    return NextResponse.json(mappedProducts);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}
