import React from "react";

const VideoCard = ({ info }) => {
  if (!info) return;
  const { snippet, statistics } = info;
  const { channelTitle, title, thumbnails } = snippet;

  return (
    <div className="p-2 m-2 w-72 shadow-lg cursor-pointer rounded-md h-full gap-2 mt-2">
      <img
        className="rounded-lg"
        src={thumbnails?.medium?.url}
        alt="thumbnails"
      />
      <ul>
        <li className="font-bold p-2">{title}</li>
        <div className="flex justify-between">
          <li>{channelTitle}</li>
          <li>{statistics.viewCount} views</li>
        </div>
      </ul>
    </div>
  );
};

// High Order function ---> That is like take a component in argument and return that component. ---> We used this High Order Function for modify the existing component.

export const AddVideoCard = ({ info }) => {
  return (
    <div className="border border-red-700">
      <VideoCard info={info} />
    </div>
  );
};

export default VideoCard;