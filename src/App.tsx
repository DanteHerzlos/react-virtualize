import cl from "@styles/App.module.css";
import ServerList from "./components/ServerList";
import ReactVirtualized from "@components/ReactVirtualized";
import RowVirtualizerFixed from "@components/Tanstack";
import SimpleList from "@components/SimpleList";
import CompromiseList from "@components/CompromiseList";
import HList from "@components/HList";
import Grid from "@components/Grid";

const App = () => {
  return (
    <div className={cl.container}>
      <div className={cl.thirdPart}>
        <RowVirtualizerFixed />
        <ReactVirtualized />
      </div>
      <div className={cl.mine}>
        <SimpleList />
        <CompromiseList/>
        <ServerList />
      </div>
      <HList/>
      <Grid/>
    </div>
  );
};

export default App;
