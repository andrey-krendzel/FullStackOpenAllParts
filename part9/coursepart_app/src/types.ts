// export interface CoursePartBase {
//   name: string;
//   exerciseCount: number;
//   type: string; 
// }

export interface CoursePartOne extends CoursePartBase {
  name: "Fundamentals";
  description: string;
}

// export interface CoursePartTwo extends CoursePartBase {
//   name: "Advanced";
//   description: string;
// }

// export interface CoursePartThree extends CoursePartBase {
//   name: "Using props to pass data";
//   groupProjectCount: number;
// }

// export interface CoursePartFour extends CoursePartBase {
//     name: "Deeper type usage";
//     exerciseSubmissionLink: string;
//     description: string;
//   }

export interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

export interface CourseDescriptionPart extends CoursePartBase {
  description: string;
}

export interface CourseNormalPart extends CourseDescriptionPart {
  type: "normal";
}

export interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

export interface CourseSubmissionPart extends CourseDescriptionPart {
  type: "submission";
  exerciseSubmissionLink: string;
}

export interface CourseSpecialPart extends CourseDescriptionPart {
  type: "special";
  requirements: string[];
}

type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;

export interface HeaderProps {
    courseName: string;
}

// type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour;

export interface ContentProps {
    courseParts: CoursePart[];
}

export interface PartProps {
    part: CoursePart;
}