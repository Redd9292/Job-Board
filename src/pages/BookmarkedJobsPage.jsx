import React, { useState, useEffect } from 'react';
import BookmarkedJobs from '../components/BookmarkedJobs';

const BookmarkedJobsPage = () => {
  const [bookmarkedJobs, setBookmarkedJobs] = useState([]);

  useEffect(() => {
    const storedJobs = JSON.parse(localStorage.getItem('bookmarkedJobs')) || [];
    setBookmarkedJobs(storedJobs);
  }, []);

  const handleRemoveBookmark = (jobId) => {
    const updatedJobs = bookmarkedJobs.filter(job => job.id !== jobId);
    localStorage.setItem('bookmarkedJobs', JSON.stringify(updatedJobs));
    setBookmarkedJobs(updatedJobs);
  };

  return (
    <div className="bookmarked-jobs-page p-4">
      <BookmarkedJobs jobs={bookmarkedJobs} handleRemoveBookmark={handleRemoveBookmark} />
    </div>
  );
};

export default BookmarkedJobsPage;
