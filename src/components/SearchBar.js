import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./SearchBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ videos, setVideos }) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const queryFromUrl = searchParams.get("q");
    if (queryFromUrl) {
      setQuery(queryFromUrl);
      handleSearch(queryFromUrl);
    }
  }, [location.search]);

  const handleSearch = async (query) => {
    try {
      const response = await axios.get(
        `https://youtube.thorsteinsson.is/api/search?q=${query}`
      );
      setVideos(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      navigate("/");
    }
  };

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch(query);
    }
  };

  return (
    <div className="search-container">
      <div className="search-input">
        <input
          type="text"
          value={query}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
        />

        {videos &&
          videos.map((video) => {
            return <h1>video.title</h1>;
          })}
        <button onClick={() => handleSearch(query)}>
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;

// id = "xxxxx"
// state of the video = isopen, isclose
// isopen = when you are on the list page and you already chose and a video
// list of videos (page)
// one video (page)

// App.js
// video page, list page
