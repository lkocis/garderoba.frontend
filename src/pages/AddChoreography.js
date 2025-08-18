import React, { useState } from "react";
import axios from "axios";

const AddChoreography = ({ onAdded }) => {
  const [formData, setFormData] = useState({
    name: "",
    area: "",
    menCostumeCount: 0,
    womenCostumeCount: 0
  });
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name.includes("CostumeCount") ? parseInt(value) : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("https://localhost:7027/Choreography/CreateChoreography", formData, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((res) => {
        if (onAdded) onAdded(res.data); 
        setFormData({ name: "", area: "", menCostumeCount: 0, womenCostumeCount: 0 });
      })
      .catch(() => setError("Error while fetching choreographies."));
  };

  return (
    <div>
      <h2>Add new choreography</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </label>

        <label>
          Area:
          <input
            type="text"
            name="area"
            value={formData.area}
            onChange={handleInputChange}
            required
          />
        </label>

        <label>
          Men costumes:
          <input
            type="number"
            name="menCostumeCount"
            value={formData.menCostumeCount}
            onChange={handleInputChange}
            min="0"
            required
          />
        </label>

        <label>
          Women costumes:
          <input
            type="number"
            name="womenCostumeCount"
            value={formData.womenCostumeCount}
            onChange={handleInputChange}
            min="0"
            required
          />
        </label>

        <button type="submit">Add choreography</button>
      </form>
    </div>
  );
};

export default AddChoreography;
