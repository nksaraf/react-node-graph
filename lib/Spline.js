import React, { useState } from "react";
// import onClickOutside from "react-onclickoutside";

import { TrashIcon } from "./TrashIcon";

export function Spline({
  //   mousePos,
  onClick,
  onRemove,
  isSelected,
  setIsSelected,
  end,
  start,
}) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const bezierCurve = (a, b, cp1x, cp1y, cp2x, cp2y, x, y) => {
    return `M ${a} ${b} C ${cp1x} ${cp1y} ${cp2x} ${cp2y} ${x} ${y}`;
  };

  const distance = (a, b) => {
    return Math.sqrt(
      (b[0] - a[0]) * (b[0] - a[0]) + (b[1] - a[1]) * (b[1] - a[1])
    );
  };

  //   Spline.handleClickOutside = (e) => {
  //     setSelected(false);

  //     if (onClickOutside) {
  //       onClickOutside(e);
  //     }
  //   };

  const handleRemove = (e) => {
    setIsSelected(false);

    if (onRemove) {
      onRemove(e);
    }
  };

  let dist = distance([start.x, start.y], [end.x, end.y]);
  let pathString = bezierCurve(
    start.x,
    start.y,
    start.x + dist * 0.25,
    start.y,
    end.x - dist * 0.75,
    end.y,
    end.x,
    end.y
  );
  let className = `connector ${isSelected ? " selected" : ""}`;

  return (
    <g>
      <circle cx={start.x} cy={start.y} r={"3"} fill={"#337ab7"} />
      <circle cx={end.x} cy={end.y} r={"3"} fill={"#9191A8"} />
      <path
        className={"connector-click-area"}
        d={pathString}
        onClick={onClick}
      />
      <path className={className} d={pathString} onClick={onClick} />
      {isSelected ? (
        <TrashIcon position={position} onClick={handleRemove} />
      ) : null}
    </g>
  );
}

// const handleClickConfig = {
//   handleClickOutside: () => Spline.handleClickOutside,
// };

// let Spline;
// if (typeof window === "undefined") {
//   Spline = BaseSpline;
// } else {
//   //   Spline = onClickOutside(Spline, handleClickConfig);
// }

// export default Spline;
