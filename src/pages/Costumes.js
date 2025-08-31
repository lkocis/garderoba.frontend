import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FaTrash, FaEdit } from "react-icons/fa"; 
import AddCostume from "./AddCostume";
import "../styles/Costumes.css";

const Costumes = () => {
  const { userId, choreographyId } = useParams();
  const [costumes, setCostumes] = useState([]);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const fetchCostumes = async () => {
    await axios
      .get(`https://localhost:7027/Costume/GetAllCostumes/${userId}/${choreographyId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setCostumes(response.data))
      .catch(() => setError("Error while fetching costumes."));
  };

  useEffect(() => {
    fetchCostumes();
  }, [userId, choreographyId, token]);

  const handleCostumeClick = (costumeId) => {
    navigate(`/costumeParts/${userId}/${costumeId}`);
  };

  const handleDeleteCostume = (e, costumeId) => {
    e.stopPropagation(); 
    if (!window.confirm("Are you sure you want to delete this costume?")) 
      return;

    axios
      .delete(`https://localhost:7027/Costume/DeleteCostumeWithParts/${costumeId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => fetchCostumes())
      .catch((err) => {
      console.error(err);
      if (err.response && err.response.status === 401) {
        localStorage.removeItem("token"); 
        navigate("/login"); 
      }
    });
  };

  const handleUpdateCostume = async (e, costume) => {
    e.stopPropagation();

    const newName = prompt("Enter new name:", costume.name);
    const newArea = prompt("Enter new area:", costume.area);
    const newNecessaryParts = prompt("Enter new necessary parts:", costume.necessaryParts);

    if (
      newName === null &&
      newArea === null &&
      newNecessaryParts == null
    )
      return;

    const payload = {
      name: newName || costume.name,
      area: newArea || costume.area,
      gender: costume.gender,
      necessaryParts: costume.necessaryParts 
    };

    console.log("Updating costume with payload:", payload);
    await axios
      .post(
        `https://localhost:7027/Costume/UpdateCostume/${costume.id}`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        alert("Costume updated!");
        fetchCostumes();
      })
      .catch((err) => {
        console.error(err);
        if (err.response && err.response.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        } else {
          alert("Failed to update costume. Gender can be: 'Men' or 'Women'.");
        }
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

              <FaEdit
                onClick={(e) => handleUpdateCostume(e, co)}
                style={{
                position: "absolute",
                bottom: "10px",
                right: "40px",
                color: "blue",
                cursor: "pointer",
                fontSize: "1.2rem",
                }}
                title="Edit Costume"
              />
              
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
