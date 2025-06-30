import React from "react";
import ProductCard from "./ProductCard";
import { Product } from "@/types/Product";
import styles from "./ProductList.module.css";

type ProductListProps = {
  products: Product[];
  title?: string;
};

export default function ProductList({ products, title }: ProductListProps) {
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
