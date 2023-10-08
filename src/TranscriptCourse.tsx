import Course from './Course';
export {};
class TranscriptCourse {
  course: Course;
  grade: number | null;
  term: number | null;
  year: number | null;
  classAverage: number | null;
  letter: string;
  section: string;
  standing: string;
  session: string;
  program: string
  constructor(
    course: Course,
    section: string,
    grade: number | null,
    letter: string,
    standing: string,
    session: string,
    term: number | null,
    program: string,
    year: number | null,
    classAverage: number | null
  ) {
    this.course = course;
    this.section = section;
    this.grade = grade;
    this.letter = letter;
    this.standing = standing;
    this.session = session;
    this.term = term;
    this.program = program;
    this.year = year;
    this.classAverage = classAverage;
  }
  isCompleted(): boolean {
    return this.grade !== null && this.grade >= 50;
  }
  isInProgress(): boolean {
    return this.grade === null && this.standing !== 'W';
  }
  getYearLevel(): number {
    return this.course.getYearLevel();
}
}
export {TranscriptCourse};
