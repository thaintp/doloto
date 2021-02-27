import produce from "immer";

import { TypesData } from "../data";
import {
  shuffle,
  createBoard,
  createAudio,
  countClick,
  getColor,
} from "../utils";

const wait = new Audio("./audio/wait.mp3");
const win = new Audio("./audio/win.mp3");
const gameReducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case "INIT_CACHE":
      const cached = action.cached.state;
      state.initCached(action.cached.history);
      return {
        ...state,
        ...cached,
        clicked: cached.clicked,
        nextAudio: createAudio(
          cached.genNumbers[cached.genNumberIndex],
          cached.speed
        ),
      };
    case "INIT":
      const gen = shuffle(Array.from({ length: 90 }, (_, i) => i + 1));
      return {
        ...state,
        type: [0, 0],
        data: createBoard(TypesData[0][0]),
        showSwitchType: false,
        showGen: false,
        full: false,
        auto: false,
        speed: 1,
        genNumbers: gen,
        nextAudio: createAudio(gen[0], 1),
        ...getColor(state.mode, [0, 0]),
      };

    case "CLICK":
      const [x, y] = action.coordinate;
      return {
        ...state,
        clicked: state.set(
          produce(state.clicked, (clicked: boolean[][]) => {
            clicked[x][y] = !clicked[x][y];

            if (clicked[x][y]) {
              const count = countClick(clicked[x]);
              if (count === 4) wait.play();
              else if (count === 5) {
                win.play();
              }
            }
          })
        ),
      };

    case "SET_MODE":
      state.setMode(action.mode);
      return {
        ...state,
        mode: action.mode,
        ...getColor(action.mode, state.type),
      };

    case "UNDO":
      state.undo();
      return state;

    case "REDO":
      state.redo();
      return state;

    case "RESET":
      return produce(state, (s) => {
        s.clicked = s.resetToFirstState();
        if (state.auto) {
          const gen = shuffle(s.genNumbers);
          s.genNumbers = gen;
          s.genNumberIndex = 0;
          s.curGenNumber = gen[0];
          s.nextAudio = createAudio(gen[0], s.speed);
          s.full = false;
        }
      });

    case "TOGGLE_SHOW_SWITCH_TYPE":
      return {
        ...state,
        showSwitchType: !state.showSwitchType,
      };

    case "SWITCH_TYPE":
      if (!state.showSwitchType) return state;

      return produce(state, (s) => {
        s.type = action.typeVal;
        s.data = createBoard(TypesData[action.typeVal[0]][action.typeVal[1]]);
        s.showSwitchType = false;
        s.clicked = s.resetToFirstState();
        s.typeColor = getColor(s.mode, s.type).typeColor;

        if (state.auto) {
          const draft = shuffle(s.genNumbers);
          s.genNumbers = draft;
          s.genNumberIndex = 0;
          s.curGenNumber = draft[0];
          s.nextAudio = createAudio(draft[0], s.speed);
          s.full = false;
        }
      });

    case "START_AUTO":
      return {
        ...state,
        auto: true,
        genNumberIndex: 0,
        clicked: state.resetToFirstState(),
        curGenNumber: state.genNumbers[0],
        nextAudio: createAudio(state.genNumbers[0], state.speed),
      };

    case "STOP_AUTO":
      return produce(state, (s) => {
        s.auto = false;
        s.genNumbers = shuffle(s.genNumbers);
        s.full = false;
        s.showGen = false;
        s.clicked = s.resetToFirstState();
      });

    case "PLAY_NEXT":
      state.nextAudio.play();
      return produce(state, (s) => {
        s.curGenNumber = s.genNumbers[s.genNumberIndex];
        s.clicked = s.set(
          s.clicked.map((row: boolean[], ir: number) =>
            row.map((x: Boolean, ic: number) => {
              if (s.data[ir][ic] === s.curGenNumber) {
                const count = countClick(row);
                if (count === 4) win.play();
                return true;
              } else {
                return x;
              }
            })
          )
        );
        s.genNumberIndex = s.genNumberIndex + 1;
        if (s.genNumberIndex === 90) {
          s.full = true;
        } else {
          s.nextAudio = createAudio(s.genNumbers[s.genNumberIndex], s.speed);
        }
      });

    case "TOGGLE_SHOW_GEN":
      return {
        ...state,
        showGen: !state.showGen,
      };

    case "INC_SPEED":
      return produce(state, (s) => {
        s.speed = s.speed < 3 ? s.speed + 0.2 : s.speed;
        s.nextAudio = createAudio(s.genNumbers[s.genNumberIndex], s.speed);
      });

    case "DES_SPEED":
      return produce(state, (s) => {
        s.speed = s.speed > 0.6 ? s.speed - 0.2 : s.speed;
        s.nextAudio = createAudio(s.genNumbers[s.genNumberIndex], s.speed);
      });

    default:
      return state;
  }
};

export default gameReducer;
