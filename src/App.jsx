import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import MovieFinder from './components/MovieFinder';
import AIRecommendations from './components/AIRecommendations';
import MovieDetails from './Pagaes/MovieDetails';

function App() {
  return (
    <>
      <Navbar />
      <main className="container mx-auto p-4 bg-neutral-900">
        <Routes>
          <Route path="/" element={<MovieFinder />} exact />
          
          <Route path="/ai-recommendations" element={<AIRecommendations />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          
          {/* <Route path="*" element={<div>Page Not Found</div>} /> */}
        </Routes>
      </main>
    </>
  );
}

export default App;