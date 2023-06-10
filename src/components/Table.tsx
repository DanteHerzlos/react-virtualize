import cl from "../styles/components/Table.module.css";
import GridElement from "./GridElement";
import gridElements from "../helpers/gridElements";
import { useEffect, useState, useRef } from "react";

const elXCount = gridElements[0].length;
const elYCount = gridElements.length;
const elHi = 50;
const elW = 50;
const visibleHi = 500;
const visibleW = 500;
const renderXEl = Math.ceil(visibleHi / elHi) + 2;
const renderYEl = Math.ceil(visibleW / elW) + 2;
const arrX = new Array(renderXEl).fill(0);
const arrY = new Array(renderYEl).fill(0);

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
    divRefs.current.slice(1).forEach((el, index) => {
      el[0]!.style.left = `${left}px`;
      el[0]!.style.top = `${(posYEl + index + 1) * elHi}px`;
    });
    divRefs.current[0].slice(1).forEach((el, index) => {
      el!.style.left = `${(posXEl + index + 1) * elW}px`;
      el!.style.top = `${top}px`;
    });
    divRefs.current[0][0]!.style.left = `${left}px`;
    divRefs.current[0][0]!.style.top = `${top}px`;
    if (posXEl !== posX || posYEl !== posY) {
      divRefs.current.slice(1).forEach((c, i) =>
        c.slice(1).forEach((el, j) => {
          el!.style.top = `${(posYEl + i + 1) * elHi}px`;
          el!.style.left = `${(posXEl + j + 1) * elW}px`;
        })
      );
      setPosX(posXEl);
      setPosY(posYEl);
    }
  };

  return (
    <div onScrollCapture={onScrollHandler} className={cl.container}>
      <table className={cl.table} style={{ height: `${elYCount * elHi}px` }}>
        <tbody>
          <tr style={{ width: `${elXCount * elW}px` }}>
            <td key={0} ref={(el) => (divRefs.current[0][0] = el)}>
              <GridElement text={gridElements[0][0]} />
            </td>

            {arrX.slice(1).map((_, iX) => (
              <td key={iX + 1} ref={(el) => (divRefs.current[0][iX + 1] = el)}>
                {posX + iX + 1 >= 1 && posX + iX + 1 < elXCount && (
                  <GridElement text={gridElements[0][posX + iX + 1]} />
                )}
              </td>
            ))}
          </tr>
          {arrY.slice(1).map((_, iY) => (
            <tr key={iY + 1}>
              <td key={0} ref={(el) => (divRefs.current[iY + 1][0] = el)}>
                {posY + iY + 1 >= 1 && posY + iY + 1 < elYCount && (
                  <GridElement text={gridElements[posY + iY + 1][0]} />
                )}
              </td>
              {arrX.slice(1).map((_, iX) => (
                <td
                  key={iX + 1}
                  ref={(el) => (divRefs.current[iY + 1][iX + 1] = el)}
                >
                  {posY + iY + 1 >= 1 &&
                    posY + iY + 1 < elYCount &&
                    posX + iX + 1 >= 1 &&
                    posX + iX + 1 < elXCount && (
                      <GridElement
                        text={gridElements[posY + iY + 1][posX + iX + 1]}
                      />
                    )}
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
