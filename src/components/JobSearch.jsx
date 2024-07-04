import React, { useState } from 'react';
import { fetchJobs } from '../api/api';

const JobSearch = ({ setFilteredJobs }) => {
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    const { jobs } = await fetchJobs(description, location);
    setFilteredJobs(jobs || []);
  };

  return (
    <form onSubmit={handleSearch} className="job-search mb-4">
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Job title or description"
        className="p-2 border rounded w-full mb-2"
      />
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Location"
        className="p-2 border rounded w-full mb-2"
      />
      <button type="submit" className="p-2 bg-blue-500 text-white rounded">
        Search
      </button>
    </form>
  );
};

export default JobSearch;

