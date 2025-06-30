import ProductList from "@/components/products/ProductList";
import { Product } from "@/types/Product";
import styles from "./AllProductPage.module.css";
import { useRouter } from "next/router";
import { ChangeEvent } from "react";

export default function AllProductPage({
  products,
  totalCount,
}: {
  products: Product[];
  totalCount: number;
}) {
  const router = useRouter();
  const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedSort = e.target.value; // 사용자가 선택한 정렬값(latest, price_asc, price_desc)
    router.push(`/products?sort=${selectedSort}`);
  };
  return (
    <div className={styles.container}>
      <h3>🎁 전체 상품</h3>
      <div>
        <label htmlFor="">
          정렬방식
          <select name="" id="" className="ml-2" onChange={handleSortChange}>
            <option value="latest">최신 상품순</option>
            <option value="price_asc">가격 낮은순</option>
            <option value="price_desc">가격 높은순</option>
          </select>
        </label>
        <span>총 상품 개수: {totalCount}</span>
      </div>
      <div className="p-4">
        <ProductList products={products} />
      </div>
      <div>페이지네이션</div>
    </div>
  );
}

export const getServerSideProps = async (context: {
  query: { sort: string };
}) => {
  try {
    const sort = context.query.sort || "latest";
    let orderBy = "idDESC";
    if (sort === "price_asc") orderBy = "priceASC";
    if (sort === "price_desc") orderBy = "priceDESC";
    const queryString = `order=${orderBy}`;
    const url = `http://localhost:7777/api/products?${queryString}`;
    const response = await fetch(url);
    const data = await response.json();
    return {
      props: {
        products: data.products,
        totalCount: data.totalCount,
      },
    };
  } catch (error) {
    console.error("상품 데이터 가져오기 실패: ", error);
    return {
      props: {
        products: [],
        totalCount: 0,
      },
    };
  }
};
