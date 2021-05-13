export interface ValueBindingItem {
  text: string;
  value: string;
}

export interface User {
  name: string;
  sex: ValueBindingItem | string;
  dateOfBirth: string;
  directionOfStudy: ValueBindingItem | string;
  startDateOfTraining: string;
  endDateOfTraining: string;
}
