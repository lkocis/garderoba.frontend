import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // added useNavigate
import AxiosInstance from "../components/AxiosInstance"; 
import '../styles/CostumeCalculator.css';

const CostumeCalculator = () => {
  const { choreographyId } = useParams();
  const navigate = useNavigate(); // initialize navigate

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allPartsAvailable, setAllPartsAvailable] = useState(null);
  const [missingParts, setMissingParts] = useState([]);
  const [usersWithParts, setUsersWithParts] = useState([]);

  useEffect(() => {
    if (!choreographyId) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const costumeCheckRes = await AxiosInstance.get(
          `/Performance/GetCostumeChoreographyCheck/${choreographyId}`
        );
        setAllPartsAvailable(costumeCheckRes.data.allPartsAvailable);
        setMissingParts(costumeCheckRes.data.missingParts);

        const colaborativeRes = await AxiosInstance.get(
          `/ColaborativeFiltering/GetUserWithCostumeParts/${choreographyId}`
        );
        setUsersWithParts(Object.keys(colaborativeRes.data));

      } catch (err) {
        setError(
          err.response?.data?.message ||
            "An error occurred while fetching data."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [choreographyId]);

  if (loading) return <p>Loading data...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div className="calculator-container">
      <h1>Costume Parts Check for Choreography</h1>

      <div className="calculator-card">
        {allPartsAvailable ? (
          <h2>All required costume parts are available.</h2>
        ) : (
          <>
            <h2>Some costume parts are missing:</h2>
            <ul>
              {missingParts
                ?.filter((part) => part.partNumber !== 0)
                .map((part, index) => (
                  <li key={index}>
                    <p><b>Name:</b> {part.name}</p>
                    <p><b>Quantity:</b> {part.partNumber}</p>
                    <p><b>Gender:</b> {part.gender}</p>
                  </li>
                ))}
            </ul>
          </>
        )}

        {usersWithParts.length > 0 && (
          <div>
            <h2>Users Who Have the Needed Parts</h2>
            <ul>
              {usersWithParts.map((email, idx) => (
                <li key={idx}>{email}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Back to Home button */}
        <button onClick={() => navigate("/")}>Back to Home</button>
      </div>
    </div>
  );
};

export default CostumeCalculator;
