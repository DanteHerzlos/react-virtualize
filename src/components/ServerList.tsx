import cl from "../styles/components/List.module.css";
import Element from "./Element";
import elements from "../helpers/elements";
import React, { useRef } from "react";
import ReactDomServer from "react-dom/server";

const elCount = elements.length;
const elHi = 30;
const visibleHi = 300;
const renderEl = Math.ceil(visibleHi / elHi) + 2;
const arr = new Array(renderEl).fill(0);

const ServerList = () => {
  let start = 0;
  const divRefs = useRef<(HTMLDivElement | null)[]>(
    new Array(renderEl).fill(null)
  );

  const onScrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const top = e.currentTarget.scrollTop;
    const startEl = Math.ceil(
      (top - (renderEl / 2) * elHi + visibleHi / 2) / elHi
    );
    if (start !== startEl) {
      for (let i = 0; i < renderEl; i++) {
        if (elements.length > startEl + i && startEl + i >= 0) {
          divRefs.current[i]!.style.transform = `translateY(${
            (startEl + i) * elHi
          }px)`;
          divRefs.current[i]!.innerHTML = ReactDomServer.renderToString(
            <Element
              style={{ backgroundColor: (start + i) % 2 ? "#ccc" : "#fff" }}
              text={elements[startEl + i]}
            />
          );
        }
      }
      start = startEl;
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>React Dom Server</h2>
      <span>(large package size, more resources)</span>
      <div onScrollCapture={onScrollHandler} className={cl.list}>
        <div style={{ height: `${elCount * elHi}px`, position: "relative" }}>
          {arr.map((_, index) => (
            <div
              ref={(el) => (divRefs.current[index] = el)}
              key={index}
              style={{
                transform: `translateY(${(start + index) * elHi}px)`,
                position: "absolute",
                width: "100%",
              }}
            >
              {elements.length > start + index && (
                <Element
                  style={{
                    backgroundColor: (start + index) % 2 ? "#ccc" : "#fff",
                  }}
                  text={elements[start + index]}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServerList;
