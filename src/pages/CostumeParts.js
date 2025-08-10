import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AddCostumeParts from "../pages/AddCostumeParts";
import "../styles/ChoreographiesCostume.css";

const CostumeParts = () => {
  const [costumeParts, setCostumeParts] = useState([]);
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userid");
  const navigate = useNavigate();

  const fetchCostumeParts = () => {
    axios
      .get("https://localhost:7027/Costume/GetAllCostumeParts/{$costumeId}/{$userId}", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((res) => setCostumeParts(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchCostumeParts();
  }, []);

  const handleCostumeClick = (costumeId) => {
    navigate(`/costumeParts/${costumeId}/${userId}`);
  };

  return (
    <div className="page-container">
      <div className="left-panel">
        <h2>All costume parts</h2>
        <ul>
          {costumeParts.map((ch) => (
            <li
              key={ch.id}
              className="choreo-card"
              onClick={() => handleCostumeClick(ch.id)}
              style={{ cursor: "pointer" }}
            >
              <p><strong>Region:</strong> {ch.region}</p>
              <p><strong>Name:</strong> {ch.name}</p>
              <p><strong>Part number:</strong> {ch.partNumber}</p>
              <p><strong>Status:</strong> {ch.status}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="right-panel">
        <AddCostumeParts onAdded={fetchCostumeParts} />
      </div>
    </div>
  );
};

export default CostumeParts;