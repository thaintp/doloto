import styles from "./Header.module.css";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Swal from "sweetalert2";

import { IoArrowRedo, IoArrowUndo, IoPause } from "react-icons/io5";
import { BiMoon, BiSun } from "react-icons/bi";
import { IoIosColorPalette } from "react-icons/io";
import { VscDebugRestart } from "react-icons/vsc";
import { HiOutlineSpeakerphone } from "react-icons/hi";

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
}

const Header = (props: HeaderPropsType) => {
  const confirm = () => {
    if (!props.auto) {
      Swal.fire({
        title: "Mở tự động kêu số?",
        text:
          "Mở tính năng tự động kêu số và tự động dò, khi mở sẽ xoá hết dữ liệu chơi ván này!",
        showCancelButton: true,
        confirmButtonText: "Mở",
        cancelButtonText: "Không",
      }).then((result) => {
        result.isConfirmed && props.startAutoPlay();
      });
    } else {
      Swal.fire({
        title: "Tắt tự động kêu số?",
        text:
          "Tắt tính năng tự động kêu số và tự động dò, khi tắt sẽ xoá hết dữ liệu chơi ván này!",
        showCancelButton: true,
        confirmButtonText: "Tắt",
        cancelButtonText: "Không",
      }).then((result) => {
        result.isConfirmed && props.stopAutoPlay();
      });
    }
  };
  return (
    <Container>
      <Row className={styles.header}>
        <Col xs={4} style={{ padding: "0" }}>
          <Button
            className={styles.redoBtn}
            variant={props.theme}
            onClick={() => props.setSwitchType(!props.switchType)}
            style={{
              backgroundColor:
                props.theme === "light"
                  ? TypesColorLight[props.type[0]]
                  : TypesColorDark[props.type[0]],
            }}
          >
            <IoIosColorPalette></IoIosColorPalette>
          </Button>
          <Button variant={props.theme} onClick={() => props.reset()}>
            <VscDebugRestart></VscDebugRestart>
          </Button>
        </Col>
        <Col xs={4} style={{ padding: "0" }}>
          {props.theme === "light" ? (
            <Button
              variant={props.theme}
              onClick={() => props.setTheme("dark")}
              className={styles.redoBtn}
            >
              <BiSun></BiSun>
            </Button>
          ) : (
            <Button
              variant={props.theme}
              onClick={() => props.setTheme("light")}
              className={styles.redoBtn}
            >
              <BiMoon></BiMoon>
            </Button>
          )}
          <Button variant={props.theme} onClick={() => confirm()}>
            <HiOutlineSpeakerphone></HiOutlineSpeakerphone>
          </Button>
        </Col>
        <Col xs={4} style={{ padding: "0" }}>
          {!props.auto ? (
            <div>
              <Button
                className={styles.redoBtn}
                variant={props.theme}
                onClick={() => props.undo()}
              >
                <IoArrowUndo></IoArrowUndo>
              </Button>
              <Button variant={props.theme} onClick={() => props.redo()}>
                <IoArrowRedo></IoArrowRedo>
              </Button>
            </div>
          ) : (
            <div>
              <Button variant={props.theme} onClick={() => props.redo()}>
                <IoPause></IoPause>
              </Button>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Header;
