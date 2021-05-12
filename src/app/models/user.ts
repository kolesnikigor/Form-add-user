export enum Sex {
  male = 'Male',
  female = 'Female'
}

export enum DirectionOfStudy {
  backend = 'Backend',
  frontend = 'Frontend',
  design = 'Design',
  projectManagement = 'Project Management',
  qualityAssurance = 'Quality Assurance',
  businessAnalytic = 'Business Analytic'
}

export interface User {
  name: string;
  sex: string;
  dateOfBirth: string;
  directionOfStudy: string;
  startDateOfTraining: string;
  endDateOfTraining: string;
}
