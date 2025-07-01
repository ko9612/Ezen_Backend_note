import React from "react";
import ProductCard from "./ProductCard";
import { Product } from "@/types/Product";
import styles from "./ProductList.module.css";

type ProductListProps = {
  products: Product[];
  title?: string;
};

export default function ProductList({ products, title }: ProductListProps) {
  if (!products || products.length === 0) {
    return (
      <div className={styles.row}>
        <h3 className={styles.title}>상품 준비중...</h3>
      </div>
    );
  }
  return (
    <div className={styles.container}>
      {title && <h2 className={styles.title}>{title}</h2>}
      <div className={styles.row}>
        {products.map((prod) => (
          <ProductCard key={prod.id} {...prod} />
        ))}
      </div>
    </div>
  );
}
