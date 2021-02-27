import { useEffect, createContext, useReducer } from "react";
import Swal from "sweetalert2";
import produce from "immer";

import { useUndo } from "../../hooks";
import { gameReducer } from "../../reducers";
import { Header, Control, Board, TypeSwitcher } from "..";
import {
  fullscreenElem,
  createEmptyClicked,
  countClick,
  waitSound,
  winSound,
} from "../../utils";

import styles from "./index.module.css";

export const GameContext = createContext<any>(undefined);

const Game = ({ mode, setMode }: GamePropsType) => {
  const [history, historyDo] = useUndo(createEmptyClicked());
  const [state, dispatch] = useReducer(gameReducer, {
    mode,
    setMode,
    reset: historyDo.resetToFirstState,
    initHistoryCached: historyDo.initCached,
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

  const click = (coordinate: number[]) => {
    const [x, y] = coordinate;
    historyDo.set(
      produce(history.present, (clicked: boolean[][]) => {
        clicked[x][y] = !clicked[x][y];

        if (clicked[x][y]) {
          const count = countClick(clicked[x]);
          if (count === 4) waitSound.play();
          else if (count === 5) {
            winSound.play();
          }
        }
      })
    );
  };

  const playNext = () => {
    historyDo.set(
      history.present.map((row: boolean[], ir: number) =>
        row.map((x: Boolean, ic: number) => {
          if (state.data[ir][ic] === state.genNumbers[state.genNumberIndex]) {
            const count = countClick(row);
            if (count === 4) winSound.play();
            return true;
          } else {
            return x;
          }
        })
      )
    );
    dispatch({ type: "PLAY_NEXT" });
  };

  return state.data ? (
    <GameContext.Provider value={[state, dispatch]}>
      <Header />
      <div
        className={styles.container}
        style={{ backgroundColor: state.modeColor }}
      >
        <Control playNext={playNext} historyDo={historyDo} />
        {state.showSwitchType ? (
          <TypeSwitcher />
        ) : (
          <Board clicked={history.present} click={click} />
        )}
      </div>
    </GameContext.Provider>
  ) : (
    <></>
  );
};

export default Game;
