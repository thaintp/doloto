import { useContext, useMemo } from "react";
import Table from "react-bootstrap/Table";

import { GameContext } from "../Game";

import styles from "./index.module.css";

const Board = ({ clicked }: BoardPropsType) => {
  const [
    { data, auto, showGen, genNumberIndex, genNumbers, typeColor, mode },
    dispatch,
  ] = useContext(GameContext);

  const temp = useMemo(
    () =>
      genNumberIndex < 81
        ? Array(9)
            .fill(false)
            .map(() => Array(9).fill(false))
        : Array(10)
            .fill(false)
            .map(() => Array(9).fill(false)),
    [genNumberIndex]
  );

  return showGen ? (
    <Table bordered variant={mode} className={styles.container}>
      <tbody>
        {temp.map((row: number[], ir: number) => (
          <tr key={ir}>
            {row.map((x, ic) => (
              <td
                key={ic}
                style={{
                  backgroundColor:
                    row.length * ir + ic === genNumberIndex - 1
                      ? typeColor
                      : undefined,
                  color:
                    row.length * ir + ic < genNumberIndex
                      ? undefined
                      : mode === "light"
                      ? "#ffffff"
                      : "#343a40",
                }}
              >
                {row.length * ir + ic < genNumberIndex
                  ? genNumbers[row.length * ir + ic]
                  : "00"}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  ) : (
    <Table bordered variant={mode} className={styles.container}>
      <tbody>
        {data.map((row: number[], ir: number) => (
          <tr key={ir}>
            {row.map((x, ic) => (
              <td
                style={{
                  backgroundColor: clicked[ir][ic] ? typeColor : undefined,
                  color:
                    x > 0
                      ? undefined
                      : mode === "light"
                      ? "#ffffff"
                      : "#343a40",
                }}
                onClick={() => {
                  !auto &&
                    x &&
                    dispatch({ type: "CLICK", coordinate: [ir, ic] });
                }}
                key={ic}
              >
                {x === 0 ? "00" : x}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default Board;
