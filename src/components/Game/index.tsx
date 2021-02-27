import { useEffect, createContext, useReducer } from "react";
import Swal from "sweetalert2";

import { useUndo } from "../../hooks";
import { gameReducer } from "../../reducers";
import { Header, Control, Board, TypeSwitcher } from "..";
import { fullscreenElem, createEmptyClicked } from "../../utils";

import styles from "./index.module.css";

export const GameContext = createContext<any>(undefined);

const Game = ({ mode, setMode }: GamePropsType) => {
  const [history, historyDo] = useUndo(createEmptyClicked());
  const [state, dispatch] = useReducer(gameReducer, {
    mode,
    setMode,
    clicked: history.present,
    ...historyDo,
  });

  useEffect(() => {
    const cachedStr = window.localStorage.getItem("game");
    if (cachedStr) {
      const cached = JSON.parse(cachedStr);
      if (cached.state.genNumbers) {
        dispatch({ type: "INIT_CACHE", cached });
      } else {
        dispatch({ type: "INIT" });
      }
    } else {
      dispatch({ type: "INIT" });
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(
      "game",
      JSON.stringify({
        history,
        state,
      })
    );
  }, [state, history]);

  useEffect(() => {
    state.full &&
      Swal.fire({
        title: "Đã kêu hết bộ cờ, chơi ván mới?",
        target: fullscreenElem(),
        text: "Xóa hết các nước đi của ván này và chơi ván mới!",
        showCancelButton: true,
        confirmButtonText: "Chơi",
        cancelButtonText: "Không",
      }).then(({ isConfirmed }) => {
        isConfirmed && dispatch({ type: "RESET" });
      });
  }, [state.full]);

  return state.data ? (
    <GameContext.Provider value={[state, dispatch]}>
      <Header />
      <div
        className={styles.container}
        style={{ backgroundColor: state.modeColor }}
      >
        <Control canUndo={historyDo.canUndo} canRedo={historyDo.canRedo} />
        {state.showSwitchType ? (
          <TypeSwitcher />
        ) : (
          <Board clicked={history.present} />
        )}
      </div>
    </GameContext.Provider>
  ) : (
    <></>
  );
};

export default Game;
