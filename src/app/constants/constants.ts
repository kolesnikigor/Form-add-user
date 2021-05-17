import { ValueBindingItem } from '../models/user';

export const DEFAULT_USER_FORM_STATE = {
  name: '',
  sex: '',
  dateOfBirth: '',
  directionOfStudy: '',
  startDateOfTraining: '',
  endDateOfTraining: '',
};

export const DIRECTION_OF_STUDY_TYPES: ValueBindingItem[] = [
  {text: 'Backend', value: 'backend'},
  {text: 'Frontend', value: 'frontend'},
  {text: 'Design', value: 'design'},
  {text: 'Project Management', value: 'projectManagement'},
  {text: 'Quality Assurance', value: 'qualityAssurance'},
  {text: 'Business Analytic', value: 'businessAnalytic'}
];
export const SEX_TYPES: ValueBindingItem[] = [
  {text: 'Male', value: 'male'},
  {text: 'Female', value: 'female'},
];
