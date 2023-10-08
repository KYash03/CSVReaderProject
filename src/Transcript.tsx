import React, { useState } from 'react';
import Papa from 'papaparse';
import { TranscriptCourse } from './TranscriptCourse';
import Course from './Course';
import TranscriptDisplayTable from './TranscriptDisplayTable';
const Transcript: React.FC = () => {
  const [inDeveloperMode] = useState(false);

  const [finalTranscriptCourses, setFinalTranscriptCourses] = useState<TranscriptCourse[]>([]);
  const customFetch = async (url: string, options?: any) => {
    if (url.startsWith('file://')) {
      const response = await fetch(url, { ...options, mode: 'no-cors' });
      return response;
    }
    return fetch(url, options);
  };
  const readTranscriptCourses = async (csvFilePath: string | undefined) => {
    if (!csvFilePath) return;
    console.log('Fetching CSV file:', csvFilePath);
    const courses: TranscriptCourse[] = [];
    try {
      const response = await customFetch(csvFilePath);
      console.log('Fetch response:', response);
      const text = await response.text();
      console.log('Fetched text:', text);
      Papa.parse(text, {
        header: true,
        dynamicTyping: true,
        complete: (results) => {
          results.data.forEach((csvRecord: any) => {
            const courseCodeAndNumber = csvRecord.Course;
            const section = csvRecord.Section;
            const tempGrade = csvRecord.Grade;
            const letter = csvRecord.Letter;
            const standing = csvRecord.Standing;
            const tempCredit = csvRecord['Credits Earned'];
            const session = csvRecord.Session;
            const tempTerm = csvRecord.Term;
            const program = csvRecord.Program;
            const tempYear = csvRecord.Year;
            const tempClassAverage = csvRecord['Class Avg'];
            //if (typeof tempGrade !== 'string') {
              //console.error(`Unexpected Grade value: ${tempGrade}`);
              //return;
            //}
            //const grade = typeof tempGrade === 'number' ? tempGrade : null;
            //const term = typeof tempTerm === 'number' ? tempTerm : null;
           const grade = tempGrade.trim() === '' ? null : parseInt(tempGrade);
            const term = tempTerm.trim() === '' ? null : parseInt(tempTerm);

            const year = tempYear && tempYear.trim() !== '' ? parseInt(tempYear) : null;
            const classAverage = tempClassAverage && tempClassAverage.trim() !== '' ? parseInt(tempClassAverage) : null;
            const credit = tempCredit && tempCredit.trim() !== '' ? parseInt(tempCredit) : -1;
            const [name, code] = courseCodeAndNumber.split(' ');
            const course = new Course(name, parseInt(code), '', credit.toString(), 'Unknown', '', false, '', null, null, null, null, -1);
            const transcriptCourse: TranscriptCourse = {
              course,
              section,
              grade,
              letter,
              standing,
              session,
              term,
              program,
              year,
              classAverage,
              isCompleted: function (): boolean {
                return this.grade !== null && this.grade >= 50;
              },
              isInProgress: function (): boolean {
                return this.grade === null && this.standing !== 'W';
              },
              getYearLevel: function (): number {
                const i = this.course.getIndexOfFirstDigitInCourseCode();
                if (i === -1) {
                  return -1;
                } else {
                  return parseInt(this.course.code.toString().charAt(i));
                }
              }
  
            };
            courses.push(transcriptCourse);
          });
          setFinalTranscriptCourses(courses);
        },
        error: (error: any) => {
          console.error('An error occurred while processing the CSV file:', error);
        },
      });
    } catch (error) {
      console.error('An error occurred while fetching the CSV file:', error);
    }
  };
  const handleFileSelection = async () => {
    const csvFilePath = process.env.PUBLIC_URL + '/Data.csv?v=' + Date.now();
    readTranscriptCourses(csvFilePath);
  };
  return (
    <div>
      <button onClick={handleFileSelection}>Choose CSV File</button>
      {finalTranscriptCourses.length > 0 && (
        <TranscriptDisplayTable transcriptCourses={finalTranscriptCourses} />
      )}
    </div>
  );
};
export default Transcript;
// const showFileChooserDialog = (): Promise<string | undefined> => {
  //   return new Promise((resolve) => {
  //     const input = window.prompt('Enter the path to the CSV file:');
  //     if (input && isCSVFile(input)) {
  //       resolve(input);
  //     } else {
  //       console.error('Invalid file! Please select a CSV file.');
  //       resolve(undefined);
  //     }
  //   });
  // };

  // const isCSVFile = (filePath: string): boolean => {
  //   return filePath.toLowerCase().endsWith('.csv');    //add this after the react state. 
  // };
