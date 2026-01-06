import React from "react";
import { Navbar, Footer } from "..";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-textGray">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
