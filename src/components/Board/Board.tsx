import styles from "./Board.module.css";
import { useState } from "react";

import { Header, BoardGame, TypeSwitcher, TypesData as typesData } from "../";

const Board = () => {
  const [switchType, setSwitchType] = useState<boolean>(false);
  const [type, setType] = useState<number[]>([0, 0]);
  const [auto, setAuto] = useState<boolean>(false);

  let wait = new Audio("https://www.myinstants.com/media/sounds/chan.swf.mp3");
  let win = new Audio(
    "https://www.myinstants.com/media/sounds/mlg-airhorn.mp3"
  );

  const board = (data: number[][]) =>
    data.map((row) => {
      let i = 0;
      let newRow = [];
      for (let j = 0; j < 9; ++j) {
        if (Math.floor(row[i] / 10) === j || (j === 8 && row[i] === 90)) {
          newRow.push({
            value: row[i],
            clicked: false,
          });
          ++i;
        } else {
          newRow.push({
            value: 0,
            clicked: false,
          });
        }
      }
      return newRow;
    });
  const [boardData, setBoardData] = useState<BoardDataType[][]>(
    board(typesData[type[0]][type[1]])
  );
  const [history, setHistory] = useState<BoardDataType[][][]>([
    board(typesData[type[0]][type[1]]),
  ]);
  const [time, setTime] = useState<number>(0);
  const [theme, setTheme] = useState<string>("light");

  const countClick = (row: BoardDataType[]) => {
    let res = 0;
    for (let x of row) if (x.clicked) ++res;
    return res;
  };

  const reset = () => {
    setBoardData(history[0]);
    setHistory([history[0]]);
    setTime(0);
  };

  const undo = () => {
    let newTime = time - 1;
    if (newTime >= 0) {
      newTime < history.length && setBoardData(history[newTime]);
      setTime(newTime);
    }
  };

  const redo = () => {
    let newTime = time + 1;
    if (newTime < history.length) {
      newTime >= 0 && setBoardData(history[newTime]);
      setTime(newTime);
    }
  };

  const onClickItem = (ir: number, ic: number, clicked: boolean) => {
    let newBoardData = boardData.map((row, i) =>
      row.map((x, j) => {
        if (i === ir && j === ic) {
          return { ...x, clicked: !clicked };
        }
        return x;
      })
    );
    setHistory([...history, newBoardData]);
    setTime(time + 1);
    if (!clicked) {
      let count = countClick(boardData[ir]);
      if (count === 3) {
        wait.play();
      } else if (count === 4) {
        win.play();
      }
    }
    setBoardData(newBoardData);
  };

  const onClickType = (i: number, j: number) => {
    setType([i, j]);
    setBoardData(board(typesData[i][j]));
    setHistory([board(typesData[i][j])]);
    setSwitchType(false);
    setTime(0);
  };

  const startAutoPlay = () => {
    reset();
    setAuto(true);
  };
  const stopAutoPlay = () => {
    reset();
    setAuto(false);
  };
  return (
    <div className={styles.container}>
      <Header
        {...{
          setSwitchType,
          type,
          theme,
          setTheme,
          reset,
          undo,
          redo,
          switchType,
          auto,
          startAutoPlay,
          stopAutoPlay,
        }}
      />
      {!switchType ? (
        <BoardGame
          {...{
            boardData,
            theme,
            onClickItem,
            type,
          }}
        />
      ) : (
        <TypeSwitcher
          {...{
            onClickType,
            type,
          }}
        />
      )}
    </div>
  );
};

export default Board;
