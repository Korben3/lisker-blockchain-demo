import React from "react";
import "./TypeIndicator.css";
import types from "../assets/avatars/_types.json";

const TypeIndicator = ({ typeSelected, changeType }) => {
  let type1 = "",
    type2 = "",
    type3 = "";

  typeSelected - 1 < 1
    ? (type1 = types.interfaceTypes[types.interfaceTypes.length - 1])
    : (type1 = types.interfaceTypes[typeSelected - 2]);

  type2 = types.interfaceTypes[typeSelected - 1];

  typeSelected + 1 > types.interfaceTypes.length
    ? (type3 = types.interfaceTypes[0])
    : (type3 = types.interfaceTypes[typeSelected]);

  const typesDisplay = (
    <div className="type123">
      <span
        id="type1"
        key="type1"
        className="typeName"
        onClick={() => changeType(-1)}
      >
        {type1}
      </span>

      <span id="type2" key="type2" className="typeNameSelected">
        {type2}
      </span>
      <span
        id="type3"
        key="type3"
        className="typeName"
        onClick={() => changeType(1)}
      >
        {type3}
      </span>
    </div>
  );

  return (
    <div className="typeIndicatorContainer">
      {" "}
      <div
        id="buttonPrevious"
        className="buttonType"
        onClick={() => changeType(-1)}
      >
        &#x25C0;&#xFE0E;
      </div>
      <div>{typesDisplay}</div>
      <div id="buttonNext" className="buttonType" onClick={() => changeType(1)}>
        &#x25B6;&#xFE0E;
      </div>
    </div>
  );
};
export default TypeIndicator;
