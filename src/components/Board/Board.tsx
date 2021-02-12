import Table from "react-bootstrap/Table";
import styles from "./Board.module.css";
import { useState } from "react";

const Board = ({ data, theme }: { data: number[][]; theme: string }) => {
  let temp = Array.from({ length: data.length }, () =>
    Array.from({ length: data[0].length }, () => false)
  );
  const [clicked, setClicked] = useState<boolean[][]>(temp);

  const onClickItem = (ir: number, ic: number) => {
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
      <Table bordered hover variant={theme} className={styles.table}>
        <thead>
          <tr>
            <th>Cột 1</th>
            <th>Cột 2</th>
            <th>Cột 3</th>
            <th>Cột 4</th>
            <th>Cột 5</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, ir) => (
            <tr key={ir}>
              {row.map((x, ic) => (
                <td
                  className={clicked[ir][ic] ? styles.clicked : undefined}
                  onClick={() => onClickItem(ir, ic)}
                  key={ic}
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
