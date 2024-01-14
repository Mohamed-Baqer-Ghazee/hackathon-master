"use client";
import React from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Link from "next/link";

const SignOut = () => {
  const { push } = useRouter();
  const handleSignOut = () => {
    // Delete the access token cookie
    Cookies.remove("accessToken");
    Cookies.remove("username");
    Cookies.remove("userID");
    window.location.reload();
  };

  return (
    <Link href={"/signIn"} onClick={handleSignOut} className="">
      Sign Out
    </Link>
  );
};

export default SignOut;
