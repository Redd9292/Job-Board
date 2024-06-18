import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import JobDetail from '../components/JobDetail';

const JobDetailPage = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);

  const handleBookmark = (job) => {
    const storedJobs = JSON.parse(localStorage.getItem('bookmarkedJobs')) || [];
    if (!storedJobs.some(storedJob => storedJob.id === job.id)) {
      storedJobs.push(job);
      localStorage.setItem('bookmarkedJobs', JSON.stringify(storedJobs));
    }
  };

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await fetch(
          `/api/v1/api/jobs/us/search/1?app_id=${import.meta.env.VITE_ADZUNA_APP_ID}&app_key=${import.meta.env.VITE_ADZUNA_APP_KEY}&results_per_page=1&what=${jobId}`
        );

        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        const data = await response.json();
        if (data.results && data.results.length > 0) {
          setJob(data.results[0]);
        } else {
          throw new Error('No job found with the specified ID');
        }
      } catch (error) {
        console.error('Error fetching job details:', error);
      }
    };
    fetchJob();
  }, [jobId]);

  if (!job) return <div>Loading...</div>;

  return (
    <div className="job-detail-page p-4">
      <JobDetail job={job} handleBookmark={handleBookmark} />
    </div>
  );
};

export default JobDetailPage;
