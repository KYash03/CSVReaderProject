import React, { useState } from "react";
import "./App.css";
import CSVTable from "./CSVTable";

const App: React.FC = () => {
  const [data, setData] = useState<string[][]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const csv = event.target?.result as string;
      const parsedData = csv.split("\n").map((row) => row.split("\t"));
      setData(parsedData);
    };
    reader.readAsText(file);
  };

  return (
    <div className="App">
      <input type="file" onChange={handleFileChange} />
      <CSVTable data={data} />
    </div>
  );
};

export default App;
