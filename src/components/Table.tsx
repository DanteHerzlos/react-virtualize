import cl from "../styles/components/Table.module.css";
import GridElement from "./GridElement";
import gridElements from "../helpers/gridElements";
import { useEffect, useState, useRef } from "react";

const renderXEl = 14;
const renderYEl = 14;
const arrX = new Array(renderXEl).fill(0);
const arrY = new Array(renderYEl).fill(0);
const elXCount = 1000;
const elYCount = 15;
const elHi = 50;
const elW = 50;
const visibleHi = 500;
const visibleW = 500;

const Table = () => {
  const [posX, setPosX] = useState<number>(0);
  const [posY, setPosY] = useState<number>(0);
  const divRefs = useRef<(HTMLDivElement | null)[][]>(
    new Array(renderYEl).fill(null).map((_) => new Array(renderXEl).fill(null))
  );
  useEffect(() => {
    for (let j = 0; j < renderXEl; j++) {
      divRefs.current[0][j]!.style.left = `${(posX + j) * elW}px`;
    }
    for (let i = 0; i < renderYEl; i++) {
      for (let j = 0; j < renderXEl; j++) {
        divRefs.current[i][j]!.style.top = `${(posY + i) * elHi}px`;
        divRefs.current[i][j]!.style.left = `${(posX + j) * elW}px`;
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
    for (let j = 0; j < renderXEl; j++) {
      divRefs.current[0][j]!.style.left = `${(posXEl + j) * elW}px`;
      divRefs.current[0][j]!.style.top = `${top}px`;
    }
    for (let i = 1; i < renderYEl; i++) {
      for (let j = 0; j < renderXEl; j++) {
        divRefs.current[i][j]!.style.top = `${(posYEl + i) * elHi}px`;
        divRefs.current[i][j]!.style.left = `${(posXEl + j) * elW}px`;
      }
    }
    setPosX(posXEl);
    setPosY(posYEl);
  };

  return (
    <div onScrollCapture={onScrollHandler} className={cl.container}>
      <table className={cl.table} style={{ height: `${elYCount * elHi}px` }}>
        <thead>
          <tr style={{ width: `${elXCount * elW}px` }}>
            {arrX.map((_, iX) => (
              <th key={iX} ref={(el) => (divRefs.current[0][iX] = el)}>
                {posX + iX >= 0 && posX + iX < elXCount && (
                  <GridElement text={gridElements[0][posX + iX].toString()} />
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {arrY.slice(1).map((_, iY) => (
            <tr style={{ width: `${elXCount * elW}px` }} key={iY + 1}>
              {arrX.map((_, iX) => (
                <td key={iX} ref={(el) => (divRefs.current[iY + 1][iX] = el)}>
                  {posY + iY + 1 >= 0 &&
                    posY + iY + 1 < elYCount &&
                    posX + iX >= 0 &&
                    posX + iX < elXCount &&
                    gridElements[posY + iY + 1][posX + iX].toString()}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Table;
