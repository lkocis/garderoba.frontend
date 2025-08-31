import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import axios from "axios";
import '../styles/CostumeCalculator.css';

const CostumeCalculator = () => {
  const { choreographyId } = useParams();
  const navigate = useNavigate(); 

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allPartsAvailable, setAllPartsAvailable] = useState(null);
  const [missingParts, setMissingParts] = useState([]);
  const [usersWithParts, setUsersWithParts] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!choreographyId) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const costumeCheckRes = await axios.get(
          `https://localhost:7027/Performance/GetCostumeChoreographyCheck/${choreographyId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setAllPartsAvailable(costumeCheckRes.data.allPartsAvailable);
        setMissingParts(costumeCheckRes.data.missingParts);

        const colaborativeRes = await axios.get(
          `https://localhost:7027/ColaborativeFiltering/GetUserWithCostumeParts/${choreographyId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setUsersWithParts(Object.keys(colaborativeRes.data));

      } catch (err) {
        if (err.response?.status === 401) {
          navigate("/login");
        } else {
          setError(
            err.response?.data?.message || "An error occurred while fetching data."
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [choreographyId, token, navigate]);

  if (loading) return <p>Loading data...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  const menParts = missingParts.filter(p => p.gender === "Men" && p.partNumber !== 0);
  const womenParts = missingParts.filter(p => p.gender === "Women" && p.partNumber !== 0);

    return (
    <div className="calculator-container">
      <h1>Costume Parts Check for Choreography</h1>

      <div className="calculator-card">
        {allPartsAvailable ? (
          <p>
            User has everything needed. All costume parts are available.
          </p>
        ) : (
          <>
            <h2>Some costume parts are missing:</h2>

            <div>
              <h3>Men</h3>
              {menParts.length > 0 ? (
                <ul>
                  {menParts.map((part, index) => (
                    <li key={`men-${index}`}>
                      <p><b>Name:</b> {part.name}</p>
                      <p><b>Quantity:</b> {part.partNumber}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p style={{ fontStyle: "italic" }}>All Men costumes available</p>
              )}
            </div>

            <div>
              <h3>Women</h3>
              {womenParts.length > 0 ? (
                <ul>
                  {womenParts.map((part, index) => (
                    <li key={`women-${index}`}>
                      <p><b>Name:</b> {part.name}</p>
                      <p><b>Quantity:</b> {part.partNumber}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p style={{ fontStyle: "italic" }}>All Women costumes available</p>
              )}
            </div>
          </>
        )}

        <div>
          <h2>Users with Needed Parts</h2>
          {allPartsAvailable ? (
            <p style={{ fontStyle: "italic" }}>No users needed — all parts are available.</p>
          ) : usersWithParts.length > 0 ? (
            <ul>
              {usersWithParts.map((email, idx) => (
                <li key={idx}>{email}</li>
              ))}
            </ul>
          ) : (
            <p style={{ fontStyle: "italic" }}>No users found with needed parts.</p>
          )}
        </div>

          <button onClick={() => navigate("/")}>Back to Home</button>
        </div>
      </div>
  );
};

export default CostumeCalculator;
