
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "@/components/Footer";

const RootLayout = ({ children }) => (
  <html lang="en">
    <body>
      <div className="main">
        <Navbar />
        <main className="app">{children}</main>
        <Footer />
      </div>
    </body>
  </html>
);

export default RootLayout;
