import { Game } from "./components";

import { useDarkMode } from "./hooks/";

const App = () => {
  const [mode, setMode] = useDarkMode();

  return (
    <Game mode={mode} setMode={setMode} />
    // <>
    //   <Button onClick={handle.enter} className={styles.enterBtn} variant={mode}>
    //     <FaExpand></FaExpand>
    //   </Button>
    //   <FullScreen handle={handle}>
    //     <div id="fullscreen">
    //       {handle.active && (
    //         <Button
    //           onClick={handle.exit}
    //           className={styles.enterBtn}
    //           variant={mode}
    //         >
    //           <FaCompress></FaCompress>
    //         </Button>
    //       )}
    //       <Game mode={mode} setMode={setMode} />
    //     </div>
    //   </FullScreen>
    // </>
  );
};

export default App;
