import React from "react";

interface Props {
  data: string[][];
  session: string;
}

const CSVTable: React.FC<Props> = ({ data, session }) => {
  if (data.length === 0) return null;

  // Define the column indices for Course, Grade, Letter, Standing, and Class Average
  const courseIndex = 0;
  const gradeIndex = 2; // Column "Grade"
  const letterIndex = 3;
  const standingIndex = 4; // Column "Standing"
  const classAvgIndex = 10; // Column "Credits Earned"

  return (
    <div>
      <h2 className="SessionHeader">Session - {session}</h2>
      <table>
        <thead>
          <tr>
            <th>Course</th>
            <th>Grade</th>
            <th>Letter</th>
            <th>Standing</th>
            <th>Class Avg</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td>{row[courseIndex]}</td> {/* Course */}
              <td>{row[gradeIndex]}</td> {/* Grade */}
              <td>{row[letterIndex]}</td> {/* Letter */}
              <td>{row[standingIndex]}</td> {/* Standing */}
              <td>{row[classAvgIndex]}</td> {/* Class Avg */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CSVTable;
