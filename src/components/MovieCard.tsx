import React from "react";

interface MovieCardProps {
  title: string;
  year: string;
  poster: string;
  type: string;
  imdbID: string;
}

const MovieCard: React.FC<MovieCardProps> = React.memo(({ title, year, poster, type, imdbID }) => {
  return (
    <div className="movie-card">
      <div className="movie-image">
        {poster === "N/A" || !poster  ? (
          <div className="icon-placeholder">
            <i className="fa fa-film"></i>
            <span>No Image</span>
          </div>
        ) : (
          <img src={poster} alt={title} />
        )}
      </div>
      <div className="movie-content">
        <h3>{title} ({year})</h3>
        <p><strong>Тип:</strong> {type.toUpperCase()}</p>
        <div className="movie-footer">
          <a 
            href={`https://www.imdb.com/title/${imdbID}`} 
            target="_blank" 
            rel="noopener noreferrer"
          >
           More on IMDb
          </a>
        </div>
      </div>
    </div>
  );
});

export default MovieCard;
