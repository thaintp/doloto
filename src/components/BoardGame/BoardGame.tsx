import Table from "react-bootstrap/Table";
import { TypesColorLight, TypesColorDark } from "../";
import styles from "./BoardGame.module.css";

interface BoardGamePropsType {
  boardData: BoardDataType[][];
  theme: string;
  onClickItem: Function;
  type: number[];
  genNumbers: number[];
  showGen: boolean;
  genNumberIndex: number;
  auto: boolean;
}
const BoardGame = (props: BoardGamePropsType) => {
  return !props.showGen ? (
    <Table bordered variant={props.theme} className={styles.container}>
      <tbody>
        {props.boardData.map((row, ir) => (
          <tr key={ir}>
            {row.map((x, ic) => (
              <td
                style={{
                  backgroundColor: x.clicked
                    ? props.theme === "light"
                      ? TypesColorLight[props.type[0]]
                      : TypesColorDark[props.type[0]]
                    : undefined,
                  color:
                    x.value > 0
                      ? undefined
                      : props.theme === "light"
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
    <Table bordered variant={props.theme} className={styles.container}>
      <tbody>
        {props.boardData.map((row, ir) => (
          <tr key={ir}>
            {row.map((x, ic) => (
              <td
                key={ic}
                style={{
                  color:
                    row.length * ir + ic <= props.genNumberIndex
                      ? undefined
                      : props.theme === "light"
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
