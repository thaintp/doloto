import Table from "react-bootstrap/Table";
import styles from "./BoardGame.module.css";

interface BoardGamePropsType {
  boardData: BoardDataType[][];
  theme: string;
  control: number | undefined;
  onClickControl: Function;
  onClickItem: Function;
}

const controlButtons = [
  [0, 2, 4, 6, 8],
  [1, 3, 5, 7, 9],
];

const BoardGame = (props: BoardGamePropsType) => (
  <Table bordered variant={props.theme}>
    <tbody>
      {props.boardData.map((row, ir) => (
        <tr key={ir}>
          {row.map((x, ic) => (
            <td
              className={
                x.clicked
                  ? styles.clicked
                  : Math.floor(x.value / 10) === props.control
                  ? styles.matched
                  : undefined
              }
              onClick={() => props.onClickItem(ir, ic, x.clicked)}
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
            props.theme === "light" ? styles.controlLight : styles.controlDark
          }
        >
          {row.map((x, ic) => (
            <td
              key={ic}
              onClick={() => props.onClickControl(ic, x)}
              className={
                props.control === x ? styles.controlClicked : undefined
              }
            >
              {x}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </Table>
);

export default BoardGame;
