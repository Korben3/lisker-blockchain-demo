import React, { useEffect, useState } from "react";
import "./Preview.css";
const liskerAssets = require("../assets/avatars/");

const Preview = ({
  liskerStore,
  colorBackground,
  colorClothes,
  colorHair,
  colorSkin,
  changeVariant,
  getLiskerId,
}) => {
  const [lisker, setLisker] = useState("");

  useEffect(() => {
    // let's build the Lisker, order is important. Output file is a base64 endcoded SVG.
    const go = "<g clip-path='url(#circleMask)' id='"; // group open tag + id start
    const gc = "</g>"; // group close tag

    let lisker =
      "<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' height='280' width='280'>";
    lisker +=
      "<defs><clipPath id='circleMask'><circle cx='140' cy='140' r='140' /></clipPath></defs>";
    lisker += go + "background' fill='" + colorBackground + "'>";
    lisker += "<circle cx='140' cy='140' r='140'/>";
    lisker += gc;
    lisker += go + "hairBack' fill='" + colorHair + "'>";
    lisker += liskerAssets.hairBack[liskerStore[1]];
    lisker += gc;
    lisker += go + "hairBackShade' fill='#000000' fill-opacity='0.3'>";
    lisker += liskerAssets.hairBack[liskerStore[1]];
    lisker += gc;
    lisker += go + "head' fill='" + colorSkin + "'>";
    lisker += liskerAssets.heads[liskerStore[0]];
    lisker += gc;
    lisker += go + "clothes' fill='" + colorClothes + "'>";
    lisker += liskerAssets.clothes[liskerStore[7]];
    lisker += gc;
    lisker += go + "clothesShade' fill='#000000' fill-opacity='0.2'>";
    lisker += liskerAssets.clothesShade[liskerStore[7]];
    lisker += gc;
    lisker += go + "clothesIcon'  fill='#FFFFFF'>";
    lisker += liskerAssets.clothesIcon[liskerStore[8]];
    lisker += gc;
    lisker += go + "headShade' fill='#000000' fill-opacity='0.16'>";
    lisker += liskerAssets.headsShade[liskerStore[0]];
    lisker += gc;
    lisker += go + "mouth'>";
    lisker += liskerAssets.mouths[liskerStore[5]];
    lisker += gc;
    lisker += go + "nose'>";
    lisker += liskerAssets.noses[liskerStore[4]];
    lisker += gc;
    lisker += go + "eyes'>";
    lisker += liskerAssets.eyes[liskerStore[3]];
    lisker += gc;
    lisker += go + "eyebrows' fill='" + colorHair + "'>";
    lisker += liskerAssets.eyebrows[liskerStore[2]];
    lisker += gc;
    lisker += go + "facialHair' fill='" + colorHair + "'>";
    lisker += liskerAssets.facialHair[liskerStore[6]];
    lisker += gc;
    lisker += go + "hairFront' fill='" + colorHair + "'>";
    lisker += liskerAssets.hairFront[liskerStore[1]];
    lisker += gc;
    lisker += go + "hats'>";
    lisker += liskerAssets.hats[liskerStore[10]];
    lisker += gc;
    lisker += go + "glasses'>";
    lisker += liskerAssets.glasses[liskerStore[9]];
    lisker += gc;
    lisker += "</svg>";

    // build the liskerId
    let newLiskerId = `t11${liskerStore[1]}t31${liskerStore[0]}t41${liskerStore[7]}t49${liskerStore[8]}`;
    newLiskerId += `t52${liskerStore[5]}t53${liskerStore[4]}t54${liskerStore[3]}t55${liskerStore[2]}`;
    newLiskerId += `t70${liskerStore[6]}t80${liskerStore[10]}t85${liskerStore[9]}`;
    newLiskerId += `c1${colorBackground.substr(1)}c2${colorClothes.substr(1)}`;
    newLiskerId += `c3${colorSkin.substr(1)}c4${colorHair.substr(1)}`;

    setLisker(lisker);
    getLiskerId(newLiskerId);
  }, [liskerStore, colorBackground, colorClothes, colorSkin, colorHair]);

  return (
    <div className="containerLisker">
      <div
        id="buttonPrevious"
        className="buttonsArrow"
        onClick={() => changeVariant(-1)}
      >
        &#x25C0;&#xFE0E;
      </div>
      <div>
        <img
          src={`data:image/svg+xml;base64,${btoa(lisker)}`}
          alt="lisker"
          className="lisker"
        />
      </div>
      <div
        id="buttonNext"
        className="buttonsArrow"
        onClick={() => changeVariant(1)}
      >
        &#x25B6;&#xFE0E;
      </div>
    </div>
  );
};
export default Preview;
