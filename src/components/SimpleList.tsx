import cl from "../styles/components/List.module.css";
import Element from "./Element";
import elements from "../helpers/elements";
import React, { Fragment, useState } from "react";

const elCount = elements.length;
const elHi = 30;
const visibleHi = 300;
const renderEl = Math.ceil(visibleHi / elHi) + 8;
const arr = new Array(renderEl).fill(0);

const SimpleList = () => {
  const [start, setStart] = useState(0);

  const onScrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const top = e.currentTarget.scrollTop;
    const startEl = Math.ceil(
      (top - (renderEl / 2) * elHi + visibleHi / 2) / elHi
    );
    if (start !== startEl) setStart(startEl);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Simple List</h2>
      <span>(flicker list)</span>
      <div onScrollCapture={onScrollHandler} className={cl.list}>
        <div style={{ height: `${elCount * elHi}px`, position: "relative" }}>
          {arr.map((_, index) => (
            <Fragment key={start  +  index}>
              {elements.length > start + index && (
                <Element
                  style={{
                    backgroundColor: (start+index)%2 ? "#ccc" : "#fff",
                    transform: `translateY(${(start + index) * elHi}px)`,
                    position: "absolute",
                    width: "100%",
                  }}
                  text={elements[start + index]}
                />
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SimpleList;
