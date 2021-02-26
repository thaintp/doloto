import { useContext } from "react";

import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";

import { GiBuffaloHead } from "react-icons/gi";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

import { GameContext } from "../Game";

import styles from "./index.module.css";

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
        <Badge variant={mode} className={styles.badge}>
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
