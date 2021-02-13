import React, { useState } from "react";
import { Board } from "./components";

const App = () => {
  const data: number[][] = [
    [3, 15, 32, 60, 71],
    [10, 20, 43, 54, 85],
    [2, 26, 35, 59, 76],
    [6, 39, 49, 68, 73],
    [13, 29, 48, 50, 88],
    [22, 30, 53, 65, 82],
    [1, 25, 58, 69, 90],
    [7, 21, 41, 56, 87],
    [11, 37, 44, 61, 70],
  ];

  const [theme, setTheme] = useState<string>("light");

  return (
    <div>
      <Board data={data} theme={theme} />
    </div>
  );
};

export default App;
