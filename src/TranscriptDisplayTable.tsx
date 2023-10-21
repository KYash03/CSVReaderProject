import React from 'react';
import { TranscriptCourse } from './TranscriptCourse';
export {};
interface TranscriptDisplayTableProps {
  transcriptCourses: TranscriptCourse[];
}
const TranscriptDisplayTable: React.FC<TranscriptDisplayTableProps> = ({ transcriptCourses }) => {
  // Group transcript courses by session
  const sessions: { [key: string]: TranscriptCourse[] } = {};
  transcriptCourses.forEach(course => {
    if (!sessions[course.session]) {
      sessions[course.session] = [];
    }
    sessions[course.session].push(course);
  });
 return (
    <div>
      <h2>Transcript Sessions</h2>
      {Object.entries(sessions).map(([session, courses]) => (
        <div key={session}>
          <h3>Session: {session}</h3>
          <table>
            <thead>
              <tr>
                <th>Course</th>
                <th>Grade</th>
                <th>Term</th>
                {/* Add more table headers if needed */}
              </tr>
            </thead>
            <tbody>
              {courses.map(course => (
                <tr key={course.course.code}>
                  <td>{course.course.name} {course.course.code}</td>
<td>{course.grade !== null ? course.grade : 'N/A'}</td>
                  <td>{course.term !== null ? course.term : 'N/A'}</td>
                  {/* Add more table cells if needed */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};
export default TranscriptDisplayTable;
