"use client";
import React, { useEffect, useState } from "react";
import VideoCard from "../../components/VideoCard.js";
import "../globals.css";

export default function Library() {
  const [videoList, setVideoList] = useState([]);

  useEffect(() => {
    const fetchVideoList = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/videos");
        if (response.ok) {
          const data = await response.json();
          setVideoList(data); // Assuming the response is an array of video data
          console.log(data);
        } else {
          console.error("Failed to fetch video list");
        }
      } catch (error) {
        console.error("Error fetching video list:", error);
      }
    };

    fetchVideoList();
  }, []);

  return (
    <>
      <h1 className="text-center text-5xl font-bold my-7 text-rose-500">
        Videos
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-9 mx-24">
        {videoList.map((video, index) => (
          <VideoCard
            key={index}
            desc={video.description}
            src={video.thumbnail}
            id={video.id}
            vidsrc={video.video}
          />
        ))}
      </div>
    </>
  );
}
