import { TypesColorDark, TypesColorLight, ModeColor } from "../data";

export const waitSound = () => new Audio("./audio/wait.mp3");
export const winSound = () => new Audio("./audio/win.mp3");

export const fullscreenElem = () => {
  return document.getElementById("fullscreen") ?? undefined;
};

export const createEmptyClicked = () =>
  Array(9)
    .fill(false)
    .map(() => Array(9).fill(false));

export const createBoard = (data: number[][]) =>
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

export const countClick = (row: boolean[]) => {
  let res = 0;
  for (let x of row) if (x) ++res;
  return res;
};

export const shuffle = (arr: number[]) => {
  let draft = [...arr];
  let ctr = draft.length;
  let index;

  while (ctr > 0) {
    index = Math.floor(Math.random() * ctr);
    ctr--;
    [draft[ctr], draft[index]] = [draft[index], draft[ctr]];
  }
  return draft;
};

export const createAudio = (num: number, newSpeed: number) => {
  let res = new Audio(`./audio/${num}.mp3`);
  res.playbackRate = newSpeed;
  return res;
};

export const getColor = (mode: string, type?: number[]) => {
  return {
    typeColor: type
      ? mode === "dark"
        ? TypesColorDark[type[0]]
        : TypesColorLight[type[0]]
      : undefined,
    modeColor: ModeColor[mode],
  };
};
