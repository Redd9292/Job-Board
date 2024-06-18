import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import JobDetailPage from './pages/JobDetailPage';
import BookmarkedJobsPage from './pages/BookmarkedJobsPage';
import Navbar from './components/Navbar';
import './index.css';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/job/:jobId" element={<JobDetailPage />} />
        <Route path="/bookmarked" element={<BookmarkedJobsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
