import React from "react";

const CostumesSection = ({ costumes }) => {
  return (
    <div className="costumes-section">
      <h2>Costumes</h2>
      {costumes.length === 0 ? (
        <p>There are no costumes for this choreography.</p>
      ) : (
        costumes.map((costume) => (
          <div key={costume.Id} className="costume-card">
            <p><strong>Name:</strong> {costume.name}</p>
            <p><strong>Area:</strong> {costume.area}</p>
            <p><strong>Sex:</strong> {costume.gender === 0 ? "Men" : "Women"}</p>
            <p><strong>Status:</strong> {costume.status}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default CostumesSection;