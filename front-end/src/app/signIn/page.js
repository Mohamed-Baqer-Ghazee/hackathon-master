"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import "../globals.css";
import Image from "next/image";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { push } = useRouter();

  const handleSignIn = async (e) => {
    e.preventDefault();

    // Validate form data
    if (!email || !password) {
      setMessage("Please enter both email and password.");
      return;
    }

    // Prepare user credentials
    const userCredentials = {
      email,
      password,
    };

    try {
      // Send sign-in data to the API
      const response = await fetch(
        "http://localhost:3000/api/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userCredentials),
        }
      );

      // Handle API response
      const data = await response.json();
      if (response.ok) {
        setMessage("Sign-in successful!");
        localStorage.setItem("accessToken", data.token);
        localStorage.setItem("username", data.user.name);
        localStorage.setItem("userID", data.user.id);
        push("/library");
        console.log(response.data);
      } else {
        setMessage(`Sign-in failed: ${data.message}`);
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      console.error("Error during sign-in:", error);
      setMessage("An error occurred during sign-in. Please try again.");
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 p-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image
          width={300}
          height={150}
          className="mx-auto w-auto"
          src="/assets/Screenshot__79_-removebg-preview.png"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-4xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSignIn} method="POST">
          <div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  autoComplete="email"
                  required
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  autoComplete="current-password"
                  required
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 p-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 my-4"
              >
                Sign in
              </button>
            </div>
          </div>
        </form>
        {message && <p>{message}</p>}
        <p className="mt-10 text-center text-sm text-gray-500">
          New Here?{" "}
          <Link
            href="/register"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Register Now!
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
