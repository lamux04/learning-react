import { useState } from 'react';

export function useForm () {
  const [error, setError] = useState(null);

  const validateSearch = ({ search }) => {
    let newError = null;
    if (search === '') newError = 'La busqueda no puede estar vacia';
    if (search.startsWith(' ')) newError = 'La busqueda no puede empezar por un espacio vacio';
    setError(newError);

    return newError;
  };

  return { error, validateSearch };
}
