import { useContext, useCallback } from "react";
import Swal from "sweetalert2";
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
import { fullscreenElem } from "../../utils";

import styles from "./index.module.css";

interface ControlPropsType {
  canUndo: boolean;
  canRedo: boolean;
}

const Control = ({ canUndo, canRedo }: ControlPropsType) => {
  const [mode, setMode] = useContext(AppContext);
  const [{ type }, dispatch] = useContext(GameContext);

  const reset = useCallback(() => {
    Swal.fire({
      title: "Chơi ván mới?",
      text: "Xóa hết các nước đi của ván này và chơi ván mới!",
      showCancelButton: true,
      confirmButtonText: "Chơi",
      cancelButtonText: "Không",
      target: fullscreenElem(),
    }).then(({ isConfirmed }) => {
      isConfirmed && dispatch({ type: "RESET" });
    });
  }, [dispatch]);

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
            onClick={() => dispatch({ type: "TOGGLE_SHOW_SWITCH_TYPE" })}
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
            onClick={() => reset()}
            disabled={!canUndo && !canRedo}
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
              onClick={() => dispatch({ type: "UNDO" })}
              disabled={!canUndo}
            >
              <IoArrowUndo></IoArrowUndo>
            </Button>
            <Button
              variant={mode}
              onClick={() => dispatch({ type: "REDO" })}
              disabled={!canRedo}
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
