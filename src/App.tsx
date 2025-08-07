import React, { useState, useEffect } from 'react';
import Input from './components/Input';
import MovieCard from './components/MovieCard';
import { fetchMovies } from './MovieApi';
import './App.scss';

const App: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>(''); 
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  useEffect(() => {
    if (query === '') {
      setMovies([]);
      setError('');
      setPage(1);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await fetchMovies(query, 1); 
        if (data.length === 0) {
          setError('Film not found :(');
          setHasMore(false);
        } else {
          setMovies(data);
          setHasMore(true);
        }
      } catch (error) {
        console.error("Error:", error);
        setError('Film not found :(');
      }
      setLoading(false);
    };

    const delay = setTimeout(() => {
      fetchData();
    }, 500);

    return () => clearTimeout(delay);
  }, [query]);

  const loadMoreMovies = async () => {
    if (!hasMore || loading) return;

    const nextPage = page + 1;
    setLoading(true);
    try {
      const newMovies = await fetchMovies(query, nextPage);
      if (newMovies.length === 0) {
        setHasMore(false);
      } else {
        setMovies((prevMovies) => [...prevMovies, ...newMovies]); 
        setPage(nextPage);
      }
    } catch (error) {
      console.error("Error:", error);
      setError('Failed to load more movies.');
    }
    setLoading(false);
  };

  return (
    <div className="app">
      <h1>Popcorn & Pixels</h1>
      <Input value={query} onChange={(e) => {
        setQuery(e.target.value);
        setPage(1);
        setError(''); 
        setMovies([]);
      }} />
      
      {loading && (
        <div className="loading">
          <div className="spinner"></div>
        </div>
      )}
      
      {error && <p className="error-message">{error}</p>}

      <div className="movie-list">
        {movies.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            title={movie.Title}
            year={movie.Year}
            poster={movie.Poster}
            type={movie.Type}
            imdbID={movie.imdbID}
          />
        ))}
      </div>

      {hasMore && movies.length > 0 && !loading && (
        <button onClick={loadMoreMovies} className="load-more-btn">Load More</button>
      )}
    </div>
  );
};

export default App;
