import './TitleCards.css';

import React, {
  useEffect,
  useRef,
  useState,
} from 'react';

import axios from 'axios';
import { Link } from 'react-router-dom';

const TitleCards = ({ title, category }) => {
  const scrollHori = useRef();
  const [apiData, setApiData] = useState([]);

  const options = {
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNGY1N2RkYzRkZGRmNjNlOTBhZDg0MWIwYTc0MTQ4OSIsIm5iZiI6MTczMDM2ODI0My43NjgzOCwic3ViIjoiNjcyMzUwY2QwMDNjNGI1YjViNjQ0NzdhIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.mEib3s1nTSiuqI9vOVd7jmQEqDhDXvKgNkRASrSgCxg'
    }
  };

  const handleScroll = (event) => {
    event.preventDefault();
    scrollHori.current.scrollLeft += event.deltaY;
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`,
        options
      );
      setApiData(response.data.results);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    if (scrollHori.current) {
      scrollHori.current.addEventListener("wheel", handleScroll);
    }

    fetchData();

    return () => {
      if (scrollHori.current) {
        scrollHori.current.removeEventListener("wheel", handleScroll);
      }
    };
  }, [category]);

  return (
    <div className="titleCards">
      <h2>{title || "Popular on Netflix"}</h2>
      <div className="cardList" ref={scrollHori}>
        {apiData.map((movie) => {
          const { poster_path, title, id } = movie;
          return (
            <Link to={`/player/${id}`} className="card" key={id}>
              <img
                src={poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : '/path/to/fallback/image.jpg'}
                alt={title || "Movie Poster"}
              />
              <p>{title || "Untitled"}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default TitleCards;
