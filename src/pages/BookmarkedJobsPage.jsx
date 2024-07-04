import React, { useState, useEffect } from 'react';
import BookmarkedJobs from '../components/BookmarkedJobs';
import Notification from '../components/Notification';

const BookmarkedJobsPage = () => {
  const [bookmarkedJobs, setBookmarkedJobs] = useState([]);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const storedJobs = JSON.parse(localStorage.getItem('bookmarkedJobs')) || [];
    setBookmarkedJobs(storedJobs);
  }, []);

  const handleRemoveBookmark = (jobId) => {
    const updatedJobs = bookmarkedJobs.filter(job => job.id !== jobId);
    localStorage.setItem('bookmarkedJobs', JSON.stringify(updatedJobs));
    setBookmarkedJobs(updatedJobs);
    setNotification({ type: 'error', message: 'Job removed from bookmarks.' });
    setTimeout(() => {
      setNotification(null);
    }, 4000); 
  };

  return (
    <div className="bookmarked-jobs-page p-4">
      <BookmarkedJobs jobs={bookmarkedJobs} handleRemoveBookmark={handleRemoveBookmark} />
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

export default BookmarkedJobsPage;
