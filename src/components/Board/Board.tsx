import Table from "react-bootstrap/Table";
import styles from "./Board.module.css";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Board = ({ data, theme }: { data: number[][]; theme: string }) => {
  let controlButtons = [
    [0, 1, 2, 3, 4],
    [5, 6, 7, 8, 9],
  ];
  let wait = new Audio("https://www.myinstants.com/media/sounds/chan.swf.mp3");
  let win = new Audio(
    "https://www.myinstants.com/media/sounds/mlg-airhorn.mp3"
  );

  const board = data.map((row) =>
    row.map((x) => {
      return {
        value: x,
        clicked: false,
      };
    })
  );
  const [control, setControl] = useState<number | undefined>(undefined);
  const [boardData, setBoardData] = useState<BoardDataType[][]>(board);
  const [history, setHistory] = useState<BoardDataType[][][]>([board]);
  const [time, setTime] = useState<number>(0);

  const countClick = (row: BoardDataType[]) => {
    let res = 0;
    for (let x of row) if (x.clicked) ++res;
    return res;
  };

  const reset = () => {
    setBoardData(board);
    setControl(undefined);
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
    // history.splice(time);
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

  return (
    <div className={styles.container}>
      <Container>
        <Row className={styles.header}>
          <Col>
            <Button variant={theme} onClick={() => reset()}>
              Chơi lại
            </Button>
          </Col>
          <Col xs={5}>
            <h3>Dò Lô tô</h3>
          </Col>
          <Col>
            <Button variant={theme} onClick={() => undo()}>
              🡸
            </Button>
            <Button variant={theme} onClick={() => redo()}>
              🡺
            </Button>
          </Col>
        </Row>
      </Container>

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
            <tr key={ir} className={styles.control}>
              {row.map((x, ic) => (
                <td
                  key={ic}
                  onClick={() => onClickControl(ic, x)}
                  className={control === x ? styles.controlClicked : undefined}
                >
                  {x}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Board;
