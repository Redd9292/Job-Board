import React, { useState } from 'react';

const JobFilter = ({ setFilteredJobs, jobs }) => {
  const [category, setCategory] = useState('');
  const [type, setType] = useState('');

  const handleFilter = () => {
    let filtered = jobs;
    if (category) {
      filtered = filtered.filter(job => job.category && job.category.label === category);
    }
    if (type) {
      filtered = filtered.filter(job => job.contract_time === type);
    }
    setFilteredJobs(filtered);
  };

  return (
    <div className="job-filter mt-4">
      <select value={category} onChange={(e) => setCategory(e.target.value)} className="p-2 border rounded">
        <option value="">All Categories</option>
        <option value="Software">Software</option>
        <option value="Marketing">Marketing</option>
        {/* Add more categories */}
      </select>
      <select value={type} onChange={(e) => setType(e.target.value)} className="ml-2 p-2 border rounded">
        <option value="">All Types</option>
        <option value="Full-Time">Full-Time</option>
        <option value="Part-Time">Part-Time</option>
        {/* Add more types */}
      </select>
      <button onClick={handleFilter} className="ml-2 p-2 bg-blue-500 text-white rounded">Filter</button>
    </div>
  );
};

export default JobFilter;

