import { Routes, Route } from 'react-router-dom';
import Navbar from './components/NavBar';
import MovieFinder from './components/MovieFinder';
import AIRecommendations from './components/AIRecommendations';

function App() {
  return (
    <>
      <Navbar />
      <main className="container mx-auto p-4 bg-neutral-900">
        <Routes>
          {/* Exact root path match */}
          <Route path="/" element={<MovieFinder />} exact />
          
          {/* AI Recommendations path */}
          <Route path="/ai-recommendations" element={<AIRecommendations />} />
          
          {/* Optional: Catch-all route for 404 pages */}
          {/* <Route path="*" element={<div>Page Not Found</div>} /> */}
        </Routes>
      </main>
    </>
  );
}

export default App;