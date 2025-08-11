import React from "react";

const AllCostumeParts = ({ costumeParts }) => {
  return (
    <div className="content-wrapper">
      <h2>Costume parts</h2>
      {costumeParts.length === 0 ? (
        <p>There are no costume parts for this choreography.</p>
      ) : (
        costumeParts.map((cosPa) => (
          <div key={cosPa.Id} className="costume-card">
            <p><strong>Region:</strong> {cosPa.region}</p>
            <p><strong>Name:</strong> {cosPa.name}</p>
            <p><strong>Part number:</strong> {cosPa.partNumber}</p>
            <p><strong>Status:</strong> {cosPa.status}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default AllCostumeParts;