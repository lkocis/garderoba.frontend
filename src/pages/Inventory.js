import React, { useEffect, useState } from "react";
import axios from "axios";

const Inventory = () => {
  const [costumes, setCostumes] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const userId = localStorage.getItem("userid"); 
    const token = localStorage.getItem("token");

    if (!userId || !token) {
      setError("Nedostaje korisnički ID ili token.");
      return;
    }

    axios
      .get(`https://localhost:7027/Costume/GetAllCostumes/${userId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setCostumes(res.data);
      })
      .catch((err) => {
        setError(
          err.response?.data?.message || "Greška prilikom dohvaćanja kostima"
        );
      });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Lista kostima</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {costumes.map((costume, index) => (
        <div
          key={index}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "5px",
          }}
        >
          <p>
            <strong>Naziv:</strong> {costume.name}
          </p>
          <p>
            <strong>Područje:</strong> {costume.area}
          </p>
          <p>
            <strong>Spol:</strong> {costume.gender}
          </p>
          <p>
            <strong>Status:</strong> {costume.status}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Inventory;
