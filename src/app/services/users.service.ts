import { Observable, of } from 'rxjs';
import { DatePipe } from '@angular/common';

import { User, UserFormValue } from '../models/user';
import { DIRECTION_OF_STUDY_TYPES, SEX_TYPES } from '../constants/constants';
import { Utils } from '../utils/utils';


export class UsersService {
  private users: User[] = [
    {
      id: 0,
      name: 'FirstUser',
      sex:
        {text: 'Male', value: 'male'},
      dateOfBirth: '07/05/2000',
      directionOfStudy:
        {text: 'Quality Assurance', value: 'qualityAssurance'},
      startDateOfTraining: '07/03/2021',
      endDateOfTraining: '07/05/2021',
    },
    {
      id: 1,
      name: 'SecondUser',
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

  public addUser(data: UserFormValue): void {
    const newUser: User = {
      id: Utils.createUserId(this.users),
      name: data.name,
      sex: {
        text: SEX_TYPES.find((sex) => sex.value === data.sex).text,
        value: data.sex
      },
      dateOfBirth: new DatePipe('en-US').transform(data.dateOfBirth, 'dd/MM/yyyy'),
      directionOfStudy: {
        text: DIRECTION_OF_STUDY_TYPES.find((direction) => direction.value === data.directionOfStudy).text,
        value: data.directionOfStudy
      },
      startDateOfTraining: new DatePipe('en-US').transform(data.startDateOfTraining, 'dd/MM/yyyy'),
      endDateOfTraining: new DatePipe('en-US').transform(data.endDateOfTraining, 'dd/MM/yyyy'),
    };
    this.users.push(newUser);
  }

  public removeUser(userId: number): void {
    this.users = this.users.filter(user => user.id !== userId);
  }

  public editUser(data: UserFormValue, userId: number): void {
    const users = this.users;
    const userIndex = users.findIndex(user => user.id === userId);
    users[userIndex].name = data.name;
    users[userIndex].sex = {
      text: SEX_TYPES.find((sex) => sex.value === data.sex).text,
      value: data.sex
    };
    users[userIndex].dateOfBirth = new DatePipe('en-US').transform(data.dateOfBirth, 'dd/MM/yyyy');
    users[userIndex].directionOfStudy = {
      text: DIRECTION_OF_STUDY_TYPES.find((direction) => direction.value === data.directionOfStudy).text,
      value: data.directionOfStudy
    };
    users[userIndex].startDateOfTraining = new DatePipe('en-US').transform(data.startDateOfTraining, 'dd/MM/yyyy');
    users[userIndex].endDateOfTraining = new DatePipe('en-US').transform(data.endDateOfTraining, 'dd/MM/yyyy');
    this.users = users;
  }
}
