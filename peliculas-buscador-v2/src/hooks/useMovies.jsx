import { useEffect, useState } from 'react';
import { moviesRequest } from '../services/moviesApi';

export function useMovies ({ firstSearch }) {
  const [movies, setMovies] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getMovies = async (search) => {
    try {
      setLoading(true);
      const { newMovies } = await moviesRequest(search);
      setMovies(newMovies);
      setLoading(false);
    } catch (err) {
      setError(`Se ha producido un error: ${err}`);
      setLoading(false);
    }
  };

  // Tratamos el error con un useEffect
  useEffect(() => {
    if (!error) return;
    window.alert(error);
  }, [error]);

  return { movies, getMovies, loading };
}
