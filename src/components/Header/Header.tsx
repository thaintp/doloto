import styles from "./Header.module.css";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Swal from "sweetalert2";

import { GiBuffaloHead } from "react-icons/gi";
import { IoArrowRedo, IoArrowUndo } from "react-icons/io5";
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
  play: Function;
}

const Header = (props: HeaderPropsType) => {
  const confirmReset = () => {
    Swal.fire({
      title: "Chơi ván mới?",
      text: "Xóa hết các nước đi của ván này và chơi ván mới!",
      showCancelButton: true,
      confirmButtonText: "Chơi",
      cancelButtonText: "Không",
    }).then((result) => {
      result.isConfirmed && props.reset();
    });
  };
  const confirmAuto = () => {
    if (!props.auto) {
      Swal.fire({
        title: "Mở tự động kêu số?",
        text:
          "Mở tính năng tự động kêu số và tự động dò, khi mở sẽ xoá hết các nước đi của ván này!",
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
          "Tắt tính năng tự động kêu số và tự động dò, khi tắt sẽ xoá hết các nước đi của ván này!",
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
            <IoIosColorPalette></IoIosColorPalette>
          </Button>
          {props.theme === "light" ? (
            <Button
              variant={props.theme}
              onClick={() => props.setTheme("dark")}
            >
              <BiSun></BiSun>
            </Button>
          ) : (
            <Button
              variant={props.theme}
              onClick={() => props.setTheme("light")}
            >
              <BiMoon></BiMoon>
            </Button>
          )}
        </Col>

        <Col xs={4} style={{ padding: "0" }}>
          {!props.auto ? (
            <div>
              <Button
                className={styles.mrBtn}
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
              <Button variant={props.theme} onClick={() => props.play()}>
                <GiBuffaloHead></GiBuffaloHead>
              </Button>
            </div>
          )}
        </Col>
        <Col xs={4} style={{ padding: "0" }}>
          <Button
            variant={props.theme}
            onClick={() => confirmAuto()}
            className={styles.mrBtn}
          >
            <HiOutlineSpeakerphone></HiOutlineSpeakerphone>
          </Button>
          <Button variant={props.theme} onClick={() => confirmReset()}>
            <VscDebugRestart></VscDebugRestart>
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Header;
