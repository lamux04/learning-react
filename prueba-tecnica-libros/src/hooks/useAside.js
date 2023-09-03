import { useRef } from 'react';

export function useAside () {
  const $aside = useRef(null);

  const handleCloseAside = (ev) => {
    const keyframe = [
      { transform: 'translateX(0)' },
      { transform: 'translateX(300px)' }
    ];

    $aside.current.animate(keyframe, 500);
    setTimeout(() => {
      $aside.current.style.display = 'none';
    }, 500);
  };

  const handleOpenAside = (ev) => {
    const keyframe = [
      { transform: 'translateX(300px)' },
      { transform: 'translateX(0)' }
    ];

    $aside.current.style.display = 'block';
    $aside.current.animate(keyframe, 500);
  };

  return { $aside, handleCloseAside, handleOpenAside };
}
