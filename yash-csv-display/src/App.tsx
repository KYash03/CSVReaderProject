import React, { useState } from "react";
import "./App.css";
import CSVTable from "./CSVTable";

const App: React.FC = () => {
  const [data, setData] = useState<{ session: string; data: string[][] }[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const csv = event.target?.result as string;
      const parsedData = csv.split("\n").map((row) => row.split(","));
      setData(groupDataBySession(parsedData));
    };
    reader.readAsText(file);
  };

  const groupDataBySession = (data: string[][]): { session: string; data: string[][] }[] => {
    const sessions: { [key: string]: string[][] } = {};

    for (let i = 1; i < data.length; i++) {
      const session = data[i][6]; // Assuming the "Session" column is at index 6
      if (!sessions[session]) {
        sessions[session] = [];
      }
      sessions[session].push(data[i]);
    }

    return Object.keys(sessions).map((session) => ({ session, data: sessions[session] }));
  };

  return (
    <div className="App">
      <input type="file" onChange={handleFileChange} />
      {data.map((sessionData, index) => (
        <CSVTable key={index} data={sessionData.data} session={sessionData.session} />
      ))}
    </div>
  );
};

export default App;
