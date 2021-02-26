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
  const [{ type, auto, full, showSwitchType }, dispatch] = useContext(
    GameContext
  );

  const reset = useCallback(() => {
    Swal.fire({
      title: "Chơi ván mới?",
      text: "Xóa hết các nước đi của ván này và chơi ván mới!",
      showCancelButton: true,
      confirmButtonText: "Chơi",
      cancelButtonText: "Không",
      target: fullscreenElem(),
    }).then(({ isConfirmed }) => {
      if (isConfirmed) {
        dispatch({ type: "RESET" });
      }
    });
  }, [dispatch]);

  const toggleAuto = useCallback(() => {
    if (!auto) {
      Swal.fire({
        title: "Mở kêu số?",
        text:
          "Mở tính năng kêu số và tự động dò, khi mở sẽ xoá hết các nước đi của ván này!",
        showCancelButton: true,
        confirmButtonText: "Mở",
        cancelButtonText: "Không",
        target: fullscreenElem(),
      }).then(({ isConfirmed }) => {
        isConfirmed && dispatch({ type: "START_AUTO" });
      });
    } else {
      Swal.fire({
        title: "Tắt kêu số?",
        text:
          "Tắt tính năng kêu số và tự động dò, khi tắt sẽ xoá hết các nước đi của ván này!",
        showCancelButton: true,
        confirmButtonText: "Tắt",
        cancelButtonText: "Không",
        target: fullscreenElem(),
      }).then(({ isConfirmed }) => {
        isConfirmed && dispatch({ type: "STOP_AUTO" });
      });
    }
  }, [dispatch, auto]);

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
            onClick={() => toggleAuto()}
            className={styles.mrBtn}
            disabled={showSwitchType}
          >
            <FaBullhorn></FaBullhorn>
          </Button>
          <Button
            variant={mode}
            onClick={() => reset()}
            disabled={showSwitchType || (!auto && !canUndo && !canRedo)}
          >
            <FaSyncAlt></FaSyncAlt>
          </Button>
        </Col>

        <Col xs={4} style={{ padding: "0" }}>
          {!auto ? (
            <div>
              <Button
                className={styles.mrBtn}
                variant={mode}
                onClick={() => dispatch({ type: "UNDO" })}
                disabled={!canUndo || showSwitchType}
              >
                <IoArrowUndo></IoArrowUndo>
              </Button>
              <Button
                variant={mode}
                onClick={() => dispatch({ type: "REDO" })}
                disabled={!canRedo || showSwitchType}
              >
                <IoArrowRedo></IoArrowRedo>
              </Button>
            </div>
          ) : (
            <div>
              <Button
                variant={mode}
                onClick={() => dispatch({ type: "TOGGLE_SHOW_GEN" })}
                className={styles.mrBtn}
                disabled={showSwitchType}
              >
                <FaTh></FaTh>
              </Button>
              <Button
                variant={mode}
                onClick={() => dispatch({ type: "PLAY_NEXT" })}
                style={{
                  backgroundColor:
                    mode === "light"
                      ? TypesColorLight[type[0]]
                      : TypesColorDark[type[0]],
                }}
                disabled={full}
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

export default Control;
