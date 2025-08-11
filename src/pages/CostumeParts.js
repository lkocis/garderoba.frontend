import React, { useEffect, useState } from "react";
import axios from "axios";
import AddCostumeParts from "../pages/AddCostumeParts";
import "../styles/ChoreographiesCostume.css";
import { useParams } from "react-router-dom";

const CostumeParts = () => {
  const [costumeParts, setCostumeParts] = useState([]);
  const token = localStorage.getItem("token");
  const { userId, costumeId } = useParams();
  const [ error, setError ] = useState("");

  console.log("userId", userId, "costumeId", costumeId);

  const fetchCostumeParts = () => {
    axios
      .get(`https://localhost:7027/Costume/GetAllCostumeParts/${userId}/${costumeId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((response) => setCostumeParts(response.data))
      .catch(() => setError("Greška prilikom dohvaćanja kostima."));
  };

  useEffect(() => {
      fetchCostumeParts();
    }, [userId, costumeId, token]);

  return (
    <div className="page-container">
      <div className="left-panel">
        {error && <p className="error-message">{error}</p>}
        <h2>My costume parts for selected costumes</h2>
        <ul>
          {costumeParts.map((cp) => (
            <li
              key={cp.id}
              className="choreo-card"
            >
              <p><strong>Region:</strong> {cp.region}</p>
              <p><strong>Name:</strong> {cp.name}</p>
              <p><strong>Part number:</strong> {cp.partNumber}</p>
              <p><strong>Status:</strong> {cp.status}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="right-panel">
        <AddCostumeParts costumeId={costumeId} onAdded={fetchCostumeParts} />
      </div>
    </div>
  );
};

export default CostumeParts;