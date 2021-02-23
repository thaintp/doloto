import {
  useContext,
  useState,
  useEffect,
  createContext,
  useReducer,
} from "react";
import { useUndo } from "../../hooks";

import produce from "immer";

import styles from "./index.module.css";

import { AppContext } from "../../App";

import { TypesData, ThemeColor, Board, Control } from "..";

export const GameContext = createContext<any>(undefined);

type ActionType =
  | { type: "INIT" }
  | { type: "CLICK"; coordinate: number[] }
  | { type: "HISTORY_CHANGE"; history: any };

interface StateType {
  type?: number[];
  data?: number[][];
  clicked: boolean[][];
  mode: string;
}

const createEmptyClicked = () =>
  Array(9)
    .fill(false)
    .map(() => Array(9).fill(false));

const createBoard = (data: number[][]) =>
  data.map((row) => {
    let i = 0;
    let newRow = [];
    for (let j = 0; j < 9; ++j) {
      if (Math.floor(row[i] / 10) === j || (j === 8 && row[i] === 90)) {
        newRow.push(row[i]);
        ++i;
      } else {
        newRow.push(0);
      }
    }
    return newRow;
  });

const GameReducer = (state: any, action: ActionType) => {
  switch (action.type) {
    case "INIT":
      return {
        ...state,
        type: [0, 0],
        data: createBoard(TypesData[0][0]),
      };
    case "CLICK":
      return state;
    case "HISTORY_CHANGE":
      return {
        ...state,
        clicked: action.history.present,
      };
    default:
      return state;
  }
};

const Game = () => {
  const [mode, setMode] = useContext(AppContext);
  const [history, { undo, redo, set }] = useUndo(createEmptyClicked());
  const [state, dispatch] = useReducer(GameReducer, { undo, redo });

  useEffect(() => {
    dispatch({ type: "INIT" });
  }, []);

  const click = (x: number, y: number) => {
    set(
      produce(history.present, (clicked: boolean[][]) => {
        clicked[x][y] = !clicked[x][y];
      })
    );
  };

  return state.data ? (
    <GameContext.Provider value={[state, dispatch]}>
      <div
        className={styles.container}
        style={{ backgroundColor: ThemeColor[mode === "light" ? 0 : 1] }}
      >
        <Control />
        <Board click={click} clicked={history.present} />
      </div>
    </GameContext.Provider>
  ) : (
    <></>
  );
};

export default Game;
