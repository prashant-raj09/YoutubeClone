import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeMenu } from "../utils/appSlice";
import { Link, useSearchParams } from "react-router-dom";
import LiveChat from "./LiveChat";
import { makeMessage, nameGenerate, OFFSET_LIVE_CHAT } from "../utils/constant";
import { addMessage } from "../utils/chatSlice";
const WatchPage = () => {
  const dispatch = useDispatch();

  // I am using useSearchParams instead of using useParams because i am not getting the search parameters from the components.
  
  /* 

  const url = new URL("https://www.youtube.com/watch?v=abc123");
  const searchParams = url.searchParams;
  const videoId = searchParams.get("v");
  console.log(videoId);  // Outputs: abc123

  */
  const [searchParams] = useSearchParams();

  // ------ This is for Live Chat ----------

  const liveMessages = useSelector((store) => store.chat.messages);

  useEffect(() => {
    const i = setInterval(() => {
      getLiveChatMessage();
    }, 500);
    return () => clearInterval(i);
  }, []);

  const getLiveChatMessage = () => {
    const message = makeMessage(20);
    const name = nameGenerate();
    dispatch(addMessage({ name: nameGenerate(), message: makeMessage(40) }));
  };

  // ---------- Live Chat End -----------
  // Here I wrote searchParams.get("v") because i need the search parameters

  useEffect(() => {
    dispatch(closeMenu());
  }, []);

  // ------------- This is for the chat by input Start -------------
  const [liveMessage, setLiveMessage] = useState();
  const inputData = () => {
    dispatch(addMessage({ name: "Raj", message: liveMessage }));
    setLiveMessage("");
  };
  // ------------- This is for the chat by input End -------------
  return (
    <div className="px-5 flex w-full h-[500px]">
      <div>
        <iframe
          width="1000"
          height="500"
          src={"https://www.youtube.com/embed/" + searchParams.get("v")}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
      <div className="w-full">
        <div className="px-3  border  mx-3 w-full h-full mb-5  overflow-hidden overflow-y-auto flex flex-col-reverse border-black rounded-lg">
          {liveMessages.map((m, index) => {
            return <LiveChat key={index} name={m.name} message={m.message} />;
          })}
        </div>
        <div className="flex">
          <input
            className="border border-black rounded-lg mx-3 P-2"
            type="text"
            value={liveMessage}
            onChange={(e) => setLiveMessage(e.target.value)}
          />
          <button className="bg-green-300 rounded-lg p-2" onClick={inputData}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default WatchPage;