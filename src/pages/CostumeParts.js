import React, { useEffect, useState } from "react";
import axios from "axios";
import AddCostumeParts from "../pages/AddCostumeParts";
import "../styles/ChoreographiesCostume.css";
import { useParams, useNavigate } from "react-router-dom";
import { FaTrash, FaEdit } from "react-icons/fa";

const CostumeParts = () => {
  const [costumeParts, setCostumeParts] = useState([]);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");
  const { userId, costumeId } = useParams();
  const navigate = useNavigate();

  const fetchCostumeParts = async () => {
    await axios
      .get(
        `https://localhost:7027/Costume/GetAllCostumeParts/${userId}/${costumeId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        console.log("Costume parts fetched:", response.data);
        setCostumeParts(response.data);
      })
      .catch(() => setError("Error while fetching costume parts."));
  };

  useEffect(() => {
    fetchCostumeParts();
  }, [userId, costumeId, token]);

  const handleDeleteCostumePart = async (e, partId) => {
    e.stopPropagation();
    if (!window.confirm("Are you sure you want to delete this costume part?"))
      return;

    await axios
      .delete(`https://localhost:7027/Costume/DeleteCostumePart/${partId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => fetchCostumeParts())
      .catch((err) => {
        console.error(err);
        if (err.response && err.response.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      });
  };

  const handleUpdateCostumePart = async (e, part) => {
    e.stopPropagation();

    const newName = prompt("Enter new name:", part.name);
    const newRegion = prompt("Enter new region:", part.region);
    const newPartNumber = prompt("Enter new part number:", part.partNumber);
    const newStatus = prompt("Enter new status (int):", part.status);

    if (
      newName === null &&
      newRegion === null &&
      newPartNumber === null &&
      newStatus === null
    )
      return;

    const payload = {
      name: newName || part.name,
      region: newRegion || part.region,
      partNumber: newPartNumber ? parseInt(newPartNumber) : part.partNumber,
      status: newStatus || part.status,
      gender: part.gender, 
    };

    await axios
      .post(
        `https://localhost:7027/Costume/UpdateCostumePart/${part.id}`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        alert("Costume part updated!");
        fetchCostumeParts();
      })
      .catch((err) => {
        console.error(err);
        if (err.response && err.response.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        } else {
          alert("Failed to update costume part.");
        }
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
              <p>
                <strong>Region:</strong> {cp.region}
              </p>
              <p>
                <strong>Name:</strong> {cp.name}
              </p>
              <p>
                <strong>Part number:</strong> {cp.partNumber}
              </p>
              <p>
                <strong>Status:</strong> {cp.status}
              </p>

              <FaEdit
                onClick={(e) => handleUpdateCostumePart(e, cp)}
                style={{
                  position: "absolute",
                  bottom: "10px",
                  right: "40px",
                  color: "blue",
                  cursor: "pointer",
                  fontSize: "1.2rem",
                }}
                title="Edit Costume Part"
              />

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
