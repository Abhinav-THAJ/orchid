export function generateStaticParams() {
  const categories = [
    "wedding", "premium", "traditional", "trending",
    "sarees", "kurtis", "kurta-sets", "tops",
    "baby-wear", "girls-wear", "party-wear", "ethnic-wear", "casual-wear"
  ];
  return categories.map((category) => ({ category }));
}

export default function CategoryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
