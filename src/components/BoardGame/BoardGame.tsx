import Table from "react-bootstrap/Table";
import { TypesColor } from "../";

interface BoardGamePropsType {
  boardData: BoardDataType[][];
  theme: string;
  onClickItem: Function;
  type: number[];
}

const BoardGame = (props: BoardGamePropsType) => (
  <Table bordered variant={props.theme}>
    <tbody>
      {props.boardData.map((row, ir) => (
        <tr key={ir}>
          {row.map((x, ic) => (
            <td
              style={{
                backgroundColor: x.clicked
                  ? TypesColor[props.type[0]]
                  : undefined,
              }}
              onClick={() => {
                x.value && props.onClickItem(ir, ic, x.clicked);
              }}
              key={ic}
            >
              {x.value === 0 ? "" : x.value < 10 ? `0${x.value}` : x.value}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </Table>
);

export default BoardGame;
