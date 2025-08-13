import React, { useEffect, useState } from "react";
import axios from "axios";
import AddCostumeParts from "../pages/AddCostumeParts";
import "../styles/ChoreographiesCostume.css";
import { useParams } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

const CostumeParts = () => {
  const [costumeParts, setCostumeParts] = useState([]);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");
  const { userId, costumeId } = useParams();

  const fetchCostumeParts = async () => {
    await axios
      .get(`https://localhost:7027/Costume/GetAllCostumeParts/${userId}/${costumeId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
      console.log("Costume parts fetched:", response.data); 
      setCostumeParts(response.data);
      })
      .catch(() => setError("Greška prilikom dohvaćanja kostima."));
  };

  useEffect(() => {
    fetchCostumeParts();
  }, [userId, costumeId, token]);

  const handleDeleteCostumePart = async (e, partId) => {
    e.stopPropagation(); 
    if (!window.confirm("Are you sure you want to delete this costume part?")) return;

    await axios
      .delete(`https://localhost:7027/Costume/DeleteCostumePart/${partId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => fetchCostumeParts())
      .catch((err) => {
        console.error(err);
        alert("Failed to delete costume part.");
      });
  };

  return (
    <div className="page-container">
      <div className="left-panel">
        {error && <p className="error-message">{error}</p>}
        <h2>My costume parts for selected costume</h2>
        <ul>
          {costumeParts.map((cp) => (
            <li
              key={cp.id}
              className="choreo-card"
              style={{ position: "relative", cursor: "pointer" }}
            >
              <p><strong>Region:</strong> {cp.region}</p>
              <p><strong>Name:</strong> {cp.name}</p>
              <p><strong>Part number:</strong> {cp.partNumber}</p>
              <p><strong>Status:</strong> {cp.status}</p>

              {/* Trash icon for deleting */}
              <FaTrash
                onClick={(e) => handleDeleteCostumePart(e, cp.id)}
                style={{
                  position: "absolute",
                  bottom: "10px",
                  right: "10px",
                  color: "red",
                  cursor: "pointer",
                  fontSize: "1.2rem",
                }}
                title="Delete Costume Part"
              />
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
