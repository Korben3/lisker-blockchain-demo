import React, { useState, useEffect } from "react";
import "./LiskerGenerator.css";
import Header from "./generator/Header";
import TypeIndicator from "./generator/TypeIndicator";
import Preview from "./generator/Preview";
import Colors from "./generator/Colors";
import types from "./assets/avatars/_types.json";

const liskerAssets = require("./assets/avatars/");
console.log("%cLisker by Korben3 & Xding78", "font-size:14px; color:green");

const LiskerGenerator = ({ getLiskerId, setLiskerId }) => {
  const [colorBackground, setColorBackground] = useState("#D8E6ED");
  const [colorClothes, setColorClothes] = useState("#4070F4");
  const [colorSkin, setColorSkin] = useState("#F8BB91");
  const [colorHair, setColorHair] = useState("#6A0EA6");

  const [typeSelected, setTypeSelected] = useState(1);
  let defaultLisker = [1, 1, 1, 1, 1, 3, 1, 2, 1, 1, 1, 1, 1];
  const [liskerStore, setLiskerStore] = useState(defaultLisker);

  const changeColor = (color) => {
    switch (typeSelected) {
      case 1:
        setColorSkin(color);
        break;
      case 2:
      case 3:
      case 7:
        setColorHair(color);
        break;
      case 8:
        setColorClothes(color);
        break;
      case 12:
        setColorBackground(color);
        break;
      default:
        break;
    }
  };

  const changeVariant = (direction) => {
    // retrieve the total variants of the selected type from the json object
    let newVariant = liskerStore[typeSelected - 1];

    let maxValue = Object.keys(Object.values(liskerAssets)[typeSelected - 1])
      .length;
    newVariant += direction;
    if (newVariant > maxValue) {
      newVariant = 1;
    }
    if (newVariant < 1) {
      newVariant = maxValue;
    }
    console.log(
      `type: ${typeSelected} - variant: ${newVariant} - maxValue: ${maxValue}`
    );

    let newLiskerStore = [...liskerStore];
    newLiskerStore[typeSelected - 1] = newVariant;
    setLiskerStore(newLiskerStore);
  };

  const changeType = (direction) => {
    let newType = typeSelected;
    newType += direction;
    if (newType > types.interfaceTypes.length) {
      newType = 1;
    }
    if (newType < 1) {
      newType = types.interfaceTypes.length;
    }
    setTypeSelected(newType);
  };

  useEffect(() => {
    console.log("Updating lisker");
    if (setLiskerId) {
      // liskerId received, convert to liskerStore array and set colors
      let colorsFromId = setLiskerId.split("c");
      colorsFromId.shift();
      let typesFromId = setLiskerId.split("t");
      typesFromId[11] = typesFromId[11].split("c")[0];

      let newLiskerStore = [];
      newLiskerStore[0] = parseInt(typesFromId[2].substr(2));
      newLiskerStore[1] = parseInt(typesFromId[1].substr(2));
      newLiskerStore[2] = parseInt(typesFromId[8].substr(2));
      newLiskerStore[3] = parseInt(typesFromId[7].substr(2));
      newLiskerStore[4] = parseInt(typesFromId[6].substr(2));
      newLiskerStore[5] = parseInt(typesFromId[5].substr(2));
      newLiskerStore[6] = parseInt(typesFromId[9].substr(2));
      newLiskerStore[7] = parseInt(typesFromId[3].substr(2));
      newLiskerStore[8] = parseInt(typesFromId[4].substr(2));
      newLiskerStore[9] = parseInt(typesFromId[11].substr(2));
      newLiskerStore[10] = parseInt(typesFromId[10].substr(2));

      setColorBackground("#" + colorsFromId[0].substr(1));
      setColorClothes("#" + colorsFromId[1].substr(1));
      setColorSkin("#" + colorsFromId[2].substr(1));
      setColorHair("#" + colorsFromId[3].substr(1));
      setLiskerStore(newLiskerStore);
    }
  }, [setLiskerId]);

  return (
    <div>
      <Header />
      <TypeIndicator changeType={changeType} typeSelected={typeSelected} />
      <div className="dividerFade"></div>
      <Preview
        liskerStore={liskerStore}
        colorClothes={colorClothes}
        colorHair={colorHair}
        colorSkin={colorSkin}
        colorBackground={colorBackground}
        changeVariant={changeVariant}
        getLiskerId={getLiskerId}
      />
      <Colors changeColor={changeColor} typeSelected={typeSelected} />
    </div>
  );
};
export default LiskerGenerator;
