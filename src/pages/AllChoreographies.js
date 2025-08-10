import React from "react";

const AllChoreographies = ({ choreographies, selectedId, onSelect }) => {
  return (
    <div className="content-wrapper">
      <h2>Choreographies</h2>
      {choreographies.map((choreo) => (
        <div
          key={choreo.id}
          className={`choreo-card ${selectedId === choreo.id ? "selected" : ""}`}
          onClick={() => onSelect(choreo.id)}
        >
          <p><strong>Name:</strong> {choreo.name}</p>
          <p><strong>Area:</strong> {choreo.area}</p>
          <p><strong>Men costumes:</strong> {choreo.menCostumeCount}</p>
          <p><strong>Women costumes:</strong> {choreo.womenCostumeCount}</p>
        </div>
      ))}
    </div>
  );
};

export default AllChoreographies;