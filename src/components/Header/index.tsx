import { useContext } from "react";

import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";

import { GiBuffaloHead } from "react-icons/gi";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

import { GameContext } from "../Game";

import styles from "./index.module.css";
import { BgColor } from "../../data";

const Header = () => {
  const [
    { auto, mode, modeColor, curGenNumber, genNumberIndex, typeColor },
    dispatch,
  ] = useContext(GameContext);
  return (
    <>
      {auto && (
        <div className={styles.speedBtn}>
          <Button
            className={styles.increaseSpeedBtn}
            variant={mode}
            onClick={() => dispatch({ type: "INC_SPEED" })}
          >
            <FaArrowUp></FaArrowUp>
          </Button>
          <Button
            variant={mode}
            onClick={() => dispatch({ type: "DES_SPEED" })}
          >
            <FaArrowDown></FaArrowDown>
          </Button>
        </div>
      )}
      <div
        className={styles.genNumberContainer}
        style={{ backgroundColor: modeColor }}
      >
        <Badge
          className={styles.badge}
          style={{
            backgroundColor: BgColor[mode],
            color: mode === "dark" ? "#ffffff" : "#343a40",
          }}
        >
          {auto ? (
            genNumberIndex > 0 ? (
              <span className={styles.genNumber}>{curGenNumber}</span>
            ) : (
              <GiBuffaloHead
                className={styles.genNumber}
                style={{
                  color: typeColor,
                }}
              ></GiBuffaloHead>
            )
          ) : (
            <GiBuffaloHead className={styles.genNumber}></GiBuffaloHead>
          )}
        </Badge>
      </div>
    </>
  );
};

export default Header;
