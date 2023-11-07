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
            <th key={idx}>
              {header.split(",")[0] +
                "\t" +
                header.split(",")[2] +
                "\t" +
                header.split(",")[7] +
                "\t" +
                header.split(",")[4] +
                "\t" +
                header.split(",")[10]}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.slice(1, data.length - 1).map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <td key={cellIndex}>
                {cell.split(",")[0] +
                  "\t" +
                  cell.split(",")[2] +
                  "\t" +
                  cell.split(",")[7] +
                  "\t" +
                  cell.split(",")[4] +
                  "\t" +
                  cell.split(",")[10]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CSVTable;
