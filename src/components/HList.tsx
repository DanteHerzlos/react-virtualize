import cl from "../styles/components/HList.module.css";
import HElement from "./HElement";
import elements from "../helpers/elements";
import { useState, useRef, useEffect } from "react";

const elCount = elements.length;
const elW = 100;
const visibleW = 500;
const renderEl = Math.ceil(visibleW / elW) + 2;
const arr = new Array(renderEl).fill(0);

const HList = () => {
  const [start, setStart] = useState<number>(0);
  const divRefs = useRef<(HTMLDivElement | null)[]>(
    new Array(renderEl).fill(null)
  );

  useEffect(() => {
    for (let i = 0; i < renderEl; i++) {
      divRefs.current[i]!.style.left = `${(start + i) * elW}px`;
    }
  }, []);

  const onScrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const left = e.currentTarget.scrollLeft;
    const startEl = Math.ceil(
      (left - (renderEl / 2) * elW + visibleW / 2) / elW
    );
    for (let i = 0; i < renderEl; i++) {
      divRefs.current[i]!.style.left = `${(startEl + i) * elW}px`;
    }
    setStart(startEl);
  };

  return (
    <div onScrollCapture={onScrollHandler} className={cl.list}>
      <div
        style={{
          width: `${elCount * elW}px`,
          maxWidth: `${elCount * elW}px`,
          height: "100%",
          position: "relative",
        }}
      >
        {arr.map((_, index) => (
          <div
            ref={(el) => (divRefs.current[index] = el)}
            key={index}
            style={{
              position: "absolute",
              height: "100%",
            }}
          >
            {elements.length > start + index && (
              <HElement text={elements[start + index]} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HList;
