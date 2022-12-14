import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    if (!replace) {
      setHistory((prev) => [...prev, newMode]);
    }
    setMode(newMode);
  }

  function back() {
    setHistory((prev) => [...prev.slice(0, -1)]);
    if (history.length > 1) {
      setMode(history[history.length - 2]);
    }
  }
  return { mode, transition, back };
}
