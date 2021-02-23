import { useContext } from "react";
import styles from "./index.module.css";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Swal from "sweetalert2";
import Badge from "react-bootstrap/Badge";
import { AppContext } from "../../App";

import {
  Types as types,
  TypesColorLight,
  TypesColorDark,
  ThemeColor,
} from "../";

interface TypeSwitcherPropsType {
  type: number[];
  onClickType: Function;
}

const TypeSwitcher = (props: TypeSwitcherPropsType) => {
  const [mode] = useContext(AppContext);
  const root: HTMLElement | undefined =
    document.getElementById("fullscreen") ?? undefined;
  const confirmSwitch = (i: number, j: number) => {
    Swal.fire({
      title: "Đổi tờ mới?",
      text: "Xóa hết các nước đi của ván cũ và chơi ván mới bằng tờ mới!",
      showCancelButton: true,
      confirmButtonText: "Đổi",
      cancelButtonText: "Không",
      target: root,
    }).then((result) => {
      result.isConfirmed && props.onClickType(i, j);
    });
  };
  return (
    <div
      className={styles.container}
      style={{
        backgroundColor: ThemeColor[mode === "light" ? 0 : 1],
        color: mode === "light" ? "#000" : "#fff",
      }}
    >
      <h5 style={{ margin: "20px 0" }}>
        Tờ hiện tại là tờ màu{" "}
        <Badge
          variant={mode}
          style={{
            backgroundColor:
              mode === "light"
                ? TypesColorLight[props.type[0]]
                : TypesColorDark[props.type[0]],
          }}
        >
          {types[props.type[0]]}
        </Badge>{" "}
        số {props.type[1] + 1}
      </h5>
      <h3>Chọn tờ khác?</h3>
      <ol>
        {types.map((type, i) => (
          <li
            style={{ marginTop: "10px" }}
            className={styles.typeSwitcher}
            key={i}
          >
            <Container>
              <Row>
                <Col xs={5}>{type}</Col>
                <Col xs={7} style={{ textAlign: "right" }}>
                  {[1, 2].map((t, j) => (
                    <Button
                      style={{
                        backgroundColor:
                          mode === "light"
                            ? TypesColorLight[i]
                            : TypesColorDark[i],
                      }}
                      onClick={() => confirmSwitch(i, j)}
                      variant={mode}
                      key={i + j}
                      disabled={i === props.type[0] && j === props.type[1]}
                      className={styles.mrBtn}
                    >
                      {t}
                    </Button>
                  ))}
                </Col>
              </Row>
            </Container>
          </li>
        ))}
      </ol>
    </div>
  );
};
export default TypeSwitcher;
