// SSG - 빌드타임에 사전 렌더링, 정적인 페이지를 구성할 때 사용
// SSR - 요청이 있을때마다 사전 렌더링

import ProductList from "@/components/products/ProductList";
import TimeDealSlider from "@/components/products/TimeDealSlider";

export default function Home({ bestProduct, hitProduct, timeDeals }: Props) {
  return (
    <div className="w-[90%] max-w-[1024px] m-auto">
      <div className="p-4">
        <TimeDealSlider deals={timeDeals} title="⏳ 타임딜 상품" />
      </div>
      <div className="p-4">
        <ProductList products={bestProduct} title="❣️ BEST 상품" />
      </div>
      <div className="p-4">
        <ProductList products={hitProduct} title="🌟 HIT 상품" />
      </div>
    </div>
  );
}

export async function getStaticProps() {
  try {
    let url1 = `http://localhost:7777/api/products/spec`; // 베스트, 히트 삼품
    let url2 = `http://localhost:7777/api/timeDeals`; // 타임딜 상품

    const bestRes = await fetch(url1 + `?spec=best`);
    const hitRes = await fetch(url1 + `?spec=hit`);
    const timeDealsRes = await fetch(url2);

    const bestProduct = await bestRes.json();
    const hitProduct = await hitRes.json();
    const timeDeals = await timeDealsRes.json();
    console.log(bestProduct);

    return {
      props: {
        bestProduct,
        hitProduct,
        timeDeals,
      },
      revalidate: 60 * 5, // 초단위: 5분 뒤에 update => ISR
      // 1. 초기에는 SSG로 정적인 페이지를 생성
      // 2. 요청이 들어오고 revalidate에 지정된 시간이 만료되면(5분이 지나면) SSR을 수행해서 페이지를 재생성
      // 3. 재생성한 페이지를 정적으로 다시 저장하고 응답을 보냄
      // 4. 다음 요청부터는 재생성된 정적인 페이지를 응답으로 서비스하게 된다.
    };
  } catch (error) {
    console.error("Home 상품 가져오기 실패: ", error);
    return {
      props: {
        bestProduct: [],
        hitProduct: [],
        timeDeals: [],
      },
    };
  }
}
