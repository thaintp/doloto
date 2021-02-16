import styles from "./Board.module.css";
import Swal from "sweetalert2";
import { useState } from "react";
import Badge from "react-bootstrap/Badge";

import { GiBuffaloHead } from "react-icons/gi";

import { Header, BoardGame, TypeSwitcher, TypesData as typesData } from "../";

interface BoardType {
  theme: string;
  setTheme: Function;
}

const Board = ({ theme, setTheme }: BoardType) => {
  const shuffle = (arr: number[]) => {
    let ctr = arr.length;
    let index;

    while (ctr > 0) {
      index = Math.floor(Math.random() * ctr);
      ctr--;
      [arr[ctr], arr[index]] = [arr[index], arr[ctr]];
    }
    return arr;
  };
  let wait = new Audio("https://www.myinstants.com/media/sounds/chan.swf.mp3");
  let win = new Audio(
    "https://www.myinstants.com/media/sounds/mlg-airhorn.mp3"
  );

  const [nextAudio, setNextAudio] = useState<typeof wait>(wait);
  const [switchType, setSwitchType] = useState<boolean>(false);
  const [type, setType] = useState<number[]>([0, 0]);
  const [auto, setAuto] = useState<boolean>(false);
  const [full, setFull] = useState<boolean>(false);
  const [genNumbers, setGenNumbers] = useState<number[]>(
    shuffle(Array.from({ length: 90 }, (_, i) => i + 1))
  );
  const [showGen, setShowGen] = useState<boolean>(false);
  const [genNumberIndex, setGenNumberIndex] = useState<number>(0);

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

  const countClick = (row: BoardDataType[]) => {
    let res = 0;
    for (let x of row) if (x.clicked) ++res;
    return res;
  };

  const reset = () => {
    setBoardData(history[0]);
    setHistory([history[0]]);
    setTime(0);
    setGenNumbers(shuffle(genNumbers));
    setGenNumberIndex(0);
    setShowGen(false);
    setFull(false);
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
    if (auto) {
      stopAutoPlay();
      startAutoPlay();
    }
  };
  const autoClick = (num: number, pre: typeof boardData | null) => {
    let newBoardData = (pre ?? boardData).map((row, i) =>
      row.map((x, j) => {
        if (num === x.value) {
          let count = countClick(boardData[i]);
          if (count === 4) {
            win.play();
          }
          return { ...x, clicked: true };
        }
        return x;
      })
    );
    setBoardData(newBoardData);
  };
  const startAutoPlay = () => {
    reset();
    setAuto(true);
    new Audio(`./audio/${genNumbers[0]}.mp3`).play();
    autoClick(genNumbers[0], history[0]);
    setNextAudio(new Audio(`./audio/${genNumbers[1]}.mp3`));
  };
  const stopAutoPlay = () => {
    reset();
    setAuto(false);
    setGenNumbers(shuffle(genNumbers));
    setGenNumberIndex(0);
  };

  const play = () => {
    nextAudio.play();
    autoClick(genNumbers[genNumberIndex + 1], null);
    setGenNumberIndex(genNumberIndex + 1);
    const root: HTMLElement | undefined =
      document.getElementById("fullscreen") ?? undefined;
    if (genNumberIndex + 2 === 90) {
      setFull(true);
      Swal.fire({
        title: "Đã kêu hết bộ cờ, chơi ván mới?",
        target: root,
        text: "Xóa hết các nước đi của ván này và chơi ván mới!",
        showCancelButton: true,
        confirmButtonText: "Chơi",
        cancelButtonText: "Không",
      }).then((result) => {
        result.isConfirmed && reset();
      });
    } else {
      setNextAudio(new Audio(`./audio/${genNumbers[genNumberIndex + 2]}.mp3`));
    }
  };
  const toggleShow = () => {
    setShowGen(!showGen);
  };
  return (
    <div>
      <div className={styles.genNumberContainer}>
        <Badge variant={theme} className={styles.badge}>
          {auto ? (
            <span className={styles.genNumber}>
              {genNumbers[genNumberIndex]}
            </span>
          ) : (
            <GiBuffaloHead className={styles.genNumber}></GiBuffaloHead>
          )}
        </Badge>
      </div>
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
            play,
            toggleShow,
            full,
          }}
        />
        {!switchType ? (
          <BoardGame
            {...{
              boardData,
              theme,
              onClickItem,
              type,
              genNumbers,
              genNumberIndex,
              showGen,
              auto,
            }}
          />
        ) : (
          <TypeSwitcher
            {...{
              onClickType,
              type,
              theme,
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Board;
