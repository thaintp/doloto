import { Game } from "./components";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import styles from "./App.module.css";
import Button from "react-bootstrap/Button";
import { FaCompress, FaExpand } from "react-icons/fa";

import { useDarkMode } from "./hooks/";

const App = () => {
  const handle = useFullScreenHandle();
  const [mode, setMode] = useDarkMode();

  return (
    <>
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
          <Game mode={mode} setMode={setMode} />
        </div>
      </FullScreen>
    </>
  );
};

export default App;
