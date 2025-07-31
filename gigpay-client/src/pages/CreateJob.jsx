// src/pages/CreateJob.jsx
import { useState } from "react";

const CreateJob = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Job Submitted:", { title, description });
    // TODO: Add API call
  };

  return (
    <div>
      <h2>Create a Job</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Job Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Job Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Post Job</button>
      </form>
    </div>
  );
};

export default CreateJob;
