import React from "react";
import "../styles/CostumeComponents.css";

const CostumeComponents = () => {
  return (
    <div className="necessary-container">
      <div className="text-wrapper">
        <h2>Necessary parts by area</h2>
        <h3>Insert necessary parts when creating new costume.</h3>
        <div className="cards-container">
          <div className="necessary-card">
            <h3>Slavonija</h3>
            <p><strong>Men:</strong> Rubina, prsluk, hlače, čizme, šešir</p>
            <p><strong>Women:</strong> Rubina, marama, pregača, oglavlje, opanci, dodaci</p>
          </div>

          <div className="necessary-card">
            <h3>Baranja</h3>
            <p><strong>Men:</strong> Košulja, prsluk, hlače, čizme, šešir</p>
            <p><strong>Women:</strong> Rubina, pregača, oglavlje, papučke, čarape, dodaci</p>
          </div>

          <div className="necessary-card">
            <h3>Mađarska Podravina</h3>
            <p><strong>Men:</strong> Košulja, prsluk, hlače, čizme, šešir</p>
            <p><strong>Women:</strong> Suknja, pregača, bluza, oglavlje, čizme, dodaci</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CostumeComponents;
