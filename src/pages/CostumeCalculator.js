import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const CostumeCalculator = () => {
  const { choreographyId } = useParams(); 
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allPartsAvailable, setAllPartsAvailable] = useState(null);
  const [missingParts, setMissingParts] = useState([]);

  useEffect(() => {
    if (!choreographyId) return;

    setLoading(true);
    setError(null);

    axios
      .get(`https://localhost:7027/Performance/GetMaleCostumeChoreographyCheck/${choreographyId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        setAllPartsAvailable(res.data.allPartsAvailable);
        setMissingParts(res.data.missingParts);
        setLoading(false);
      })
      .catch(err => {
        setError(err.response?.data?.message || "Došlo je do greške pri dohvaćanju podataka.");
        setLoading(false);
      });
  }, [choreographyId, token]);

  if (loading) return <p>Učitavanje podataka...</p>;
  if (error) return <p style={{ color: "red" }}>Greška: {error}</p>;

  return (
    <div>
      <h1>Provjera dijelova kostima za koreografiju</h1>
      {allPartsAvailable ? (
        <p style={{ color: "green" }}>Svi potrebni dijelovi kostima su dostupni.</p>
      ) : (
        <>
          <p style={{ color: "red" }}>Nedostaju neki dijelovi kostima:</p>
          <ul>
            {missingParts
                .filter(part => part.partNumber !== 0)
                .map((part, index) => (
                    <div key={index}>
                    <p>Name: {part.name}</p>
                    <p>Part Number: {part.partNumber}</p>
                    <p>Gender: {part.gender}</p>
                    </div>
                ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default CostumeCalculator;
