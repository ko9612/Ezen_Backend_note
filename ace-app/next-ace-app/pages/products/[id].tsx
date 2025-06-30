import { Product } from "@/types/Product";
import { GetServerSideProps } from "next";
import React from "react";

export default function ProductDetail({ product }: { product: Product }) {
  return (
    <div>
      name: {product.name} <br />
      price: {product.price.toLocaleString()}원 <br />
      <img src={product.image_url} alt={product.name} className="w-56" />
    </div>
  );
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
