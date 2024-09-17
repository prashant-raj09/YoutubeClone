import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../utils/appSlice";
import { Link } from "react-router-dom";
import { YOUTUBE_SEARCH_API } from "../utils/constant";
import { cacheResults } from "../utils/searchSlice";
const Head = () => {
  const dispatch = useDispatch();

  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  // This is for showing the suggestion when user click on search input and hide when user are not there
  const [showSuggestions, setShowSuggestions] = useState(false);

  const searchCache = useSelector((store) => store.search);

  useEffect(() => {
    //Make an api call after every key press but if the difference between 2 API calls is  <200ms decline the API call  ----> DEBOUNCING....
    const timer = setTimeout(() => {
      /**
       *  Here 1st we are checking that the searchQuery is in store or not if it is in store than we should fetch it from store and don't make api calls otherwise we fetch it from api and we are using object because in object search time complexity is O(1).
       *
       *
       * searchCache={
       * "iphone":{"iphone11","iphone14"}
       * }
       *
       * searchQuery = iphone
       *
       */

      if (searchCache[searchQuery]) {
        setSuggestions(searchCache[searchQuery]);
      } else {
        getSearchSuggestions();
      }
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  /**
   *
   * key press - i
   *    -render the component
   *    -useEffect();
   *    -start time => make an api call after 200ms
   *
   * if any one press key before 200ms than like
   *  key press - ip
   *      - destroy the component(useEffect return method)
   *      - re render the component
   *      - useEffect()
   *      - start timer => make api call after 200ms
   *
   * if any one press key after 200ms than like
   *      than every thing will work as it is
   *
   */

  const getSearchSuggestions = async () => {
    try {
      const response = await fetch(YOUTUBE_SEARCH_API + searchQuery);
      const json = await response.json();
      //console.log(json.data); // Check the full structure
      //console.log(json.data[1]); // This should log the array of suggestions
      setSuggestions(json.data[1]); // Set the suggestions from the second array

      // Update Cache (store)
      dispatch(
        cacheResults({
          [searchQuery]: json[1],
        })
      );
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };
  return (
    <div className="grid grid-flow-col p-3 m-2 shadow-lg fixed left-0 right-0 z-10">
      <div className="flex col-span-1">
        <img
          onClick={toggleMenuHandler}
          className="h-8 cursor-pointer"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/800px-Hamburger_icon.svg.png"
          alt="hamburger-menu"
        />
        <a href="/">
          <img
            className="h-8 mx-3 cursor-pointer"
            src="https://upload.wikimedia.org/wikipedia/commons/9/90/Logo_of_YouTube_%282013-2015%29.svg"
            alt="youtube-logo"
          />
        </a>
      </div>
      <div className="col-span-10 pl-52 ">
        <div>
          <input
            className="w-1/2 border border-gray-400 rounded-l-full p-2"
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setShowSuggestions(false)}
          />
          <button className="p-2 border rounded-r-full border-gray-400 bg-gray-400">
            Search
          </button>
        </div>
        {showSuggestions && (
          <div className="fixed bg-white py-2 px-5 w-[37rem] shadow-lg rounded-lg border-gray-200">
            <ul>
              {suggestions &&
                suggestions.map((s) => (
                  <li
                    key={s}
                    className="py-2 px-3 shadow-sm hover:bg-gray-200 hover:rounded-lg hover:cursor-pointer"
                  >
                    {s}
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>
      <div className="col-span-1">
        <img
          className="h-8 cursor-pointer"
          src="https://static.vecteezy.com/system/resources/previews/004/607/791/non_2x/man-face-emotive-icon-smiling-male-character-in-blue-shirt-flat-illustration-isolated-on-white-happy-human-psychological-portrait-positive-emotions-user-avatar-for-app-web-design-vector.jpg"
          alt="user-icon"
        />
      </div>
    </div>
  );
};

export default Head;