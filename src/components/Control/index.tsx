import { useContext, useCallback } from "react";
import Swal from "sweetalert2";

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

import { GameContext } from "../Game";
import { fullscreenElem } from "../../utils";
import { Number1Icon, Number2Icon } from "../Icons";

import styles from "./index.module.css";

const Control = ({ playNext, historyDo }: ControlPropsType) => {
  const [
    { type, auto, full, showSwitchType, typeColor, modeColor, mode },
    dispatch,
  ] = useContext(GameContext);

  const startReset = useCallback(() => {
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

  const toggleAuto = useCallback(() => {
    if (!auto) {
      Swal.fire({
        title: "Mở kêu số?",
        text: "Mở tính năng kêu số và tự động dò, khi mở sẽ xoá hết các nước đi của ván này!",
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
        text: "Tắt tính năng kêu số và tự động dò, khi tắt sẽ xoá hết các nước đi của ván này!",
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
      style={{ backgroundColor: modeColor }}
    >
      <Row className={styles.header}>
        <Col xs={4} style={{ padding: "0" }}>
          <Button
            className={[styles.mrBtn, styles.controlBtn].join(" ")}
            variant={mode}
            onClick={() => dispatch({ type: "TOGGLE_SHOW_SWITCH_TYPE" })}
            style={{
              backgroundColor: typeColor,
            }}
          >
            <div className={styles.centerXY}>
              {type[1] === 0 ? (
                <Number1Icon></Number1Icon>
              ) : (
                <Number2Icon></Number2Icon>
              )}
            </div>
          </Button>
          {mode === "light" ? (
            <Button
              className={[styles.controlBtn].join(" ")}
              variant={mode}
              onClick={() => dispatch({ type: "SET_MODE", mode: "dark" })}
            >
              <div className={styles.centerXY}>
                <FaSun></FaSun>
              </div>
            </Button>
          ) : (
            <Button
              className={[styles.controlBtn].join(" ")}
              variant={mode}
              onClick={() => dispatch({ type: "SET_MODE", mode: "light" })}
            >
              <div className={styles.centerXY}>
                <FaMoon></FaMoon>
              </div>
            </Button>
          )}
        </Col>
        <Col xs={4} style={{ padding: "0" }}>
          {/* <Button
            variant={mode}
            onClick={() => toggleAuto()}
            className={styles.mrBtn}
            disabled={showSwitchType}
          >
            <FaBullhorn></FaBullhorn>
          </Button> */}
          <Button
            className={[styles.controlBtn].join(" ")}
            variant={mode}
            onClick={() => startReset()}
            disabled={
              showSwitchType ||
              (!auto && !historyDo.canUndo && !historyDo.canRedo)
            }
          >
            <div className={styles.centerXY}>
              <FaSyncAlt></FaSyncAlt>
            </div>
          </Button>
        </Col>

        <Col xs={4} style={{ padding: "0" }}>
          {!auto ? (
            <>
              <Button
                className={[styles.mrBtn, styles.controlBtn].join(" ")}
                variant={mode}
                onClick={() => historyDo.undo()}
                disabled={!historyDo.canUndo || showSwitchType}
              >
                <div className={styles.centerXY}>
                  <IoArrowUndo></IoArrowUndo>
                </div>
              </Button>
              <Button
                className={[styles.controlBtn].join(" ")}
                variant={mode}
                onClick={() => historyDo.redo()}
                disabled={!historyDo.canRedo || showSwitchType}
              >
                <div className={styles.centerXY}>
                  <IoArrowRedo></IoArrowRedo>
                </div>
              </Button>
            </>
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
                onClick={() => playNext()}
                style={{
                  backgroundColor: typeColor,
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
