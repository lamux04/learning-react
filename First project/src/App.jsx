import './App.css';
import { TwitterFollowCard } from './TwitterFollowCard';

// Sacado de una base de datos
const users = [
  {
    userName: 'midudev',
    name: 'Miguel Angel Duran',
    isFollowing: false
  },
  {
    userName: 'pheralb',
    name: 'Pablo Hernandez',
    isFollowing: true
  },
  {
    userName: 'PacoHdezs',
    name: 'Paco Hdez',
    isFollowing: true
  },
  {
    userName: 'lamux04',
    name: 'Javier Labrador',
    isFollowing: false
  }
];

export function App () {
  return (
    <section className='App'>
      {
        users.map(({ userName, name, isFollowing }) => (
          <TwitterFollowCard
            key={userName}
            username={userName}
            initialIsFollowing={isFollowing}
          >
            {name}
          </TwitterFollowCard>
        )
        )
      }
    </section>
  );
}
