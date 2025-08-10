import React from "react";

const AllCostumeParts = ({ costumeParts, selectedId, onSelect }) => {
  return (
    <div className="content-wrapper">
      <h2>Costume parts</h2>
      {costumeParts.map((part) => (
        <div
          key={part.id}
          className={`choreo-card ${selectedId === part.id ? "selected" : ""}`}
          onClick={() => onSelect(part.id)}
        >
          <p><strong>Region:</strong> {part.region}</p>
          <p><strong>Name:</strong> {part.name}</p>
          <p><strong>Part number:</strong> {part.partNumber}</p>
          <p><strong>Status:</strong> {part.status}</p>
        </div>
      ))}
    </div>
  );
};

export default AllCostumeParts;