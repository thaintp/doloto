import React, { useState, useEffect } from "react";
import { Board } from "./components";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import styles from "./App.module.css";
import Button from "react-bootstrap/Button";
import { FaCompress, FaExpand } from "react-icons/fa";

const App = () => {
  const handle = useFullScreenHandle();
  const [theme, setTheme] = useState<string>(
    window.localStorage.getItem("theme") || "light"
  );
  useEffect(() => {
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div>
      <Button
        onClick={handle.enter}
        className={styles.enterBtn}
        variant={theme}
      >
        <FaExpand></FaExpand>
      </Button>
      <FullScreen handle={handle}>
        <div id="fullscreen">
          {handle.active && (
            <Button
              onClick={handle.exit}
              className={styles.enterBtn}
              variant={theme}
            >
              <FaCompress></FaCompress>
            </Button>
          )}
          <Board theme={theme} setTheme={setTheme} />
        </div>
      </FullScreen>
    </div>
  );
};

export default App;
