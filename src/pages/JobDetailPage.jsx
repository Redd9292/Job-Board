import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import JobDetail from '../components/JobDetail';
import { ADZUNA_API_BASE_URL, ADZUNA_APP_ID, ADZUNA_APP_KEY } from '../api/api';
import Notification from '../components/Notification';

const JobDetailPage = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [notification, setNotification] = useState(null);

  const handleBookmark = (job) => {
    const storedJobs = JSON.parse(localStorage.getItem('bookmarkedJobs')) || [];
    if (!storedJobs.some(storedJob => storedJob.id === job.id)) {
      storedJobs.push(job);
      localStorage.setItem('bookmarkedJobs', JSON.stringify(storedJobs));
      setNotification({ type: 'success', message: 'Job bookmarked successfully.' });
      setTimeout(() => {
        setNotification(null);
      }, 4000); 
    } else {
      const updatedJobs = storedJobs.filter(storedJob => storedJob.id !== job.id);
      localStorage.setItem('bookmarkedJobs', JSON.stringify(updatedJobs));
      setNotification({ type: 'error', message: 'Job removed from bookmarks.' });
      setTimeout(() => {
        setNotification(null);
      }, 4000);
    }
  };

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const url = `${ADZUNA_API_BASE_URL}/v1/api/jobs/us/search/1?app_id=${ADZUNA_APP_ID}&app_key=${ADZUNA_APP_KEY}&results_per_page=1&what=${jobId}`;
        console.log("Fetching job details from URL:", url);

        const response = await fetch(url);

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
      {notification && (
        <Notification 
          type={notification.type} 
          message={notification.message} 
          onClose={() => setNotification(null)} 
        />
      )}
    </div>
  );
};

export default JobDetailPage;
