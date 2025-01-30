import { useContext, useMemo } from "react";
import Table from "react-bootstrap/Table";

import { GameContext } from "../Game";

import styles from "./index.module.css";
import { BgColor } from "../../data";

const Board = ({ clicked, click }: BoardPropsType) => {
  const [{ data, auto, showGen, genNumberIndex, genNumbers, typeColor, mode }] =
    useContext(GameContext);

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
                  backgroundColor: clicked[ir][ic] ? typeColor : BgColor[mode],
                  color: x > 0 ? undefined : BgColor[mode],
                }}
                onClick={() => {
                  !auto && x && click([ir, ic]);
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
