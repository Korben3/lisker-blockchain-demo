import React, { useState, useEffect } from "react";
import Preview from "./generator/Preview";

console.log("%cLisker by Korben3 & Xding78", "font-size:14px; color:green");

const LiskerViewer = ({ setLiskerId, size }) => {
  const [colorBackground, setColorBackground] = useState("#D8E6ED");
  const [colorClothes, setColorClothes] = useState("#4070F4");
  const [colorSkin, setColorSkin] = useState("#F8BB91");
  const [colorHair, setColorHair] = useState("#6A0EA6");

  let defaultLisker = [1, 1, 1, 1, 1, 3, 1, 2, 1, 1, 1, 1, 1];
  const [liskerStore, setLiskerStore] = useState(defaultLisker);

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
      <Preview
        liskerStore={liskerStore}
        colorClothes={colorClothes}
        colorHair={colorHair}
        colorSkin={colorSkin}
        colorBackground={colorBackground}
        size={size}
      />
    </div>
  );
};
export default LiskerViewer;
