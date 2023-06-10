import { useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import elements from "helpers/elements";
import Element from "./Element";

const RowVirtualizerFixed = () => {
  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: 1000000,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 30,
    overscan: 5,
  });

  return (
    <div>
      <h1>Tanstack</h1>
      <div
        ref={parentRef}
        className="List"
        style={{
          height: `300px`,
          width: `200px`,
          overflow: "auto",
        }}
      >
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: "100%",
            position: "relative",
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => (
            <div
              key={virtualRow.index}
              className={virtualRow.index % 2 ? "ListItemOdd" : "ListItemEven"}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              <Element text={elements[virtualRow.index]} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RowVirtualizerFixed;
