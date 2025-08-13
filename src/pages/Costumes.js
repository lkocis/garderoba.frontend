import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FaTrash } from "react-icons/fa"; // <-- using FaTrash
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

  const handleCostumeClick = (costumeId) => {
    navigate(`/costumeParts/${userId}/${costumeId}`);
  };

  const handleDeleteCostume = (e, costumeId) => {
    e.stopPropagation(); // prevent triggering the click on the card
    if (!window.confirm("Are you sure you want to delete this costume?")) return;

    axios
      .delete(`https://localhost:7027/Costume/DeleteCostumeWithParts/${costumeId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => fetchCostumes())
      .catch((err) => {
        console.error(err);
        alert("Failed to delete costume.");
      });
  };

  return (
    <div className="page-container">
      <div className="left-panel">
        {error && <p className="error-message">{error}</p>}
        <h2>My Costumes for selected choreography</h2>
        <ul>
          {costumes.map((co) => (
            <li
              key={co.id}
              className="choreo-card"
              onClick={() => handleCostumeClick(co.id)}
              style={{ position: "relative", cursor: "pointer" }}
            >
              <p><strong>Name:</strong> {co.name}</p>
              <p><strong>Area:</strong> {co.area}</p>
              <p><strong>Gender:</strong> {co.gender}</p>
              <p><strong>Status:</strong> {co.status}</p>

              {/* Trash can icon */}
              <FaTrash
                onClick={(e) => handleDeleteCostume(e, co.id)}
                style={{
                  position: "absolute",
                  bottom: "10px",
                  right: "10px",
                  color: "red",
                  cursor: "pointer",
                  fontSize: "1.2rem",
                }}
                title="Delete Costume"
              />
            </li>
          ))}
        </ul>
      </div>
      <div className="right-panel">
        <AddCostume choreographyId={choreographyId} onAdded={fetchCostumes} />
      </div>
    </div>
  );
};

export default Costumes;
