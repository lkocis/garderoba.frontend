import React, { useState } from "react";
import axios from "axios";

const AddCostume = ({ onAdded, choreographyId }) => {
  const [formData, setFormData] = useState({
    name: "",
    area: "",
    gender: "",      
    necessaryParts: ""
  });

  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.gender) {
      setError("Fill in necessary fields: name, gender.");
      return;
    }

    try {
      const payload = {
        name: formData.name,
        area: formData.area,
        gender: parseInt(formData.gender),
        necessaryParts: formData.necessaryParts,
        choreographyId: choreographyId  
      };

      console.log("Token being sent:", token);
    console.log("Payload being sent:", payload);

      const response = await axios.post(
        "https://localhost:7027/Costume/CreateCostume",
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (onAdded) onAdded(response.data);
      setFormData({
        name: "",
        area: "",
        gender: "",
        necessaryParts: "",
        choreographyId: ""
      });
      setError("");
    } catch (err) {
      setError("Error while fetching costumes.");
    }
  };

  return (
    <div>
      <h2>Add costume</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
        </label>

        <label>
          Area:
          <input type="text" name="area" value={formData.area} onChange={handleInputChange} />
        </label>

        <label>
          Gender:
          <select name="gender" value={formData.gender} onChange={handleInputChange} required>
            <option value="">Choose</option>
            <option value="0">Men</option>
            <option value="1">Women</option>
          </select>
        </label>
        <br /><br />

        <label>
          Necessary Parts (Copy from Costume components tab!):
          <input type="text" name="necessaryParts" value={formData.necessaryParts} onChange={handleInputChange} />
        </label>

        <br /><br />
        <button type="submit">Add costume</button>
      </form>
    </div>
  );
};

export default AddCostume;
