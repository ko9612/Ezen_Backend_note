import { useRouter } from "next/router";
import React from "react";

export default function CartPageByUser() {
  const router = useRouter();
  const { uid } = router.query;
  return (
    <div>
      <h1>{uid}님의 장바구니</h1>
    </div>
  );
}
