import cl from "../styles/components/Grid.module.css";
import GridElement from "./GridElement";
import gridElements from "../helpers/gridElements";
import { useEffect, useState, useRef } from "react";

const elXCount = gridElements[0].length;
const elYCount = gridElements.length
const elHi = 50;
const elW = 50;
const visibleHi = 500;
const visibleW = 500;
const renderXEl = Math.ceil(visibleHi/elHi)+2;
const renderYEl = Math.ceil(visibleW/elW)+2;
const arrX = new Array(renderXEl).fill(0);
const arrY = new Array(renderYEl).fill(0);


const Grid = () => {
  const [posX, setPosX] = useState<number>(0);
  const [posY, setPosY] = useState<number>(0);
  const divRefs = useRef<(HTMLDivElement | null)[][]>(
    new Array(renderYEl).fill(null).map((_) => new Array(renderXEl).fill(null))
  );
  useEffect(() => {
    for (let i = 0; i < renderYEl; i++) {
      for (let j = 0; j < renderXEl; j++) {
        divRefs.current[i][j]!.style.transform = `translate(${
          (posX + j) * elW
        }px, ${(posY + i) * elHi}px)`;
      }
    }
  }, []);
  const onScrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const top = e.currentTarget.scrollTop;
    const left = e.currentTarget.scrollLeft;
    const posYEl = Math.ceil(
      (top - (renderYEl / 2) * elHi + visibleHi / 2) / elHi
    );
    const posXEl = Math.ceil(
      (left - (renderXEl / 2) * elW + visibleW / 2) / elW
    );
    for (let i = 0; i < renderYEl; i++) {
      for (let j = 0; j < renderXEl; j++) {
        divRefs.current[i][j]!.style.transform = `translate(${
          (posXEl + j) * elW
        }px, ${(posYEl + i) * elHi}px)`;
      }
    }
    setPosX(posXEl);
    setPosY(posYEl);
  };

  return (
    <div onScrollCapture={onScrollHandler} className={cl.grid}>
      <div style={{ height: `${elYCount * elHi}px`, position: "relative" }}>
        {arrY.map((_, iY) => (
          <div
            style={{ position: "absolute", width: `${elXCount * elW}px` }}
            key={iY}
          >
            {arrX.map((_, iX) => (
              <div
                style={{ position: "absolute" }}
                key={iX}
                ref={(el) => (divRefs.current[iY][iX] = el)}
              >
                {posY + iY >= 0 &&
                  posY + iY < elYCount &&
                  posX + iX >= 0 &&
                  posX + iX < elXCount && (
                    <GridElement
                      text={gridElements[posY + iY][posX + iX]}
                    />
                  )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
export default Grid;
