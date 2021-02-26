/// <reference types="react-scripts" />

type UndoActionType =
  | { type: "UNDO" }
  | { type: "REDO" }
  | { type: "SET"; newPresent: any }
  | { type: "RESET"; newPresent: any }
  | { type: "RESET_TO_FIRST_STATE" }
  | { type: "START_AUTO" };

type ActionType =
  | { type: "INIT" }
  | { type: "CLICK"; coordinate: number[] }
  | { type: "SET_MODE"; mode: string }
  | { type: "UNDO" }
  | { type: "REDO" }
  | { type: "RESET" }
  | { type: "TOGGLE_SHOW_SWITCH_TYPE" }
  | { type: "TOGGLE_SHOW_GEN" }
  | { type: "SWITCH_TYPE"; typeVal: number[] }
  | { type: "START_AUTO" }
  | { type: "STOP_AUTO" }
  | { type: "PLAY_NEXT" }
  | { type: "INC_SPEED" }
  | { type: "DES_SPEED" };

interface StateType {
  type: number[];
  data: number[][];
  clicked: boolean[][];
  showSwitchType: boolean;
  showGen: boolean;
  auto: boolean;
  full: boolean;
  speed: number;
  genNumbers: number[];
  genNumberIndex: number;
  curGenNumber: number;
  nextAudio: any;
  history: any;
  mode: string;
  setMode: Function;
  modeColor?: string;
  typeColor?: string;
  undo: Function;
  redo: Function;
  set: Function;
  resetToFirstState: Function;
}

interface GamePropsType {
  mode: string;
  setMode: Function;
}

interface BoardPropsType {
  clicked: boolean[][];
}
