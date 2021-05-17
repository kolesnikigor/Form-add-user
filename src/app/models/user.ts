export interface ValueBindingItem {
  text: string;
  value: string;
}

export interface User {
  id: number;
  name: string;
  sex: ValueBindingItem;
  dateOfBirth: string;
  directionOfStudy: ValueBindingItem;
  startDateOfTraining: string;
  endDateOfTraining: string;
}

export interface UserFormValue {
  id?: number;
  name: string;
  sex: string;
  dateOfBirth: string | Date;
  directionOfStudy: string;
  startDateOfTraining: string | Date;
  endDateOfTraining: string | Date;
}
