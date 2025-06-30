import { useRouter } from "next/router";
import React from "react";

export default function SearchPage() {
  const router = useRouter();
  const { keywords } = router.query;
  if (!keywords) return <h3>검색어가 없습니다.</h3>;
  return (
    <div>
      <h1>검색결과</h1>
      <h3>검색 키워드</h3>
      <ul>
        {Array.isArray(keywords) ? (
          keywords.map((word, i) => <li key={`${word}-${i}`}>{word}</li>)
        ) : (
          <li>{keywords}</li>
        )}
      </ul>
    </div>
  );
}
