import { useContext } from "react";
import Table from "react-bootstrap/Table";
import { TypesColorLight, TypesColorDark } from "../";
import styles from "./BoardGame.module.css";
import { AppContext } from "../../App";

interface BoardGamePropsType {
  boardData: BoardDataType[][];
  onClickItem: Function;
  type: number[];
  genNumbers: number[];
  showGen: boolean;
  genNumberIndex: number;
  auto: boolean;
}
const BoardGame = (props: BoardGamePropsType) => {
  const [mode] = useContext(AppContext);
  let temp =
    props.genNumberIndex < 81
      ? props.boardData
      : [...props.boardData, props.boardData[0]];
  return !props.showGen ? (
    <Table bordered variant={mode} className={styles.container}>
      <tbody>
        {props.boardData.map((row, ir) => (
          <tr key={ir}>
            {row.map((x, ic) => (
              <td
                style={{
                  backgroundColor: x.clicked
                    ? mode === "light"
                      ? TypesColorLight[props.type[0]]
                      : TypesColorDark[props.type[0]]
                    : undefined,
                  color:
                    x.value > 0
                      ? undefined
                      : mode === "light"
                      ? "#ffffff"
                      : "#343a40",
                }}
                onClick={() => {
                  !props.auto &&
                    x.value &&
                    props.onClickItem(ir, ic, x.clicked);
                }}
                key={ic}
              >
                {x.value === 0 ? "00" : x.value}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  ) : (
    <Table bordered variant={mode} className={styles.container}>
      <tbody>
        {temp.map((row, ir) => (
          <tr key={ir}>
            {row.map((x, ic) => (
              <td
                key={ic}
                style={{
                  backgroundColor:
                    row.length * ir + ic === props.genNumberIndex
                      ? mode === "light"
                        ? TypesColorLight[props.type[0]]
                        : TypesColorDark[props.type[0]]
                      : undefined,
                  color:
                    row.length * ir + ic <= props.genNumberIndex
                      ? undefined
                      : mode === "light"
                      ? "#ffffff"
                      : "#343a40",
                }}
              >
                {row.length * ir + ic <= props.genNumberIndex
                  ? props.genNumbers[row.length * ir + ic]
                  : "00"}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default BoardGame;
