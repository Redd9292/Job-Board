import React, { useState, useEffect } from 'react';
import JobSearch from '../components/JobSearch';
import JobFilter from '../components/JobFilter';
import JobList from '../components/JobList';
import Pagination from '../components/Pagination';
import { fetchJobs } from '../api/api';
import Notification from '../components/Notification';

const HomePage = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [notification, setNotification] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadJobs = async () => {
      setLoading(true);
      const { jobs, totalPages } = await fetchJobs("", "", currentPage);
      setJobs(jobs || []);
      setFilteredJobs(jobs || []);
      setTotalPages(totalPages);
      setLoading(false);
    };
    loadJobs();
  }, [currentPage]);

  const handleBookmark = (job) => {
    const storedJobs = JSON.parse(localStorage.getItem('bookmarkedJobs')) || [];
    if (!storedJobs.some(storedJob => storedJob.id === job.id)) {
      storedJobs.push(job);
      localStorage.setItem('bookmarkedJobs', JSON.stringify(storedJobs));
      setNotification({ type: 'success', message: 'Job bookmarked successfully.' });
      setTimeout(() => {
        setNotification(null);
      }, 4000); 
    }
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="home-page mt-20 p-4">
      <JobSearch setFilteredJobs={setFilteredJobs} />
      <JobFilter setFilteredJobs={setFilteredJobs} jobs={jobs} />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <JobList jobs={filteredJobs} handleBookmark={handleBookmark} />
      )}
      {notification && (
        <Notification 
          type={notification.type} 
          message={notification.message} 
          onClose={() => setNotification(null)} 
        />
      )}
      <div className="flex justify-center mt-4">
      <Pagination 
        currentPage={currentPage} 
        totalPages={totalPages} 
        onPageChange={handlePageChange} 
      />
      </div>
    </div>
  );
};

export default HomePage;
