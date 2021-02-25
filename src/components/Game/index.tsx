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

import { TypesData, ThemeColor, Board, Control, TypeSwitcher } from "..";

export const GameContext = createContext<any>(undefined);

type ActionType =
  | { type: "INIT" }
  | { type: "UNDO" }
  | { type: "REDO" }
  | { type: "RESET" }
  | { type: "TOGGLE_SHOW_SWITCH_TYPE" }
  | { type: "SWITCH_TYPE"; typeVal: number[] };

interface StateType {
  type: number[];
  data: number[][];
  clicked: boolean[][];
  showSwitchType: boolean;
  undo: Function;
  redo: Function;
  resetToFirstState: Function;
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

const GameReducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case "INIT":
      return {
        ...state,
        type: [0, 0],
        data: createBoard(TypesData[0][0]),
        showSwitchType: false,
      };
    case "UNDO":
      state.undo();
      return state;
    case "REDO":
      state.redo();
      return state;
    case "RESET":
      state.resetToFirstState();
      return state;
    case "TOGGLE_SHOW_SWITCH_TYPE":
      return {
        ...state,
        showSwitchType: !state.showSwitchType,
      };
    case "SWITCH_TYPE":
      if (!state.showSwitchType) return state;

      state.resetToFirstState();
      return {
        ...state,
        type: action.typeVal,
        data: createBoard(TypesData[action.typeVal[0]][action.typeVal[1]]),
        showSwitchType: false,
      };
    default:
      return state;
  }
};

const Game = () => {
  const [mode] = useContext(AppContext);
  const [history, historyDo] = useUndo(createEmptyClicked());

  const click = (x: number, y: number) => {
    historyDo.set(
      produce(history.present, (clicked: boolean[][]) => {
        clicked[x][y] = !clicked[x][y];
      })
    );
  };

  const [state, dispatch] = useReducer(GameReducer, { ...historyDo });

  useEffect(() => {
    dispatch({ type: "INIT" });
  }, []);

  return state.data ? (
    <GameContext.Provider value={[state, dispatch]}>
      <div
        className={styles.container}
        style={{ backgroundColor: ThemeColor[mode === "light" ? 0 : 1] }}
      >
        <Control canUndo={historyDo.canUndo} canRedo={historyDo.canRedo} />
        {state.showSwitchType ? (
          <TypeSwitcher />
        ) : (
          <Board click={click} clicked={history.present} />
        )}
      </div>
    </GameContext.Provider>
  ) : (
    <></>
  );
};

export default Game;
