import { useState, useCallback } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    if (!replace) {
      setHistory([...history, newMode]);
    }
    setMode(newMode);
  }

  function back() {
    history.pop();
    if (history.length >= 1) {
      setMode(history[history.length - 1]);
    }
  }

  return { mode, transition, back };
}