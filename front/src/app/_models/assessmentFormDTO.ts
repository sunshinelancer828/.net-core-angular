export interface AssessmentFormDTO {
  _id: string;
  templateName: string;
  description: string;
  isActive: boolean;
  sections: SectionDTO[]
}

export interface SectionDTO {
  name: string;
  description: string;
  isHidden: boolean;
  order: number;
  questions: QuestionAnswerDTO[]
}

export interface QuestionAnswerDTO {
  name: string;
  helpText: string;
  questionType: QuestionType;
  choices: string[];
  isRequired: boolean;
  answer: string[];
  //file: File;
  //filePath: string;
  //dateTime: string;
}

export enum QuestionType {
  ShortAnswer,
  Paragraph,
  MultipleChoice,
  Checkboxes,
  Dropdown,
  FileUpload,
  Date,
  Time
}
export interface UserAssessmentFormDTO{
  _id:string,
  fkUserId:string,
  assessmentForm:AssessmentFormDTO,
  //submittedOn:string,
  isValid:boolean
}
