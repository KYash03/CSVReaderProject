import React from "react";

interface Props {
  data: string[][];
}

const CSVTable: React.FC<Props> = ({ data }) => {
  if (data.length === 0) return null;

  return (
    <table>
      <thead>
        <tr>
          {data[0].map((header, idx) => (
            <th key={idx}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.slice(1).map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <td key={cellIndex}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CSVTable;
