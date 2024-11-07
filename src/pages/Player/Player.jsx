import './Player.css';

import {
  useEffect,
  useState,
} from 'react';

import axios from 'axios';
import {
  useNavigate,
  useParams,
} from 'react-router-dom';

import back_arrow_icon from '../../assets/back_arrow_icon.png';

const Player = () => {
  const navigation=useNavigate();
  const { id } = useParams();
  const [apiData, setApiData] = useState({
    name: "",
    published_at: "",
    type: "",
    key: "",
  });
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  const options = {
    method: "GET",
    url: `https://api.themoviedb.org/3/movie/${id}/videos`,
    params: { language: "en-US" },
    headers: {
      accept: "application/json",
      Authorization:
        `Bearer ${apiKey}`,
    },
  };

  const fetchData = async () => {
    try {
      const response = await axios.request(options);
      const { name, published_at, type, key } = response.data.results[0]; // destructuring here

      setApiData({
        name,
        published_at,
        type,
        key,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const { name, published_at, type, key } = apiData;
  return (
    <div className="player">
      <img src={back_arrow_icon} alt="Back arrow icon" onClick={()=>{navigation(`/`)}}/>
      <iframe
        src={`https://www.youtube.com/embed/${key}`}
        width="90%"
        height="90%"
        title="Trailer"
        allowFullScreen
      ></iframe>
      <div className="playerInfo">
        <p>Published Date: {published_at.slice(0,10) || "N/A"}</p>
        <p>Name: {name || "N/A"}</p>
        <p>Type: {type || "N/A"}</p>
      </div>
    </div>
  );
};

export default Player;
