import React from 'react';

const JobDetail = ({ job, handleBookmark }) => {
  if (!job) return <div>Loading...</div>;

  return (
    <div className="job-detail p-4">
      <button className="text-blue-500 underline mb-4" onClick={() => window.history.back()}>❮ back to last search</button>
      <h1 className="text-2xl font-bold">{job.title}</h1>
      <p className="text-lg font-semibold">EASY APPLY</p>
      <p className="text-md"><strong>Location:</strong> {job.location.display_name}</p>
      <p className="text-md"><strong>Company:</strong> {job.company.display_name}</p>
      <p className="text-md"><strong>Salary:</strong> ${Math.round(job.salary_min).toLocaleString()} - ${Math.round(job.salary_max).toLocaleString()}</p>
      <a href={job.redirect_url} className="text-blue-500 underline">Apply for this job</a>

      <div className="mt-4">
        <h2 className="text-xl font-semibold">Overview</h2>
        <div dangerouslySetInnerHTML={{ __html: job.description }}></div>
      </div>

      <button onClick={() => handleBookmark(job)} className="text-blue-500 underline mt-4">Bookmark</button>
    </div>
  );
};

export default JobDetail;
