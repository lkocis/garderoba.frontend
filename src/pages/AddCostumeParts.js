import React, { useState } from "react";
import axios from "axios";

const AddCostumeParts = ({ onAdded, costumeId }) => {
  const [formData, setFormData] = useState({
    region: "",
    name: "",
    partNumber: "",       
    status: ""
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

    try {
      const payload = {
        region: formData.region,
        name: formData.name,
        partNumber: formData.partNumber,
        status: parseInt(formData.status),
        costumeId: costumeId
      };

      const response = await axios.post(
        `https://localhost:7027/Costume/AddCostumePart`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (onAdded) onAdded(response.data);
      setFormData({
        region: "",
        name: "",
        partNumber: "",
        status: "",
        costumeId: ""
      });
      setError("");
    } catch (err) {
      setError("Greška prilikom dodavanja kostima.");
    }
  };

  return (
    <div>
      <h2>Add costume part</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Body Region:
          <input type="text" name="region" value={formData.region} onChange={handleInputChange} required />
        </label>

        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
        </label>

        <label>
          Part number:
          <input type="text" name="partNumber" value={formData.partNumber} onChange={handleInputChange} />
        </label>
        <br /><br />

        <label>
          Status:
          <select name="status" value={formData.status} onChange={handleInputChange} required>
            <option value="">Odaberi</option>
            <option value="0">AllAvailable</option>
            <option value="1">SomeMissing</option>
          </select>
        </label>
        
        <br /><br />
        <button type="submit">Add costume part</button>
      </form>
    </div>
  );
};

export default AddCostumeParts;