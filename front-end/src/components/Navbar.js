"use client";
import { Fragment, useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import Image from "next/image";
import Cookies from "js-cookie";
import Link from "next/link";

const navigation = [
  { name: "Library", href: "/library", current: true },
  { name: "Upload video", href: "/upload", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    setAuth(accessToken);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken"); // Clear the authentication token
    setAuth(null); // Update state to reflect logout
    // Optionally add redirect here if needed
  };

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="flex flex-shrink-0 items-center">
                <a href="/"> 
                <Image
                  width={150}
                  height={50}
                  src="/assets/Screenshot__79_-removebg-preview.png"
                  alt="Logo"
                /></a>
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  {navigation.map((item) => (
                    <a key={item.name} href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                    </a>
                  ))}
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {!auth ? (
                  <div>
                    <Link href="/signIn" className="text-gray-300 hover:text-white px-3 py-2">
                     Sign In
                    </Link>
                    <Link href="/register"  className="text-gray-300 hover:text-white px-3 py-2">
                      Register
                    </Link>
                  </div>
                ) : (
                  <button
                    onClick={handleLogout}
                    className="text-gray-300 hover:text-white px-3 py-2"
                  >
                    Logout
                  </button>
                )}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <a key={item.name} href={item.href}
                  
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "block rounded-md px-3 py-2 text-base font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  
                </a>
              ))}
              {!auth && (
                <>
                  <Link href="/signIn" className="block text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-base font-medium">
                    Sign In
                  </Link>
                  <Link href="/register" className="block text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-base font-medium">
                    Register
                  </Link>
                </>
              )}
              {auth && (
                <button
                  onClick={handleLogout}
                  className="block w-full text-left text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-base font-medium"
                >
                  Logout
                </button>
              )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
