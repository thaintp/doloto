import { useContext } from "react";

import { AppContext } from "../../App";
import { GameContext } from "../Game";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { IoArrowRedo, IoArrowUndo } from "react-icons/io5";
import {
  FaTh,
  FaBullhorn,
  FaFan,
  FaSyncAlt,
  FaSun,
  FaMoon,
} from "react-icons/fa";

import { TypesColorLight, TypesColorDark, ThemeColor } from "..";
import { Number1Icon, Number2Icon } from "../Icons";

import styles from "./index.module.css";

interface ControlPropsType {
  undo: Function;
  redo: Function;
}

const Control = () => {
  const [mode, setMode] = useContext(AppContext);
  const [{ type, undo, redo }] = useContext(GameContext);

  return (
    <Container
      className={styles.container}
      style={{ backgroundColor: ThemeColor[mode === "light" ? 0 : 1] }}
    >
      <Row className={styles.Control}>
        <Col xs={4} style={{ padding: "0" }}>
          <Button
            className={styles.mrBtn}
            variant={mode}
            // onClick={() => props.setSwitchType(!props.switchType)}
            style={{
              backgroundColor:
                mode === "light"
                  ? TypesColorLight[type[0]]
                  : TypesColorDark[type[0]],
            }}
          >
            {type[1] === 0 ? (
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
            // onClick={() => confirmAuto()}
            className={styles.mrBtn}
            // disabled={props.switchType}
          >
            <FaBullhorn></FaBullhorn>
          </Button>
          <Button
            variant={mode}
            // onClick={() => confirmReset()}
            // disabled={props.switchType}
          >
            <FaSyncAlt></FaSyncAlt>
          </Button>
        </Col>

        <Col xs={4} style={{ padding: "0" }}>
          {/* {!props.auto ? ( */}
          <div>
            <Button
              className={styles.mrBtn}
              variant={mode}
              onClick={() => undo()}
              // disabled={props.switchType}
            >
              <IoArrowUndo></IoArrowUndo>
            </Button>
            <Button
              variant={mode}
              onClick={() => redo()}
              // disabled={props.switchType}
            >
              <IoArrowRedo></IoArrowRedo>
            </Button>
          </div>
          {/* ) : (
            <div>
              <Button
                variant={mode}
                // onClick={() => props.toggleShow()}
                className={styles.mrBtn}
                // disabled={props.switchType}
              >
                <FaTh></FaTh>
              </Button>
              <Button
                variant={mode}
                // onClick={() => props.play()}
                style={{
                  backgroundColor:
                    mode === "light"
                      ? TypesColorLight[type[0]]
                      : TypesColorDark[type[0]],
                }}
                // disabled={props.full}
              >
                <FaFan></FaFan>
              </Button>
            </div>
          )} */}
        </Col>
      </Row>
    </Container>
  );
};

export default Control;
