import { useRouter } from "next/router";
import React from "react";

export default function ProductDetail() {
  const router = useRouter();
  const { category, productId } = router.query;
  return (
    <div>
      <h1>카테고리 명: {category}</h1>
      <h1>상품 아이디: {productId}</h1>
    </div>
  );
}
