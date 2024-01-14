import Image from "next/image";
import React from "react";

export default function Footer() {
  return (
    <div>
      <footer className="bg-white dark:bg-gray-900 mt-8">
        <div className="mx-auto w-full max-w-screen-xl p-2 py-2 ">
          <div className="md:flex md:justify-between">
            <div className="mb-6 md:mb-0 justify-center items-center flex">
              <a href="https://flowbite.com/" className="flex items-center">
                <Image
                  width={200}
                  height={100}
                  src="/assets/Screenshot__79_-removebg-preview.png"
                  className=" me-3"
                  alt="FlowBite Logo"
                />
              </a>
            </div>
            <div className="grid gap-8 sm:gap-6">
              <div>
                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                  Made By:
                </h2>

                <ul className="text-gray-500 dark:text-gray-400 font-medium">
                  <li className="mb-4">
                    <a
                      href="https://github.com/omarwahbi"
                      className="hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Omar Wahbi
                    </a>
                  </li>
                  <li className="mb-4">
                    <a
                      href="https://github.com/Mohamed-Baqer-Ghazee"
                      className="hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Mohamed Baqer Ghazee
                    </a>
                  </li>
                  <li className="mb-4">
                    <a href="#" className="hover:underline">
                      Abbas Faek
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
