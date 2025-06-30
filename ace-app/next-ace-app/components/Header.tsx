import Link from "next/link";
import React from "react";

export const Header = () => {
  return (
    <header className="bg-[#222] text-white p-4">
      <nav className="flex gap-4 items-center">
        <Link href="/">
          <h2 className="font-bold text-xl">ACE SHOP</h2>
        </Link>
        <Link href="/products">상품</Link>
        <Link href="/admin/timeDeal">타임딜 관리</Link>
        <div className="ml-auto flex gap-4">
          <Link href="/about">About</Link>
          <Link href="/cart/King">Cart</Link>
          <Link href="/category/Clothes/23">Category</Link>
        </div>
      </nav>
    </header>
  );
};
