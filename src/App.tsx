import React, { createContext } from "react";
import { Game } from "./components";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import styles from "./App.module.css";
import Button from "react-bootstrap/Button";
import { FaCompress, FaExpand } from "react-icons/fa";

import { useDarkMode } from "./hooks/";

export const AppContext = createContext<any>(undefined);

const App = () => {
  const handle = useFullScreenHandle();
  const [mode, setMode] = useDarkMode();

  return (
    <AppContext.Provider value={[mode, setMode]}>
      <Button onClick={handle.enter} className={styles.enterBtn} variant={mode}>
        <FaExpand></FaExpand>
      </Button>
      <FullScreen handle={handle}>
        <div id="fullscreen">
          {handle.active && (
            <Button
              onClick={handle.exit}
              className={styles.enterBtn}
              variant={mode}
            >
              <FaCompress></FaCompress>
            </Button>
          )}
          <Game />
        </div>
      </FullScreen>
    </AppContext.Provider>
  );
};

export default App;
