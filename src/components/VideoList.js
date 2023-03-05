import { Link, useLocation } from "react-router-dom";
import "./videoList.css";
import { useState, useEffect } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

export default function VideoList({ videos }) {
  const [currentPage, setCurrentPage] = useState(1);
  const videosPerPage = 6;
  const [listLoaded, setListLoaded] = useState(false);
  const [likedVideos, setLikedVideos] = useState(
    JSON.parse(localStorage.getItem("likedVideos")) || []
  );
  const location = useLocation();

  const indexOfLastVideo = currentPage * videosPerPage;
  const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
  const currentVideos =
    location.pathname === "/liked"
      ? likedVideos.slice(indexOfFirstVideo, indexOfLastVideo)
      : videos.slice(indexOfFirstVideo, indexOfLastVideo);

  const pageNumbers = [];
  for (
    let i = 1;
    i <=
    Math.ceil(
      (location.pathname === "/liked" ? likedVideos.length : videos.length) /
        videosPerPage
    );
    i++
  ) {
    pageNumbers.push(i);
  }

  const handleClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };

  useEffect(() => {
    setListLoaded(true);
  }, []);

  useEffect(() => {
    localStorage.setItem("likedVideos", JSON.stringify(likedVideos));
  }, [likedVideos]);

  const handleLike = (video) => {
    if (likedVideos.includes(video)) {
      setLikedVideos(likedVideos.filter((v) => v !== video));
    } else {
      setLikedVideos([...likedVideos, video]);
    }
  };

  return (
    <div>
      <ul className="video-list">
        {currentVideos?.map((video) => (
          <li key={video.id} className="video-result">
            <div className="video-preview">
              <img src={video.snippet.thumbnails.url} />
            </div>
            <div className="video-details">
              <Link to={"/video/" + video.id.videoId}>
                <h2>{video.snippet.title}</h2>
              </Link>
              {location.pathname !== "/liked" && (
                <button onClick={() => handleLike(video)}>
                  {likedVideos.includes(video) ? "Unlike" : "Like"}
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
      {listLoaded && currentVideos.length > 0 && (
        <div className="pagination">
          <span
            className={`icon ${currentPage === 1 ? "disabled" : ""}`}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            <FaAngleLeft />
          </span>
          {pageNumbers.map((number) => (
            <span
              key={number}
              id={number}
              onClick={handleClick}
              className={currentPage === number ? "active" : null}
            >
              {number}
            </span>
          ))}
          <span
            className={`icon ${
              currentPage === pageNumbers.length ? "disabled" : ""
            }`}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            <FaAngleRight />
          </span>
        </div>
      )}
      {location.pathname === "/liked" && likedVideos.length > 0 && (
        <div>
          <h2>Liked Videos</h2>
          <ul className="video-list">
            {likedVideos.map((video) => (
              <li key={video.id} className="video-result">
                <div className="video-preview">
                  <img src={video.snippet.thumbnails.url} />
                </div>
                <div className="video-details">
                  <Link to={"/video/" + video.id.videoId}>
                    <h2>{video.snippet.title}</h2>
                  </Link>
                  <button onClick={() => handleLike(video)}>
                    {likedVideos.includes(video) ? "Unlike" : "Like"}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
