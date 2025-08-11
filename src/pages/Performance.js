import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/ChoreographiesCostume.css";

const Performance = () => {
  const [choreographies, setChoreographies] = useState([]);
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userid");
  const navigate = useNavigate();

  const fetchChoreographies = () => {
    axios
      .get("https://localhost:7027/Choreography/GetAllChoreographies", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((res) => setChoreographies(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchChoreographies();
  }, []);

  const handleChoreographyClick = (choreographyId) => {
  navigate(`/costume-calculator/${userId}/${choreographyId}`);
};

  return (
    <div className="page-container">
      <div className="left-panel" style={{ width: "100%" }}>
        <h2>Pick choreography</h2>
        <ul>
          {choreographies.map((ch) => (
            <li
              key={ch.id}
              className="choreo-card"
              onClick={() => handleChoreographyClick(ch.id)}
              style={{ cursor: "pointer" }}
            >
              <p><strong>Name:</strong> {ch.name}</p>
              <p><strong>Area:</strong> {ch.area}</p>
              <p><strong>Men costumes:</strong> {ch.menCostumeCount}</p>
              <p><strong>Women costumes:</strong> {ch.womenCostumeCount}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Performance;
