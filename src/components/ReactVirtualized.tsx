import elements from "../helpers/elements";
import { List } from "react-virtualized";
import Element from "./Element";

function rowRenderer({
  key, // Unique key within array of rows
  index, // Index of row within collection
  style, // Style object to be applied to row (to position it)
}) {
  return (
      <Element style={style} key={key} text={elements[index]} />
  );
}

const ReactVirtualized = () => {
  return (
    <div>
      <h1>react-virtualized</h1>
      <List
        width={200}
        height={300}
        rowCount={elements.length}
        rowHeight={30}
        rowRenderer={rowRenderer}
      />
    </div>
  );
};

export default ReactVirtualized;
