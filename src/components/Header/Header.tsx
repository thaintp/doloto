import { useContext } from "react";
import styles from "./Header.module.css";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Swal from "sweetalert2";
import { AppContext } from "../../App";

import { IoArrowRedo, IoArrowUndo } from "react-icons/io5";
import {
  FaTh,
  FaBullhorn,
  FaFan,
  FaSyncAlt,
  FaSun,
  FaMoon,
} from "react-icons/fa";

import { TypesColorLight, TypesColorDark, ThemeColor } from "../";
import { Number1Icon, Number2Icon } from "../Icons";

interface HeaderPropsType {
  switchType: boolean;
  setSwitchType: Function;
  type: number[];
  reset: Function;
  undo: Function;
  redo: Function;
  auto: boolean;
  startAutoPlay: Function;
  stopAutoPlay: Function;
  play: Function;
  toggleShow: Function;
  full: boolean;
}

const Header = (props: HeaderPropsType) => {
  const [mode, setMode] = useContext(AppContext);
  const confirmReset = async () => {
    const root: HTMLElement | undefined =
      document.getElementById("fullscreen") ?? undefined;
    Swal.fire({
      title: "Chơi ván mới?",
      text: "Xóa hết các nước đi của ván này và chơi ván mới!",
      showCancelButton: true,
      confirmButtonText: "Chơi",
      cancelButtonText: "Không",
      target: root,
    }).then((result) => {
      result.isConfirmed && props.reset();
    });
  };
  const confirmAuto = () => {
    const root: HTMLElement | undefined =
      document.getElementById("fullscreen") ?? undefined;
    if (!props.auto) {
      Swal.fire({
        title: "Mở kêu số?",
        text:
          "Mở tính năng kêu số và tự động dò, khi mở sẽ xoá hết các nước đi của ván này!",
        showCancelButton: true,
        confirmButtonText: "Mở",
        cancelButtonText: "Không",
        target: root,
      }).then((result) => {
        if (result.isConfirmed) {
          props.startAutoPlay();
        }
      });
    } else {
      Swal.fire({
        title: "Tắt kêu số?",
        text:
          "Tắt tính năng kêu số và tự động dò, khi tắt sẽ xoá hết các nước đi của ván này!",
        showCancelButton: true,
        confirmButtonText: "Tắt",
        cancelButtonText: "Không",
        target: root,
      }).then((result) => {
        result.isConfirmed && props.stopAutoPlay();
      });
    }
  };
  return (
    <Container
      className={styles.container}
      style={{ backgroundColor: ThemeColor[mode === "light" ? 0 : 1] }}
    >
      <Row className={styles.header}>
        <Col xs={4} style={{ padding: "0" }}>
          <Button
            className={styles.mrBtn}
            variant={mode}
            onClick={() => props.setSwitchType(!props.switchType)}
            style={{
              backgroundColor:
                mode === "light"
                  ? TypesColorLight[props.type[0]]
                  : TypesColorDark[props.type[0]],
            }}
          >
            {props.type[1] === 0 ? (
              <Number1Icon></Number1Icon>
            ) : (
              <Number2Icon></Number2Icon>
            )}
          </Button>
          {mode === "light" ? (
            <Button variant={mode} onClick={() => setMode("dark")}>
              <FaSun></FaSun>
            </Button>
          ) : (
            <Button variant={mode} onClick={() => setMode("light")}>
              <FaMoon></FaMoon>
            </Button>
          )}
        </Col>
        <Col xs={4} style={{ padding: "0" }}>
          <Button
            variant={mode}
            onClick={() => confirmAuto()}
            className={styles.mrBtn}
            disabled={props.switchType}
          >
            <FaBullhorn></FaBullhorn>
          </Button>
          <Button
            variant={mode}
            onClick={() => confirmReset()}
            disabled={props.switchType}
          >
            <FaSyncAlt></FaSyncAlt>
          </Button>
        </Col>

        <Col xs={4} style={{ padding: "0" }}>
          {!props.auto ? (
            <div>
              <Button
                className={styles.mrBtn}
                variant={mode}
                onClick={() => props.undo()}
                disabled={props.switchType}
              >
                <IoArrowUndo></IoArrowUndo>
              </Button>
              <Button
                variant={mode}
                onClick={() => props.redo()}
                disabled={props.switchType}
              >
                <IoArrowRedo></IoArrowRedo>
              </Button>
            </div>
          ) : (
            <div>
              <Button
                variant={mode}
                onClick={() => props.toggleShow()}
                className={styles.mrBtn}
                disabled={props.switchType}
              >
                <FaTh></FaTh>
              </Button>
              <Button
                variant={mode}
                onClick={() => props.play()}
                style={{
                  backgroundColor:
                    mode === "light"
                      ? TypesColorLight[props.type[0]]
                      : TypesColorDark[props.type[0]],
                }}
                disabled={props.full}
              >
                <FaFan></FaFan>
              </Button>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Header;
