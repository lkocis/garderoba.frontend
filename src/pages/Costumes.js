import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AllCostumes from "./AllCostumes";
import AddCostume from "./AddCostume";
import "../styles/Costumes.css";

const Costumes = () => {
  const { userId, choreographyId } = useParams();
  const [costumes, setCostumes] = useState([]);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

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

  return (
    <div className="page-container">
      <div className="left-panel">
        {error && <p className="error-message">{error}</p>}
        <AllCostumes costumes={costumes} />
      </div>
      <div className="right-panel">
        <AddCostume choreographyId={choreographyId} onAdded={handleAddCostume} />
      </div>
    </div>
  );
};

export default Costumes;
