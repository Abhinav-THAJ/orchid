export function generateStaticParams() {
  const products = [
    "regal-silk-saree", "embroidered-kurti", "royal-kurta-set",
    "chic-fusion-top", "luxury-baby-ensemble", "girls-festive-dress",
    "party-wear-gown", "boys-ethnic-suit", "classic-kasavu-saree",
    "bridal-lehenga", "contemporary-drape", "lookbook-exclusives"
  ];
  return products.map(slug => ({ slug }));
}

export default function ProductLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
