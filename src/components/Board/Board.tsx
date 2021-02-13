import Table from "react-bootstrap/Table";
import styles from "./Board.module.css";
import { useState } from "react";

const Board = ({ data, theme }: { data: number[][]; theme: string }) => {
  let controlButtons = [
    [0, 1, 2, 3, 4],
    [5, 6, 7, 8, 9],
  ];
  let wait = new Audio("https://www.myinstants.com/media/sounds/chan.swf.mp3");
  let win = new Audio(
    "https://www.myinstants.com/media/sounds/mlg-airhorn.mp3"
  );
  const [clicked, setClicked] = useState<boolean[][]>(
    Array.from({ length: data.length }, () =>
      Array.from({ length: data[0].length }, () => false)
    )
  );
  const [control, setControl] = useState<number | undefined>(undefined);

  const countClick = (row: boolean[]) => {
    let res = 0;
    for (let x of row) if (x) ++res;
    return res;
  };

  const onClickItem = (ir: number, ic: number) => {
    if (!clicked[ir][ic]) {
      let count = countClick(clicked[ir]);
      if (count === 3) {
        wait.play();
      } else if (count === 4) {
        win.play();
      }
    }
    setClicked(
      clicked.map((row, i) =>
        row.map((x, j) => {
          return i === ir && j === ic ? !x : x;
        })
      )
    );
  };
  return (
    <div className={styles.container}>
      <Table bordered variant={theme} className={styles.table}>
        <tbody>
          {data.map((row, ir) => (
            <tr key={ir}>
              {row.map((x, ic) => (
                <td
                  className={
                    clicked[ir][ic]
                      ? styles.clicked
                      : Math.floor(x / 10) === control
                      ? styles.matched
                      : undefined
                  }
                  onClick={() => onClickItem(ir, ic)}
                  key={ic}
                >
                  {x}
                </td>
              ))}
            </tr>
          ))}
          {controlButtons.map((row, ir) => (
            <tr key={ir} className={styles.control}>
              {row.map((x, ic) => (
                <td
                  key={ic}
                  onClick={() => setControl(x)}
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
