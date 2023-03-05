import { useParams } from "react-router-dom";
import { Divider, Button } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import { useEffect, useState } from "react";
import YouTube from "react-youtube";
import "./Video.css";

export default function Video({ setCurrentVideo }) {
  const { id } = useParams();
  const [videoData, setVideoData] = useState({});
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
  setCurrentVideo(id);
  useEffect(() => {
    fetch(`https://youtube.thorsteinsson.is/api/videos/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setVideoData(data);
      });
  }, [id]);
  // swr

  return (
    <div className="video-container">
      <YouTube videoId={id} />
      <Divider />
      <Button
        variant="outlined"
        onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}
        startIcon={isDescriptionOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      >
        {isDescriptionOpen ? "Description" : "Description"}
      </Button>

      {isDescriptionOpen && (
        <p className="video-description">{videoData.description}</p>
      )}
    </div>
  );
}

// outlet is video
