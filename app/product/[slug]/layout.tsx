import { products } from '@/lib/data';
import { ReactNode } from 'react';

export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const product = products.find((p) => p.slug === params.slug);
  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }
  return {
    title: product.name,
    description: product.description,
  };
}

export default function ProductLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}