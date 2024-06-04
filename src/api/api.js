const ADZUNA_APP_ID = import.meta.env.VITE_ADZUNA_APP_ID;
const ADZUNA_APP_KEY = import.meta.env.VITE_ADZUNA_APP_KEY;

export const fetchJobs = async (description = "", location = "") => {
  const response = await fetch(
    `https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=${ADZUNA_APP_ID}&app_key=${ADZUNA_APP_KEY}&what=${description}&where=${location}`
  );
  const data = await response.json();
  return data.results;
};
