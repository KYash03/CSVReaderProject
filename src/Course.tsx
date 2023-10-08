export {};
class Course {
    name: string;
    code: number;
    courseTitle: string;
    credits: string;
    faculty: string;
    description: string;
    isElective: boolean;
    electiveType: string;
    prerequisite: string | null;
    corequisite: string | null;
    equivalency: string | null;
    otherOptions: Course[] | null;
    totalCreditsToAchieve: number;
  
    constructor(
      name: string,
      code: number,
      courseTitle: string,
      credits: string,
      faculty: string,
      description: string,
      isElective: boolean,
      electiveType: string,
      prerequisite: string | null,
      corequisite: string | null,
      equivalency: string | null,
      otherOptions: Course[] | null,
      totalCreditsToAchieve: number,
    ) {
      this.name = name;
      this.code = code;
      this.courseTitle = courseTitle;
      this.credits = credits;
      this.faculty = faculty;
      this.description = description;
      this.isElective = isElective;
      this.electiveType = electiveType;
      this.prerequisite = prerequisite;
      this.corequisite = corequisite;
      this.equivalency = equivalency;
      this.otherOptions = otherOptions;
      this.totalCreditsToAchieve = totalCreditsToAchieve;
    }
  
    
    getYearLevel(): number {
      const i = this.getIndexOfFirstDigitInCourseCode();
      if (i === -1) {
        return -1;
      } else {
        return parseInt(this.code.toString().charAt(i));
      }
    }
  
    getIndexOfFirstDigitInCourseCode(): number {
      const pattern = /[0-9]/;
      const match = this.code.toString().match(pattern);
      return match ? this.code.toString().indexOf(match[0]) : -1;
    }
  }
 export async function getCoursePlan() {
     const response = await fetch("http://142.231.95.246:8000/degree/29");
     return response.json();
    }
  
    export default Course;
  