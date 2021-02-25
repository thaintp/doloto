/// <reference types="react-scripts" />

interface BoardDataType {
  value: number;
  clicked: boolean;
}

interface GameItemType {
  value: number;
  clicked: boolean;
}

interface GameStateType {
  type: number[];
  gameData: GameItemType[][];
}

interface AutoGameStateType {
  full: boolean;
  showGen: boolean;
  genNumbers: number[];
  genNumberIndex: number;
  speed: number;
  nextAudio: HTMLAudioElement;
}

type ActionType =
  | { type: "INIT" }
  | { type: "CLICK"; coordinate: number[] }
  | { type: "UNDO" }
  | { type: "REDO" }
  | { type: "RESET" }
  | { type: "TOGGLE_SHOW_SWITCH_TYPE" }
  | { type: "SWITCH_TYPE"; typeVal: number[] }
  | { type: "START_AUTO" }
  | { type: "STOP_AUTO" }
  | { type: "PLAY_NEXT" };

interface StateType {
  type: number[];
  data: number[][];
  clicked: boolean[][];
  showSwitchType: boolean;
  auto: boolean;
  speed: number;
  genNumbers: number[];
  genNumberIndex: number;
  curGenNumber: number;
  nextAudio: any;
  history: any;
  undo: Function;
  redo: Function;
  set: Function;
  resetToFirstState: Function;
}

type GameActionType =
  | { type: "INIT"; payload: any }
  | { type: "COUNTRY_CHANGE"; payload: string };

type UndoActionType =
  | { type: "UNDO" }
  | { type: "REDO" }
  | { type: "SET"; newPresent: any }
  | { type: "RESET"; newPresent: any }
  | { type: "RESET_TO_FIRST_STATE" }
  | { type: "START_AUTO" };
