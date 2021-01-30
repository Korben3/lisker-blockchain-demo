import React, { useEffect, useState } from "react";
import "./Colors.css";
import liskerColors from "../assets/avatars/colors.json";

const Colors = ({ changeColor, typeSelected }) => {
  const [showColorSwatches, setShowColorSwatches] = useState(true);
  const [colorType, setColorType] = useState("Face");
  const [colorSwatches, setColorSwatches] = useState();

  useEffect(() => {
    let currentColorSwatches = liskerColors.colorSwatchesSkin;

    switch (typeSelected) {
      case 1:
        currentColorSwatches = liskerColors.colorSwatchesSkin;
        setColorType("Face");
        setShowColorSwatches(true);
        break;
      case 2:
      case 3:
      case 7:
        currentColorSwatches = liskerColors.colorSwatchesHair;
        setColorType("Hair");
        setShowColorSwatches(true);
        break;
      case 8:
        currentColorSwatches = liskerColors.colorSwatchesClothes;
        setColorType("Clothes");
        setShowColorSwatches(true);
        break;
      case 12:
        currentColorSwatches = liskerColors.colorSwatchesBackground;
        setColorType("Background");
        setShowColorSwatches(true);
        break;
      default:
        setShowColorSwatches(false);
    }

    const newColorSwatches = currentColorSwatches.map((data, index) => (
      <div
        className="colorCircle"
        key={index}
        style={{ backgroundColor: data }}
        onClick={() => changeColor(data)}
      />
    ));

    setColorSwatches(newColorSwatches);
  }, [typeSelected]);

  return (
    <div className="containerColor">
      <div className={` ${showColorSwatches ? "" : "colorToggle"}`}>
        <div className="colorInfo">{colorType} Color</div>
        <div className="colorSwatches">{colorSwatches}</div>
      </div>
    </div>
  );
};
export default Colors;
