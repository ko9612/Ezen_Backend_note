import { Product } from "@/types/Product";
import { useRouter } from "next/router";
import React from "react";
import styles from "./ProductDetail.module.css";

export default function ProductDetail({ product }: { product: Product }) {
  const router = useRouter();
  const goToCart = () => {
    router.push(`/cart/hong`);
  };
  const goShopping = () => {
    if (window.history.length > 0) {
      router.back();
    } else {
      router.push("/");
    }
  };
  return (
    <div className={styles.wrap}>
      <div className={styles.imgBox}>
        <img src={product.image_url} alt={product.name} />
      </div>
      <div className={styles.infoBox}>
        <h2 className={styles.title}>{product.name}</h2>
        <div>
          <>
            <span>세일가 원</span>
            <span>{product.price.toLocaleString()} 원</span>
            <span>할인율 %</span>
          </>
          <>
            <span>{product.price.toLocaleString()} 원</span>
          </>
        </div>
        상품번호: {product.id} <br />
        <p className={styles.description}>{product.description}</p>
        <div className={styles.options}>
          <label htmlFor="">수량: </label>
          <input type="number" min={1} />
        </div>
        <div className={styles.btnGroup}>
          <button onClick={goToCart} className={styles.cartBtn}>
            장바구니
          </button>
          <button className={styles.buyBtn}>구매하기</button>
          <button onClick={goShopping} className={styles.goShopBtn}>
            계속 쇼핑
          </button>
        </div>
      </div>
    </div>
  );
}
