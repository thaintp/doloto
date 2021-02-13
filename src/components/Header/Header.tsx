import styles from "./Header.module.css";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { IoArrowRedo, IoArrowUndo } from "react-icons/io5";
import { BiMoon, BiSun } from "react-icons/bi";
import { IoIosColorPalette } from "react-icons/io";
import { VscDebugRestart } from "react-icons/vsc";

import { TypesColor as typesColor } from "../";

interface HeaderPropsType {
  switchType: boolean;
  setSwitchType: Function;
  type: number[];
  theme: string;
  setTheme: Function;
  reset: Function;
  undo: Function;
  redo: Function;
}

const Header = (props: HeaderPropsType) => (
  <Container>
    <Row className={styles.header}>
      <Col xs={5}>
        <Button
          className={styles.redoBtn}
          variant="light"
          onClick={() => props.setSwitchType(!props.switchType)}
          style={{ backgroundColor: typesColor[props.type[0]] }}
        >
          <IoIosColorPalette></IoIosColorPalette>
        </Button>
        <Button variant={props.theme} onClick={() => props.reset()}>
          <VscDebugRestart></VscDebugRestart>
        </Button>
      </Col>
      <Col xs={2} style={{ padding: "0" }}>
        {props.theme === "light" ? (
          <Button variant={props.theme} onClick={() => props.setTheme("dark")}>
            <BiSun></BiSun>
          </Button>
        ) : (
          <Button variant={props.theme} onClick={() => props.setTheme("light")}>
            <BiMoon></BiMoon>
          </Button>
        )}
      </Col>
      <Col xs={5}>
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
      </Col>
    </Row>
  </Container>
);

export default Header;
