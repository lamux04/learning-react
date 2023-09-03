import { useFilters } from '../hooks/useFilters';
import './footer.css';

export function Footer () {
  const { filters } = useFilters();
  return (
    <footer className="footer">
      <h4>Prueba técnica de React</h4>
      <span>@lamux04</span>
      <h5>Shopping Cart con useContext & useReducer</h5>
    </footer>
  );
}
