import produce from "immer";

import { BgColor, TypesData } from "../data";
import { shuffle, createBoard, createAudio, getColor } from "../utils";

const gameReducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case "INIT_CACHE":
      const cached = action.cached.state;
      state.initHistoryCached(action.cached.history);
      return {
        ...state,
        ...cached,
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
        genNumberIndex: 0,
        nextAudio: createAudio(gen[0], 1),
        ...getColor(state.mode, [0, 0]),
      };

    case "SET_MODE":
      const newMode =
        Object.keys(BgColor)[
          (Object.keys(BgColor).findIndex((v) => v === state.mode) + 1) %
            Object.keys(BgColor).length
        ];
      const mode = action.mode || newMode;
      state.setMode(mode);
      return {
        ...state,
        mode: mode,
        ...getColor(String(mode), state.type),
      };

    case "RESET":
      state.reset();
      return produce(state, (s) => {
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
      state.reset();

      return produce(state, (s) => {
        s.type = action.typeVal;
        s.data = createBoard(TypesData[action.typeVal[0]][action.typeVal[1]]);
        s.showSwitchType = false;
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
      state.reset();
      return {
        ...state,
        auto: true,
        genNumberIndex: 0,
        curGenNumber: state.genNumbers[0],
        nextAudio: createAudio(state.genNumbers[0], state.speed),
      };

    case "STOP_AUTO":
      state.reset();
      return produce(state, (s) => {
        s.auto = false;
        s.genNumbers = shuffle(s.genNumbers);
        s.full = false;
        s.showGen = false;
      });

    case "PLAY_NEXT":
      state.nextAudio.play();
      return produce(state, (s) => {
        s.curGenNumber = s.genNumbers[s.genNumberIndex];
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
