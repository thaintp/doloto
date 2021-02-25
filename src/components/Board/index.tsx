import { useContext } from "react";
import { AppContext } from "../../App";
import { GameContext } from "../Game";
import Table from "react-bootstrap/Table";
import { TypesColorLight, TypesColorDark } from "..";
import styles from "./index.module.css";

interface BoardPropsType {
  clicked: boolean[][];
}
const Board = ({ clicked }: BoardPropsType) => {
  const [mode] = useContext(AppContext);
  const [{ type, data, auto }, dispatch] = useContext(GameContext);

  return (
    <Table bordered variant={mode} className={styles.container}>
      <tbody>
        {data.map((row: number[], ir: number) => (
          <tr key={ir}>
            {row.map((x, ic) => (
              <td
                style={{
                  backgroundColor: clicked[ir][ic]
                    ? mode === "light"
                      ? TypesColorLight[type[0]]
                      : TypesColorDark[type[0]]
                    : undefined,
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
