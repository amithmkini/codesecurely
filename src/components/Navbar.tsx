import React from "react";
import Head from "next/head";
import { Permanent_Marker } from "next/font/google";
import clsx from "clsx";

export const title = Permanent_Marker({
  subsets: ["latin"],
  weight: ["400"],
});

const Navbar: React.FC = () => {
  // Q: Suggest a cursive font for the logo
  // A: https://fonts.google.com/specimen/Permanent+Marker?query=permanent+marker
  return (
    <>
      <Head>
        <title>CodeSecurely</title>
      </Head>
      <nav className="bg-blue-500 p-2">
        <div className="container">
          <h1 className={clsx("text-xl font-bold text-white", title.className)}>
            CodeSecurely
          </h1>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
