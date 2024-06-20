// src/api.js
const ADZUNA_APP_ID = import.meta.env.VITE_ADZUNA_APP_ID;
const ADZUNA_APP_KEY = import.meta.env.VITE_ADZUNA_APP_KEY;
const ADZUNA_API_BASE_URL = "https://api.adzuna.com";

console.log("ADZUNA_APP_ID:", ADZUNA_APP_ID);
console.log("ADZUNA_APP_KEY:", ADZUNA_APP_KEY);

export { ADZUNA_APP_ID, ADZUNA_APP_KEY, ADZUNA_API_BASE_URL };

export const fetchJobs = async (description = "", location = "") => {
  const url = `${ADZUNA_API_BASE_URL}/v1/api/jobs/us/search/1?app_id=${ADZUNA_APP_ID}&app_key=${ADZUNA_APP_KEY}&what=${description}&where=${location}`;
  console.log("Fetching jobs from URL:", url);

  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`Error fetching job details: ${response.statusText}`);
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    const data = await response.json();
    console.log("API Response Data:", data);
    return data.results;
  } catch (error) {
    console.error("Error fetching job details:", error);
    throw error;
  }
};
