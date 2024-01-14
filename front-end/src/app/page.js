
"use client"

import Link from "next/link";
import React, { useState, useEffect } from "react";
import "./styles.css";
import Image from "next/image";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is logged in
    // This could be a token in local storage, a cookie, or some other method
    const token = localStorage.getItem("accessToken");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <>
      <div className=" h-dvh flex justify-center flex-wrap flex-col items-center container ">
        <Image
          className="flex justify-center items-center mx-auto mb-24"
          src={"/assets/Screenshot__79_-removebg-preview.png"}
          width={300}
          height={150}
        />
        <h1 className="text-3xl mb-4 lg:text-5xl">
          {" "}
          Welcome to Stream Spectra
        </h1>
        <p className="desc text-justify">
          Share, control, enjoy – your ultimate shared movie experience!
        </p>
        {!isLoggedIn && (
          <>
            <Link href="/signIn" className=" m-5 p-5 flex lg:w-1/5 w-2/4 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                
              
                Sign in
            </Link>
            <Link href="/register" className="flex lg:w-1/5 w-2/4 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              
                
              
                Register
            </Link>
          </>
        )}
        {isLoggedIn && (
          <>
            <Link href="/library" className="flex lg:w-1/5 w-2/4 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Browse Library
            </Link>
          </>
        )}
      </div>
    </>
  );
}
