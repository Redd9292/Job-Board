import React from 'react';
import { Link } from 'react-router-dom';

const JobList = ({ jobs, handleBookmark }) => {
  return (
    <div className="job-list">
      {jobs.map((job) => (
        <div key={job.id} className="job-item p-4 border mb-4">
          <Link to={`/job/${job.id}`} className="no-underline text-black">
            <h2 className="text-xl font-bold">{job.title}</h2>
            <p>{job.company.display_name}</p>
            <p>{job.location.display_name}</p>
            <p>Salary: ${Math.round(job.salary_min).toLocaleString()} - ${Math.round(job.salary_max).toLocaleString()}</p>
            <div dangerouslySetInnerHTML={{ __html: job.description }}></div>
          </Link>
          <a href={job.redirect_url} className="text-blue-500 underline">Apply here</a>
          <button onClick={() => handleBookmark(job)} className="text-blue-500 underline ml-4">Bookmark</button>
        </div>
      ))}
    </div>
  );
};

export default JobList;

