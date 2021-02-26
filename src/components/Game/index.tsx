import {
  useContext,
  useState,
  useEffect,
  createContext,
  useReducer,
} from "react";
import { useUndo } from "../../hooks";

import Swal from "sweetalert2";

import styles from "./index.module.css";

import { AppContext } from "../../App";

import { TypesData, ThemeColor, Board, Control, TypeSwitcher } from "..";

import Badge from "react-bootstrap/Badge";

import { GiBuffaloHead } from "react-icons/gi";

import Button from "react-bootstrap/Button";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { TypesColorDark, TypesColorLight } from "../TypesData";
import { gameReducer } from "../../reducers";
import { fullscreenElem } from "../../utils";

export const GameContext = createContext<any>(undefined);

const createEmptyClicked = () =>
  Array(9)
    .fill(false)
    .map(() => Array(9).fill(false));

const Game = () => {
  const [mode] = useContext(AppContext);
  const [clicked, clickedDo] = useUndo(createEmptyClicked());
  const [state, dispatch] = useReducer(gameReducer, { clicked, ...clickedDo });

  useEffect(() => {
    dispatch({ type: "INIT" });
  }, []);

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
      {state.auto && (
        <div className={styles.speedBtn}>
          <Button
            className={styles.increaseSpeed}
            variant={mode}
            onClick={() => dispatch({ type: "INC_SPEED" })}
          >
            <FaArrowUp></FaArrowUp>
          </Button>
          <Button
            variant={mode}
            onClick={() => dispatch({ type: "DES_SPEED" })}
          >
            <FaArrowDown></FaArrowDown>
          </Button>
        </div>
      )}
      <div
        className={styles.genNumberContainer}
        style={{ backgroundColor: ThemeColor[mode === "light" ? 0 : 1] }}
      >
        <Badge variant={mode} className={styles.badge}>
          {state.auto ? (
            state.genNumberIndex > 0 ? (
              <span className={styles.genNumber}>{state.curGenNumber}</span>
            ) : (
              <GiBuffaloHead
                className={styles.genNumber}
                style={{
                  color:
                    mode === "light"
                      ? TypesColorLight[state.type[0]]
                      : TypesColorDark[state.type[0]],
                }}
              ></GiBuffaloHead>
            )
          ) : (
            <GiBuffaloHead className={styles.genNumber}></GiBuffaloHead>
          )}
        </Badge>
      </div>
      <div
        className={styles.container}
        style={{ backgroundColor: ThemeColor[mode === "light" ? 0 : 1] }}
      >
        <Control canUndo={clickedDo.canUndo} canRedo={clickedDo.canRedo} />
        {state.showSwitchType ? <TypeSwitcher /> : <Board clicked={clicked} />}
      </div>
    </GameContext.Provider>
  ) : (
    <></>
  );
};

export default Game;
