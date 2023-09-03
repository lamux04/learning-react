import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { FiltersProvider } from './contexts/filters.jsx';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <FiltersProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </FiltersProvider>
);
