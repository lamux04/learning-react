import { useRef } from 'react';

export function useFirstRender () {
  const firstSearch = useRef(true);

  const notFirstSearch = () => {
    firstSearch.current = false;
  };

  return { firstSearch, notFirstSearch };
}
