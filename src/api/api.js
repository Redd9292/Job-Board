// src/api.js
const ADZUNA_APP_ID = import.meta.env.VITE_ADZUNA_APP_ID;
const ADZUNA_APP_KEY = import.meta.env.VITE_ADZUNA_APP_KEY;
const ADZUNA_API_BASE_URL = "https://api.adzuna.com";

console.log("ADZUNA_APP_ID:", ADZUNA_APP_ID);
console.log("ADZUNA_APP_KEY:", ADZUNA_APP_KEY);

export { ADZUNA_APP_ID, ADZUNA_APP_KEY, ADZUNA_API_BASE_URL };

export const fetchJobs = async (description = "", location = "", page = 1) => {
  const url = `${ADZUNA_API_BASE_URL}/v1/api/jobs/us/search/${page}?app_id=${ADZUNA_APP_ID}&app_key=${ADZUNA_APP_KEY}&what=${description}&where=${location}`;
  console.log("Fetching jobs from URL:", url);

  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`Error fetching job details: ${response.statusText}`);
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    const data = await response.json();
    console.log("API Response Data:", data);

    console.log("Total Jobs Count:", data.count);
    console.log("Results Per Page:", data.results_per_page);

    const totalPages = Math.ceil(data.count / data.results_per_page);
    console.log("Total Pages:", totalPages);

    return {
      jobs: data.results,
      totalPages: totalPages || 1,
    };
  } catch (error) {
    console.error("Error fetching job details:", error);
    throw error;
  }
};
