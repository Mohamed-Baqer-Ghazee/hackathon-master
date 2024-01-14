import Link from "next/link";
import React from "react";

export default function VideoCard(props) {
  return (
    <div className="flex justify-center">
      <div className="rounded-lg shadow-lg bg-white max-w-sm transition-transform transform hover:scale-105">
        <a href="#!">
          <img
            src={`http://localhost:3000/api/videos/images/${props.src}`} // Replace with your actual image URL
            alt="Card Image"
            className="w-full rounded-t-lg"
          />
        </a>
        <div className="p-6">
          <h5 className="text-gray-900 text-xl font-medium mb-2">Video Card</h5>
          <p className="text-gray-700 text-base mb-4">{props.desc}</p>
          <Link
            href={`/video/${props.vidsrc}`}
            type="button"
            className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
          >
            Watch
          </Link>
        </div>
      </div>
    </div>
  );
}
