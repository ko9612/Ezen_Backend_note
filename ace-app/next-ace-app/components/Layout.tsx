import React from "react";
import { Header } from "./Header";
import Footer from "./Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="min-h-[80vh] p-8">{children}</main>
      <Footer />
    </>
  );
}
