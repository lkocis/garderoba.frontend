import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AddChoreography from "../pages/AddChoreography";
import "../styles/ChoreographiesCostume.css";
import { FaTrash, FaEdit } from "react-icons/fa"; 

const Choreographies = () => {
  const [choreographies, setChoreographies] = useState([]);
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const fetchChoreographies = () => {
    axios
      .get("https://localhost:7027/Choreography/GetAllChoreographies", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setChoreographies(res.data))
      .catch((err) => {
      console.error(err);
      if (err.response && err.response.status === 401) {
        localStorage.removeItem("token"); 
        navigate("/login");
      }
    });
  };

  useEffect(() => {
    fetchChoreographies();
  }, []);

  const handleChoreographyClick = (choreographyId) => {
    navigate(`/costumes/${userId}/${choreographyId}`);
  };

  const handleDeleteChoreography = (id) => {
    if (!window.confirm("Are you sure you want to delete this choreography?")) return;

    axios
      .delete(`https://localhost:7027/Choreography/DeleteChoreographyById/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        alert("Choreography deleted!");
        fetchChoreographies(); 
      })
      .catch((err) => {
      console.error(err);
      if (err.response && err.response.status === 401) {
        localStorage.removeItem("token"); 
        navigate("/login"); 
      }
    });
  };

  const handleUpdateChoreography = async (e, choreography) => {
    e.stopPropagation();

    const newName = prompt("Enter new name:", choreography.name);
    const newArea = prompt("Enter new area:", choreography.area);
    const newMenCostumeCount = prompt("Enter new men costume count:", choreography.menCostumeCount);
    const newWomenCostumeCount = prompt("Enter new women costume count:", choreography.womenCostumeCount);

    if (
      newName === null &&
      newArea === null &&
      newMenCostumeCount === null &&
      newWomenCostumeCount === null
    )
      return;

    const payload = {
      name: newName || choreography.name,
      area: newArea || choreography.area,
      menCostumeCount: newMenCostumeCount || choreography.menCostumeCount,
      womenCostumeCount: newWomenCostumeCount || choreography.womenCostumeCount
    };

    await axios
      .put(
        `https://localhost:7027/Choreography/UpdateChoreographyById/${choreography.id}`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        alert("Choreography updated!");
        fetchChoreographies();
      })
      .catch((err) => {
        console.error(err);
        if (err.response && err.response.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        } else {
          alert("Failed to update choreography.");
        }
      });
  };

  return (
    <div className="page-container">
      <div className="left-panel">
        <h2>All Choreographies</h2>
        <ul>
          {choreographies.map((ch) => (
            <li
              key={ch.id}
              className="choreo-card"
              style={{ position: "relative", cursor: "pointer" }}
              onClick={() => handleChoreographyClick(ch.id)}
            >
              <p><strong>Name:</strong> {ch.name}</p>
              <p><strong>Area:</strong> {ch.area}</p>
              <p><strong>Men costumes:</strong> {ch.menCostumeCount}</p>
              <p><strong>Women costumes:</strong> {ch.womenCostumeCount}</p>

              <FaEdit
                onClick={(e) => handleUpdateChoreography(e, ch)}
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
                style={{
                  position: "absolute",
                  bottom: "10px",
                  right: "10px",
                  color: "red",
                  cursor: "pointer",
                }}
                onClick={(e) => {
                  e.stopPropagation(); 
                  handleDeleteChoreography(ch.id);
                }}
              />
            </li>
          ))}
        </ul>
      </div>
      <div className="right-panel">
        <AddChoreography onAdded={fetchChoreographies} />
      </div>
    </div>
  );
};

export default Choreographies;
