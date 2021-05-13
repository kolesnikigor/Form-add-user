export interface ValueBindingItem {
  text: string;
  value: string;
}

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
  sex: ValueBindingItem | string;
  dateOfBirth: string;
  directionOfStudy: ValueBindingItem | string;
  startDateOfTraining: string;
  endDateOfTraining: string;
}
