import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "./ProductCard.module.css";

type ProductCardProps = {
  id: number;
  name: string;
  price: number;
  image_url: string;
  spec?: string;
};

export default function ProductCard({
  id,
  name,
  price,
  image_url,
  spec,
}: ProductCardProps) {
  return (
    <Link href={`products/${id}`} className={styles.card}>
      <Image
        src={image_url}
        width={1000}
        height={1000}
        alt={name}
        className={styles.image}
      />
      <div className={styles.name}>
        [{spec}] {name}
      </div>
      <div className={styles.price}>{price.toLocaleString()}원</div>
    </Link>
  );
}
