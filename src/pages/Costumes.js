import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import AllCostumes from "./AllCostumes";
import AddCostume from "./AddCostume";
import "../styles/Costumes.css";

const Costumes = () => {
  const { userId, choreographyId } = useParams();
  const [costumes, setCostumes] = useState([]);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const fetchCostumes = () => {
    axios
      .get(`https://localhost:7027/Costume/GetAllCostumes/${userId}/${choreographyId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setCostumes(response.data))
      .catch(() => setError("Greška prilikom dohvaćanja kostima."));
  };

  useEffect(() => {
    fetchCostumes();
  }, [userId, choreographyId, token]);

  const handleAddCostume = (newCostume) => {
    setCostumes((prev) => [...prev, newCostume]);
  };

  const handleCostumeClick = (costumeId) => {
    navigate(`/costumeParts/${costumeId}/${userId}`);
  };

  return (
    <div className="page-container">
      <div className="left-panel">
        {error && <p className="error-message">{error}</p>}
        <h2>All Costumes</h2>
        <ul>
          {costumes.map((ch) => (
            <li
              key={ch.id}
              className="choreo-card"
              onClick={() => handleCostumeClick(ch.id)}
              style={{ cursor: "pointer" }}
            >
              <p><strong>Name:</strong> {ch.name}</p>
              <p><strong>Area:</strong> {ch.area}</p>
              <p><strong>Sex:</strong> {ch.gender}</p>
              <p><strong>Status:</strong> {ch.status}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="right-panel">
        <AddCostume choreographyId={choreographyId} onAdded={handleAddCostume} />
      </div>
    </div>
  );
};

export default Costumes;
