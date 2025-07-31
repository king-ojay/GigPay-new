import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    fetch(`/api/jobs/${id}`)
      .then((res) => res.json())
      .then((data) => setJob(data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!job) return <div className="p-4">Loading job details...</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow rounded-xl mt-6">
      <h1 className="text-2xl font-bold">{job.title}</h1>
      <p className="text-gray-600 mt-2">{job.company}</p>
      <p className="mt-4">{job.description}</p>
      <p className="mt-2 text-sm text-gray-500">Location: {job.location}</p>
      <button className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        Apply Now
      </button>
    </div>
  );
}
