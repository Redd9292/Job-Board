import React from 'react';

const BookmarkedJobs = ({ jobs, handleRemoveBookmark }) => {
  return (
    <div className="bookmarked-jobs">
      <h1 className="text-2xl font-bold">Bookmarked Jobs</h1>
      {jobs.length > 0 ? (
        jobs.map((job) => (
          <div key={job.id} className="job-item p-4 border mb-4">
            <h2 className="text-xl font-bold">{job.title}</h2>
            <p>{job.company.display_name}</p>
            <p>{job.location.display_name}</p>
            <p>Salary: ${Math.round(job.salary_min).toLocaleString()} - ${Math.round(job.salary_max).toLocaleString()}</p>
            <div dangerouslySetInnerHTML={{ __html: job.description }}></div>
            <a href={job.redirect_url} className="text-blue-500 underline">Apply here</a>
            <button
              onClick={() => handleRemoveBookmark(job.id)}
              className="text-red-500 underline ml-4"
            >
              Remove Bookmark
            </button>
          </div>
        ))
      ) : (
        <p>No bookmarked jobs found.</p>
      )}
    </div>
  );
};

export default BookmarkedJobs;

