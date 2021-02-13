import Table from "react-bootstrap/Table";
import styles from "./Board.module.css";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { IoArrowRedo, IoArrowUndo } from "react-icons/io5";
import { BiMoon, BiSun } from "react-icons/bi";
import { IoIosColorPalette } from "react-icons/io";
import { VscDebugRestart } from "react-icons/vsc";

const Board = () => {
  const [switchType, setSwitchType] = useState<boolean>(false);
  const [type, setType] = useState<number[]>([0, 0]);
  const types = [
    "Cam",
    "Xanh lá",
    "Xanh biển",
    "Xanh chuối",
    "Tím",
    "Đỏ",
    "Vàng",
    "Hồng",
  ];
  const typesColor = [
    "#f15e00",
    "#00ff00",
    "#00a3ff",
    "#bcff00",
    "#a000f1",
    "#f10000",
    "#ffff00",
    "#f100b3",
  ];

  const typesData = [
    [
      [
        [3, 15, 32, 60, 71],
        [10, 20, 43, 54, 85],
        [2, 26, 35, 59, 76],
        [6, 39, 49, 68, 73],
        [13, 29, 48, 50, 88],
        [22, 30, 53, 65, 82],
        [1, 25, 58, 69, 90],
        [7, 21, 41, 56, 87],
        [11, 37, 44, 61, 70],
      ],
      [
        [12, 34, 40, 75, 89],
        [8, 16, 42, 55, 77],
        [5, 24, 33, 67, 83],
        [14, 27, 51, 78, 84],
        [18, 38, 46, 63, 81],
        [9, 47, 66, 79, 86],
        [4, 28, 31, 57, 72],
        [17, 36, 52, 64, 80],
        [19, 23, 45, 62, 74],
      ],
    ],
    [
      [
        [16, 28, 45, 68, 87],
        [4, 29, 35, 55, 73],
        [9, 30, 54, 62, 88],
        [1, 21, 33, 52, 76],
        [8, 40, 50, 79, 81],
        [11, 20, 46, 63, 83],
        [27, 49, 59, 72, 80],
        [2, 19, 32, 48, 67],
        [14, 22, 57, 78, 90],
      ],
      [
        [6, 18, 47, 69, 86],
        [13, 31, 44, 61, 70],
        [7, 24, 34, 56, 71],
        [5, 23, 41, 65, 74],
        [10, 37, 53, 60, 89],
        [17, 38, 42, 75, 84],
        [15, 25, 51, 77, 85],
        [12, 36, 43, 64, 82],
        [3, 26, 39, 58, 66],
      ],
    ],
    [
      [
        [13, 22, 41, 61, 86],
        [3, 24, 34, 52, 71],
        [1, 35, 56, 64, 83],
        [7, 23, 36, 53, 75],
        [5, 48, 59, 72, 84],
        [14, 28, 42, 60, 87],
        [26, 47, 50, 79, 89],
        [4, 10, 30, 49, 66],
        [15, 25, 51, 76, 81],
      ],
      [
        [9, 16, 46, 65, 80],
        [11, 32, 45, 68, 78],
        [8, 21, 33, 57, 73],
        [6, 20, 43, 63, 77],
        [12, 31, 54, 62, 85],
        [19, 39, 40, 70, 82],
        [18, 29, 58, 74, 90],
        [17, 38, 44, 69, 88],
        [2, 27, 37, 55, 67],
      ],
    ],
    [
      [
        [11, 35, 59, 68, 80],
        [17, 24, 42, 57, 76],
        [1, 27, 48, 79, 81],
        [7, 16, 31, 65, 77],
        [23, 44, 50, 71, 85],
        [14, 37, 49, 63, 88],
        [3, 20, 46, 67, 73],
        [8, 12, 34, 45, 87],
        [19, 39, 55, 60, 89],
      ],
      [
        [9, 25, 38, 53, 86],
        [15, 36, 51, 64, 90],
        [2, 28, 47, 66, 78],
        [5, 10, 41, 56, 72],
        [4, 22, 33, 54, 74],
        [13, 26, 40, 61, 82],
        [29, 30, 58, 62, 83],
        [21, 43, 52, 75, 84],
        [6, 18, 32, 69, 70],
      ],
    ],
    [
      [
        [14, 28, 50, 75, 90],
        [19, 31, 49, 68, 81],
        [5, 20, 47, 77, 84],
        [12, 38, 55, 69, 89],
        [1, 36, 41, 66, 71],
        [18, 26, 57, 70, 88],
        [8, 25, 33, 52, 62],
        [9, 35, 46, 69, 73],
        [10, 27, 48, 59, 86],
      ],
      [
        [15, 24, 44, 64, 79],
        [4, 29, 30, 51, 76],
        [17, 32, 53, 63, 80],
        [7, 23, 56, 61, 85],
        [11, 34, 42, 72, 87],
        [3, 13, 45, 54, 74],
        [15, 21, 43, 58, 78],
        [6, 37, 40, 65, 82],
        [2, 22, 39, 67, 83],
      ],
    ],
    [
      [
        [5, 29, 30, 56, 80],
        [10, 35, 54, 63, 81],
        [4, 26, 45, 61, 79],
        [3, 14, 43, 50, 71],
        [7, 23, 31, 51, 73],
        [11, 28, 49, 69, 89],
        [24, 34, 53, 67, 85],
        [27, 40, 57, 76, 87],
        [1, 16, 33, 65, 78],
      ],
      [
        [19, 32, 58, 64, 84],
        [13, 20, 48, 55, 77],
        [2, 21, 46, 75, 82],
        [6, 18, 39, 62, 70],
        [25, 41, 59, 74, 83],
        [17, 38, 44, 60, 86],
        [8, 22, 47, 66, 72],
        [9, 12, 37, 42, 88],
        [15, 36, 51, 68, 90],
      ],
    ],
    [
      [
        [19, 35, 49, 71, 85],
        [8, 14, 47, 54, 74],
        [6, 25, 36, 62, 84],
        [15, 22, 58, 70, 89],
        [12, 31, 43, 68, 90],
        [1, 42, 65, 72, 87],
        [5, 21, 38, 52, 76],
        [13, 33, 57, 67, 82],
        [11, 26, 44, 69, 79],
      ],
      [
        [7, 16, 32, 66, 73],
        [18, 29, 46, 55, 88],
        [2, 23, 34, 50, 75],
        [4, 30, 40, 61, 78],
        [10, 27, 41, 56, 86],
        [20, 39, 59, 60, 83],
        [9, 234, 51, 64, 81],
        [3, 28, 48, 53, 80],
        [17, 37, 45, 63, 77],
      ],
    ],
    [
      [
        [18, 22, 55, 76, 87],
        [12, 38, 40, 66, 82],
        [1, 27, 42, 73, 85],
        [10, 34, 56, 63, 80],
        [6, 35, 43, 64, 71],
        [13, 21, 54, 74, 90],
        [7, 24, 32, 53, 67],
        [2, 36, 47, 65, 72],
        [11, 23, 45, 51, 81],
      ],
      [
        [19, 28, 46, 68, 75],
        [5, 26, 39, 58, 78],
        [14, 37, 50, 69, 84],
        [3, 25, 57, 60, 86],
        [16, 31, 49, 77, 89],
        [8, 17, 48, 59, 79],
        [15, 20, 44, 52, 70],
        [4, 33, 41, 52, 70],
        [9, 29, 30, 62, 88],
      ],
    ],
  ];

  let controlButtons = [
    [0, 2, 4, 6, 8],
    [1, 3, 5, 7, 9],
  ];
  let wait = new Audio("https://www.myinstants.com/media/sounds/chan.swf.mp3");
  let win = new Audio(
    "https://www.myinstants.com/media/sounds/mlg-airhorn.mp3"
  );

  const board = (data: number[][]) =>
    data.map((row) =>
      row.map((x) => {
        return {
          value: x,
          clicked: false,
        };
      })
    );
  const [control, setControl] = useState<number | undefined>(undefined);
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
    setControl(undefined);
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

  const onClickControl = (ic: number, x: number) => {
    setControl(x);
    setBoardData(
      boardData.map((row, i) => {
        let index = row.findIndex(
          (data: BoardDataType) => Math.floor(data.value / 10) === x
        );
        if (index > -1) {
          [row[ic], row[index]] = [row[index], row[ic]];
        }
        return row;
      })
    );
  };

  const onClickType = (i: number, j: number) => {
    setType([i, j]);
    setBoardData(board(typesData[i][j]));
    setHistory([board(typesData[i][j])]);
    setControl(undefined);
    setSwitchType(false);
    setTime(0);
  };
  return (
    <div className={styles.container}>
      <Container>
        <Row className={styles.header}>
          <Col xs={5}>
            <Button
              className={styles.redoBtn}
              variant="light"
              onClick={() => setSwitchType(!switchType)}
              style={{ backgroundColor: typesColor[type[0]] }}
            >
              <IoIosColorPalette></IoIosColorPalette>
            </Button>
            <Button variant={theme} onClick={() => reset()}>
              <VscDebugRestart></VscDebugRestart>
            </Button>
          </Col>
          <Col xs={2}>
            {theme === "light" && (
              <Button variant={theme} onClick={() => setTheme("dark")}>
                <BiSun></BiSun>
              </Button>
            )}
            {theme === "dark" && (
              <Button variant={theme} onClick={() => setTheme("light")}>
                <BiMoon></BiMoon>
              </Button>
            )}
          </Col>
          <Col xs={5}>
            <Button
              className={styles.redoBtn}
              variant={theme}
              onClick={() => undo()}
            >
              <IoArrowUndo></IoArrowUndo>
            </Button>
            <Button variant={theme} onClick={() => redo()}>
              <IoArrowRedo></IoArrowRedo>
            </Button>
          </Col>
        </Row>
      </Container>
      {!switchType ? (
        <Table bordered variant={theme} className={styles.table}>
          <tbody>
            {boardData.map((row, ir) => (
              <tr key={ir}>
                {row.map((x, ic) => (
                  <td
                    className={
                      x.clicked
                        ? styles.clicked
                        : Math.floor(x.value / 10) === control
                        ? styles.matched
                        : undefined
                    }
                    onClick={() => onClickItem(ir, ic, x.clicked)}
                    key={ic}
                  >
                    {x.value}
                  </td>
                ))}
              </tr>
            ))}
            {controlButtons.map((row, ir) => (
              <tr
                key={ir}
                className={
                  theme === "light" ? styles.controlLight : styles.controlDark
                }
              >
                {row.map((x, ic) => (
                  <td
                    key={ic}
                    onClick={() => onClickControl(ic, x)}
                    className={
                      control === x ? styles.controlClicked : undefined
                    }
                  >
                    {x}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <div>
          <h5 style={{ margin: "20px 0" }}>
            Tờ hiện tại là tờ màu{" "}
            <span style={{ backgroundColor: typesColor[type[0]] }}>
              {types[type[0]]}
            </span>{" "}
            số {type[1] + 1}
          </h5>
          <h3>Chọn tờ khác?</h3>
          <ol>
            {types.map((type, i) => (
              <div className={styles.typeSwitcher}>
                <li style={{ marginTop: "10px" }}>
                  <Container>
                    <Row>
                      <Col xs={7}>{type}</Col>
                      <Col xs={5} style={{ textAlign: "right" }}>
                        {[1, 2].map((t, j) => (
                          <Button
                            style={{
                              backgroundColor: typesColor[i],
                              margin: "0 5px",
                            }}
                            onClick={() => onClickType(i, j)}
                            variant="light"
                          >
                            {t}
                          </Button>
                        ))}
                      </Col>
                    </Row>
                  </Container>
                </li>
              </div>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
};

export default Board;
