import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BurgerNavbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import VideoList from "./components/VideoList";
import Video from "./components/Video";
import "./styles.css";
import YouTube from "react-youtube";

function App(props) {
  const [videos, setVideos] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [likedVideos, setLikedVideos] = useState([]);

  const handleLike = (video) => {
    if (likedVideos.includes(video)) {
      setLikedVideos(likedVideos.filter((v) => v !== video));
    } else {
      setLikedVideos([...likedVideos, video]);
    }
  };

  console.log(currentVideo);

  return (
    <Router>
      {currentVideo && window.location.pathname === "/" && (
        <div style={{ position: "fixed", left: "00%", bottom: "10px" }}>
          <YouTube videoId={currentVideo} />
        </div>
      )}
      <BurgerNavbar />
      <SearchBar setVideos={setVideos} />

      <Routes>
        <Route path="/" exact element={<VideoList videos={videos} />} />
        <Route
          path="/video/:id"
          exact
          element={
            <Video onLike={handleLike} setCurrentVideo={setCurrentVideo} />
          }
        />
        <Route
          path="/liked"
          exact
          element={<VideoList videos={likedVideos} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
