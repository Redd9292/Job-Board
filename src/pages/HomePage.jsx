import React, { useState, useEffect } from 'react';
import JobSearch from '../components/JobSearch';
import JobFilter from '../components/JobFilter';
import JobList from '../components/JobList';
import { fetchJobs } from '../api/api';

const HomePage = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    const loadJobs = async () => {
      const jobs = await fetchJobs();
      setJobs(jobs);
      setFilteredJobs(jobs);
    };
    loadJobs();
  }, []);

  const handleBookmark = (job) => {
    const storedJobs = JSON.parse(localStorage.getItem('bookmarkedJobs')) || [];
    if (!storedJobs.some(storedJob => storedJob.id === job.id)) {
      storedJobs.push(job);
      localStorage.setItem('bookmarkedJobs', JSON.stringify(storedJobs));
    }
  };

  return (
    <div className="home-page p-4">
      <JobSearch setFilteredJobs={setFilteredJobs} />
      <JobFilter setFilteredJobs={setFilteredJobs} jobs={jobs} />
      <JobList jobs={filteredJobs} handleBookmark={handleBookmark} />
    </div>
  );
};

export default HomePage;
