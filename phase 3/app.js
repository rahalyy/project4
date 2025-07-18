import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BookSearchAndRecommend from './BookSearchAndRecommend';
import BookDetails from './BookDetails';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-blue-600 text-white p-4 text-center text-2xl font-bold">
          Book Recommendation App
        </header>

        <main className="p-4">
          <Routes>
            <Route path="/" element={<BookSearchAndRecommend />} />
            <Route path="/book/:id" element={<BookDetails />} />
          </Routes>
        </main>

        <footer className="bg-gray-800 text-white text-center p-4 mt-10">
          &copy; 2025 Book App. All rights reserved.
        </footer>
      </div>
    </Router>
  );
}

export default App;
