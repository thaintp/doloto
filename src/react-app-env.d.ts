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

type GameActionType =
  | { type: "INIT"; payload: any }
  | { type: "COUNTRY_CHANGE"; payload: string };

type UndoActionType =
  | { type: "UNDO" }
  | { type: "REDO" }
  | { type: "SET"; newPresent: any }
  | { type: "RESET"; newPresent: any };
