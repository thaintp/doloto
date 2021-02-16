import styles from "./Header.module.css";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Swal from "sweetalert2";

import { IoArrowRedo, IoArrowUndo } from "react-icons/io5";
import {
  FaTh,
  FaBullhorn,
  FaFan,
  FaSyncAlt,
  FaSun,
  FaMoon,
  FaHeart,
} from "react-icons/fa";

import { TypesColorLight, TypesColorDark } from "../";

interface HeaderPropsType {
  switchType: boolean;
  setSwitchType: Function;
  type: number[];
  theme: string;
  setTheme: Function;
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
    <Container className={styles.container}>
      <Row className={styles.header}>
        <Col xs={4} style={{ padding: "0" }}>
          <Button
            className={styles.mrBtn}
            variant={props.theme}
            onClick={() => props.setSwitchType(!props.switchType)}
            style={{
              backgroundColor:
                props.theme === "light"
                  ? TypesColorLight[props.type[0]]
                  : TypesColorDark[props.type[0]],
            }}
          >
            <FaHeart></FaHeart>
          </Button>
          {props.theme === "light" ? (
            <Button
              variant={props.theme}
              onClick={() => props.setTheme("dark")}
            >
              <FaSun></FaSun>
            </Button>
          ) : (
            <Button
              variant={props.theme}
              onClick={() => props.setTheme("light")}
            >
              <FaMoon></FaMoon>
            </Button>
          )}
        </Col>
        <Col xs={4} style={{ padding: "0" }}>
          <Button
            variant={props.theme}
            onClick={() => confirmAuto()}
            className={styles.mrBtn}
            disabled={props.switchType}
          >
            <FaBullhorn></FaBullhorn>
          </Button>
          <Button
            variant={props.theme}
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
                variant={props.theme}
                onClick={() => props.undo()}
                disabled={props.switchType}
              >
                <IoArrowUndo></IoArrowUndo>
              </Button>
              <Button
                variant={props.theme}
                onClick={() => props.redo()}
                disabled={props.switchType}
              >
                <IoArrowRedo></IoArrowRedo>
              </Button>
            </div>
          ) : (
            <div>
              <Button
                variant={props.theme}
                onClick={() => props.toggleShow()}
                className={styles.mrBtn}
                disabled={props.switchType}
              >
                <FaTh></FaTh>
              </Button>
              <Button
                variant={props.theme}
                onClick={() => props.play()}
                style={{
                  backgroundColor:
                    props.theme === "light"
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
