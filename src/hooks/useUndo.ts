import { useCallback, useReducer } from "react";
import { undoReducer } from "../reducers";

const useUndo = (initialPresent: any) => {
  const [state, dispatch] = useReducer(undoReducer, {
    past: [],
    present: initialPresent,
    future: [],
  });

  const canUndo = state.past.length !== 0;
  const canRedo = state.future.length !== 0;

  const undo = useCallback(() => dispatch({ type: "UNDO" }), []);
  const redo = useCallback(() => dispatch({ type: "REDO" }), []);

  const set = useCallback((newPresent) => {
    dispatch({ type: "SET", newPresent });
    return newPresent;
  }, []);

  const reset = useCallback(
    (newPresent) => dispatch({ type: "RESET", newPresent }),
    []
  );

  const resetToFirstState = useCallback(() => {
    dispatch({ type: "RESET_TO_FIRST_STATE" });
    return state.past.length > 0 ? state.past[0] : state.present;
  }, [state]);

  return [
    state.present,
    { set, reset, resetToFirstState, undo, redo, canUndo, canRedo },
  ];
};

export default useUndo;
