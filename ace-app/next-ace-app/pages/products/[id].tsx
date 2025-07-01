import ProductDetail from "@/components/products/ProductDetail";
import { Product } from "@/types/Product";
import { GetServerSideProps } from "next";
import React from "react";

export default function ProductDetailById({ product }: { product: Product }) {
  return <ProductDetail product={product} />;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.query?.id;
  const response = await fetch(`http://localhost:7777/api/products/${id}`);
  if (!response.ok) {
    return {
      notFound: true, // 404
    };
  }
  const product = await response.json();
  return {
    props: {
      product,
    },
  };
};
