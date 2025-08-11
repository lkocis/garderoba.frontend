import React from "react";

const AllCostumeParts = ({ costumes, selectedId, onSelect}) => {
  return (
    <div className="costumes-section">
      <h2>Costumes</h2>
      {costumes.map((cost) => (
        <div
          key={cost.id}
          className={`costume-card ${selectedId === cost.id ? "selected" : ""}`}
          onClick={() => onSelect(cost.id)}
        >
          <p><strong>Name:</strong> {cost.name}</p>
          <p><strong>Area:</strong> {cost.area}</p>
          <p><strong>Gender:</strong> {cost.gender === 0 ? "Men" : "Women"}</p>
          <p><strong>Status:</strong> {cost.status}</p>
        </div>
      ))}
    </div>
  );
};

export default AllCostumeParts;