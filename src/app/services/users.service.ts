import { Observable, of } from 'rxjs';

import { User } from '../models/user';
import { DatePipe } from '@angular/common';
import { DIRECTION_OF_STUDY_TYPES, SEX_TYPES } from '../constants/constants';


export class UsersService {
  private users: User[] = [
    {
      name: 'User',
      sex:
        {text: 'Male', value: 'male'},
      dateOfBirth: '07/05/2000',
      directionOfStudy:
        {text: 'Quality Assurance', value: 'qualityAssurance'},
      startDateOfTraining: '07/03/2021',
      endDateOfTraining: '07/05/2021',
    },
    {
      name: 'FirstUser',
      sex:
        {text: 'Male', value: 'male'},
      dateOfBirth: '07/05/2000',
      directionOfStudy:
        {text: 'Quality Assurance', value: 'qualityAssurance'},
      startDateOfTraining: '07/03/2021',
      endDateOfTraining: '07/05/2021',
    }
  ];

  public getUsers(): Observable<User[]> {
    return of<User[]>(this.users);
  }

  addUser(data: User): void {
    this.users.push({
      name: data.name,
      sex: {
        text: typeof data.sex === 'string' && SEX_TYPES[data.sex],
        value: typeof data.sex === 'string' && data.sex
      },
      dateOfBirth: new DatePipe('en-US').transform(data.dateOfBirth, 'dd/MM/yyyy'),
      directionOfStudy: {
        text: typeof data.directionOfStudy === 'string' && DIRECTION_OF_STUDY_TYPES[data.directionOfStudy],
        value: typeof data.directionOfStudy === 'string' && data.directionOfStudy
      },
      startDateOfTraining: new DatePipe('en-US').transform(data.startDateOfTraining, 'dd/MM/yyyy'),
      endDateOfTraining: new DatePipe('en-US').transform(data.endDateOfTraining, 'dd/MM/yyyy'),
    });
  }

  constructor() {
  }
}
