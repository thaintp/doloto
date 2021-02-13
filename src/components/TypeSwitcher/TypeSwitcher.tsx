import styles from "./TypeSwitcher.module.css";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { Types as types, TypesColor as typesColor } from "../";

interface TypeSwitcherPropsType {
  type: number[];
  onClickType: Function;
}

const TypeSwitcher = (props: TypeSwitcherPropsType) => (
  <div>
    <h5 style={{ margin: "20px 0" }}>
      Tờ hiện tại là tờ màu{" "}
      <span style={{ backgroundColor: typesColor[props.type[0]] }}>
        {types[props.type[0]]}
      </span>{" "}
      số {props.type[1] + 1}
    </h5>
    <h3>Chọn tờ khác?</h3>
    <ol>
      {types.map((type, i) => (
        <li
          style={{ marginTop: "10px" }}
          className={styles.typeSwitcher}
          key={i}
        >
          <Container>
            <Row>
              <Col xs={5}>{type}</Col>
              <Col xs={7} style={{ textAlign: "right" }}>
                {[1, 2].map((t, j) => (
                  <Button
                    style={{
                      backgroundColor: typesColor[i],
                      margin: "0 5px",
                    }}
                    onClick={() => props.onClickType(i, j)}
                    variant="light"
                    key={i + j}
                  >
                    {t}
                  </Button>
                ))}
              </Col>
            </Row>
          </Container>
        </li>
      ))}
    </ol>
  </div>
);
export default TypeSwitcher;
